import { Project, ProjectCategory, ProjectStatus } from "./projects";

/**
 * Cliente Notion para gerenciar projetos do portfólio
 * 
 * Configuração necessária em .env.local:
 * - VITE_NOTION_API_KEY: Token da integration Notion
 * - VITE_NOTION_DATABASE_ID: ID da database de projetos
 */

const NOTION_API_URL = "https://api.notion.com/v1";
const API_KEY = import.meta.env.VITE_NOTION_API_KEY;
const DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;

interface NotionPage {
  id: string;
  properties: Record<string, any>;
}

/**
 * Extrai valor de uma propriedade Notion
 */
function extractPropertyValue(property: any): any {
  if (!property) return null;

  switch (property.type) {
    case "title":
      return property.title.map((t: any) => t.plain_text).join("");
    case "rich_text":
      return property.rich_text.map((t: any) => t.plain_text).join("");
    case "select":
      return property.select?.name || null;
    case "multi_select":
      return property.multi_select.map((s: any) => s.name);
    case "number":
      return property.number;
    case "url":
      return property.url;
    case "checkbox":
      return property.checkbox;
    default:
      return null;
  }
}

/**
 * Converte página Notion para objeto Project
 */
function notionPageToProject(page: NotionPage): Project | null {
  try {
    const props = page.properties;

    const title = extractPropertyValue(props.Title);
    const description = extractPropertyValue(props.Description);
    const longDescription = extractPropertyValue(props["Long Description"]);
    const category = extractPropertyValue(props.Category);
    const status = extractPropertyValue(props.Status);
    const year = extractPropertyValue(props.Year);
    const icon = extractPropertyValue(props.Icon);
    const tags = extractPropertyValue(props.Tags) || [];
    const technologies = extractPropertyValue(props.Technologies) || [];
    const team = extractPropertyValue(props.Team);
    const demoLink = extractPropertyValue(props["Demo Link"]);
    const websiteLink = extractPropertyValue(props["Website Link"]);
    const githubLink = extractPropertyValue(props["GitHub Link"]);

    // Parse JSON fields
    let metrics = [];
    let highlights = [];

    try {
      const metricsStr = extractPropertyValue(props.Metrics);
      if (metricsStr) {
        metrics = JSON.parse(metricsStr);
      }
    } catch (e) {
      console.warn("Erro ao parsear Metrics:", e);
    }

    try {
      const highlightsStr = extractPropertyValue(props.Highlights);
      if (highlightsStr) {
        highlights = JSON.parse(highlightsStr);
      }
    } catch (e) {
      console.warn("Erro ao parsear Highlights:", e);
    }

    // Validar campos obrigatórios
    if (!title || !description || !category || !status) {
      console.warn("Projeto incompleto:", page.id);
      return null;
    }

    return {
      id: page.id,
      title,
      description,
      longDescription: longDescription || description,
      category: category as ProjectCategory,
      status: status as ProjectStatus,
      year: year || new Date().getFullYear(),
      icon: icon || "Code2",
      tags,
      metrics: metrics.length > 0 ? metrics : undefined,
      technologies,
      links: {
        demo: demoLink || undefined,
        website: websiteLink || undefined,
        github: githubLink || undefined,
      },
      team: team || undefined,
      highlights: highlights.length > 0 ? highlights : [],
    };
  } catch (error) {
    console.error("Erro ao converter página Notion:", error);
    return null;
  }
}

/**
 * Busca todos os projetos da database Notion
 */
export async function fetchProjectsFromNotion(): Promise<Project[]> {
  if (!API_KEY || !DATABASE_ID) {
    console.warn(
      "Notion API Key ou Database ID não configurados. Usando dados locais."
    );
    return [];
  }

  try {
    const response = await fetch(`${NOTION_API_URL}/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          property: "Status",
          select: {
            does_not_equal: "archived",
          },
        },
        sorts: [
          {
            property: "Year",
            direction: "descending",
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Erro ao buscar projetos do Notion:", error);
      return [];
    }

    const data = await response.json();
    const projects: Project[] = [];

    for (const page of data.results) {
      const project = notionPageToProject(page);
      if (project) {
        projects.push(project);
      }
    }

    return projects;
  } catch (error) {
    console.error("Erro ao conectar com Notion API:", error);
    return [];
  }
}

/**
 * Busca um projeto específico pelo ID
 */
export async function fetchProjectFromNotionById(projectId: string): Promise<Project | null> {
  if (!API_KEY) {
    console.warn("Notion API Key não configurada.");
    return null;
  }

  try {
    const response = await fetch(`${NOTION_API_URL}/pages/${projectId}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Notion-Version": "2022-06-28",
      },
    });

    if (!response.ok) {
      console.error("Erro ao buscar projeto do Notion");
      return null;
    }

    const page = await response.json();
    return notionPageToProject(page);
  } catch (error) {
    console.error("Erro ao buscar projeto do Notion:", error);
    return null;
  }
}

/**
 * Busca projetos por categoria
 */
export async function fetchProjectsByCategoryFromNotion(
  category: ProjectCategory
): Promise<Project[]> {
  if (!API_KEY || !DATABASE_ID) {
    console.warn("Notion API Key ou Database ID não configurados.");
    return [];
  }

  try {
    const response = await fetch(`${NOTION_API_URL}/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          and: [
            {
              property: "Category",
              select: {
                equals: category,
              },
            },
            {
              property: "Status",
              select: {
                does_not_equal: "archived",
              },
            },
          ],
        },
      }),
    });

    if (!response.ok) {
      console.error("Erro ao buscar projetos por categoria");
      return [];
    }

    const data = await response.json();
    const projects: Project[] = [];

    for (const page of data.results) {
      const project = notionPageToProject(page);
      if (project) {
        projects.push(project);
      }
    }

    return projects;
  } catch (error) {
    console.error("Erro ao buscar projetos por categoria:", error);
    return [];
  }
}

/**
 * Busca projetos por tag
 */
export async function fetchProjectsByTagFromNotion(tag: string): Promise<Project[]> {
  if (!API_KEY || !DATABASE_ID) {
    console.warn("Notion API Key ou Database ID não configurados.");
    return [];
  }

  try {
    const response = await fetch(`${NOTION_API_URL}/databases/${DATABASE_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          and: [
            {
              property: "Tags",
              multi_select: {
                contains: tag,
              },
            },
            {
              property: "Status",
              select: {
                does_not_equal: "archived",
              },
            },
          ],
        },
      }),
    });

    if (!response.ok) {
      console.error("Erro ao buscar projetos por tag");
      return [];
    }

    const data = await response.json();
    const projects: Project[] = [];

    for (const page of data.results) {
      const project = notionPageToProject(page);
      if (project) {
        projects.push(project);
      }
    }

    return projects;
  } catch (error) {
    console.error("Erro ao buscar projetos por tag:", error);
    return [];
  }
}

/**
 * Hook para cache de projetos com revalidação
 */
let cachedProjects: Project[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export async function fetchProjectsWithCache(): Promise<Project[]> {
  const now = Date.now();

  // Se cache ainda é válido, retornar
  if (cachedProjects && now - cacheTimestamp < CACHE_DURATION) {
    return cachedProjects;
  }

  // Buscar dados frescos do Notion
  const projects = await fetchProjectsFromNotion();
  cachedProjects = projects;
  cacheTimestamp = now;

  return projects;
}

/**
 * Limpar cache manualmente
 */
export function clearProjectsCache(): void {
  cachedProjects = null;
  cacheTimestamp = 0;
}
