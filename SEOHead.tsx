import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterCreator?: string;
}

export function SEOHead({
  title = "Johnata Moreira - Product Builder & Estrategista de Tráfego",
  description = "Desenvolvedor Full-Stack & Estrategista de Tráfego. Crio produtos que param de pé. Especialista em SaaS, Gestão de Frotas e Gestão de Tráfego Pago em Betim/BH.",
  canonical = "https://johnatamoreira.com.br",
  ogTitle = "Johnata Moreira - Product Builder & Estrategista de Tráfego",
  ogDescription = "Código com Visão de Negócio. Desenvolvedor Full-stack & Estrategista de Tráfego. Crio produtos que param de pé.",
  ogImage = "https://johnatamoreira.com.br/og-image.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  twitterCreator = "@johnatamoreira",
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      let tag = document.querySelector(
        isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`
      );
      if (!tag) {
        tag = document.createElement("meta");
        if (isProperty) {
          tag.setAttribute("property", name);
        } else {
          tag.setAttribute("name", name);
        }
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    updateMetaTag("description", description);
    updateMetaTag("og:title", ogTitle, true);
    updateMetaTag("og:description", ogDescription, true);
    updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("twitter:card", twitterCard);
    updateMetaTag("twitter:creator", twitterCreator);

    // Update canonical link
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonical);

    // Structured data (JSON-LD)
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Johnata Moreira",
      url: "https://johnatamoreira.com.br",
      jobTitle: "Product Builder & Estrategista de Tráfego",
      description: description,
      sameAs: [
        "https://github.com/johnatamoreira",
        "https://linkedin.com/in/johnatamoreira",
      ],
      location: {
        "@type": "Place",
        name: "Betim, Belo Horizonte, Minas Gerais, Brasil",
      },
    };

    let scriptTag = document.querySelector("script[type='application/ld+json']");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.setAttribute("type", "application/ld+json");
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, ogType, twitterCard, twitterCreator]);

  return null;
}
