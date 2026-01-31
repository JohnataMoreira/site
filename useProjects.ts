import { useState, useEffect } from "react";
import { Project, ProjectCategory, projects as localProjects } from "@/lib/projects";
import {
  fetchProjectsWithCache,
  fetchProjectsByCategoryFromNotion,
  fetchProjectsByTagFromNotion,
} from "@/lib/notion-client";

interface UseProjectsOptions {
  category?: ProjectCategory;
  tag?: string;
}

interface UseProjectsResult {
  projects: Project[];
  loading: boolean;
  error: string | null;
  isUsingNotion: boolean;
}

/**
 * Hook para buscar projetos com fallback para dados locais
 * 
 * Prioridade:
 * 1. Notion (se configurado)
 * 2. Dados locais (fallback)
 */
export function useProjects(options?: UseProjectsOptions): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUsingNotion, setIsUsingNotion] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProjects() {
      try {
        setLoading(true);
        setError(null);

        let fetchedProjects: Project[] = [];

        // Tentar buscar do Notion
        if (options?.category) {
          fetchedProjects = await fetchProjectsByCategoryFromNotion(options.category);
        } else if (options?.tag && typeof options.tag === 'string') {
          fetchedProjects = await fetchProjectsByTagFromNotion(options.tag);
        } else {
          fetchedProjects = await fetchProjectsWithCache();
        }

        // Se conseguiu dados do Notion, usar
        if (fetchedProjects.length > 0) {
          if (isMounted) {
            setProjects(fetchedProjects);
            setIsUsingNotion(true);
          }
        } else {
          // Fallback para dados locais
          let fallbackProjects = localProjects;

          if (options?.category) {
            fallbackProjects = fallbackProjects.filter((p) => p.category === options.category);
          }

          if (options?.tag && typeof options.tag === 'string') {
            const tagValue = options.tag;
            fallbackProjects = fallbackProjects.filter((p) => p.tags.includes(tagValue));
          }

          if (isMounted) {
            setProjects(fallbackProjects);
            setIsUsingNotion(false);

            // Se não conseguiu Notion e não tem dados locais, mostrar aviso
            if (fallbackProjects.length === 0 && !import.meta.env.VITE_NOTION_API_KEY) {
              setError(
                "Notion não configurado. Configure VITE_NOTION_API_KEY e VITE_NOTION_DATABASE_ID em .env.local"
              );
            }
          }
        }
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);

        // Fallback para dados locais em caso de erro
        let fallbackProjects = localProjects;

        if (options?.category) {
          fallbackProjects = fallbackProjects.filter((p) => p.category === options.category);
        }

        if (options?.tag && typeof options.tag === 'string') {
          const tagValue = options.tag;
          fallbackProjects = fallbackProjects.filter((p) => p.tags.includes(tagValue));
        }

        if (isMounted) {
          setProjects(fallbackProjects);
          setIsUsingNotion(false);
          setError("Erro ao carregar projetos. Usando dados locais.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, [options?.category, options?.tag]);

  return { projects, loading, error, isUsingNotion };
}

/**
 * Hook para buscar todos os projetos
 */
export function useAllProjects(): UseProjectsResult {
  return useProjects();
}

/**
 * Hook para buscar projetos por categoria
 */
export function useProjectsByCategory(category?: ProjectCategory): UseProjectsResult {
  return useProjects({ category });
}

/**
 * Hook para buscar projetos por tag
 */
export function useProjectsByTag(tag?: string): UseProjectsResult {
  return useProjects(tag ? { tag } : undefined);
}
