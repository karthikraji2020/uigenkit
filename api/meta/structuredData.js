const BASE_URL = "https://uigenkit.in";

const generateStructuredData = {
  home: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UiGenKit – All-in-One UI Generator Kit",
    url: `${BASE_URL}`,
    description:
      "UiGenKit is a modern tool to create color palettes, gradients, neumorphism UI, and patterns for web design.",
    publisher: {
      "@type": "Organization",
      name: "UiGenKit",
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/uigenkit-og.png`,
      },
    },
  },
  colorpalette: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Color Palette Generator – UiGenKit",
    description:
      "Create beautiful, harmonious color palettes with hex and RGB support. Generate palettes from images or at random.",
    url: `${BASE_URL}/colorpalette`,
    image: `${BASE_URL}/images/colorpalette-og.png`,
    author: {
      "@type": "Organization",
      name: "UiGenKit",
    },
    mainEntity: {
      "@type": "WebApplication",
      name: "Color Palette Generator",
      operatingSystem: "All",
      applicationCategory: "DesignApplication",
    },
  },

  lineargradient: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Gradient Generator – UiGenKit",
    description:
      "Generate stunning linear gradients for backgrounds and UI components. Copy CSS or download gradient images instantly.",
    url: `${BASE_URL}/lineargradient`,
    image: `${BASE_URL}/images/gradient-og.png`,
    author: {
      "@type": "Organization",
      name: "UiGenKit",
    },
    mainEntity: {
      "@type": "WebApplication",
      name: "Gradient Generator",
      applicationCategory: "DesignApplication",
    },
  },

  neumorphism: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Neumorphism Generator – UiGenKit",
    description:
      "Easily create soft UI elements with the Neumorphism Generator. Customize shadows, depth, and background colors.",
    url: `${BASE_URL}/neumorphism`,
    image: `${BASE_URL}/images/neumorphism-og.png`,
    author: {
      "@type": "Organization",
      name: "UiGenKit",
    },
    mainEntity: {
      "@type": "WebApplication",
      name: "Neumorphism Generator",
      applicationCategory: "DesignApplication",
    },
  },
  
  glassmorphism: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Glassmorphism Generator – UiGenKit',
    description: 'Generate beautiful glassmorphic UI elements with blur and transparency effects for modern web design.',
    url: `${BASE_URL}/glassmorphism`,
    image: `${BASE_URL}/images/glassmorphism-og.png`,
    author: {
      '@type': 'Person',
      name: 'karthikraji2020'
    },
    publisher: {
      '@type': 'Organization',
      name: 'UiGenKit',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/uigenkit-og.png`
      }
    }
  },

  pattern: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pattern Generator – UiGenKit",
    description:
      "Generate custom background patterns for websites or UI apps. Choose styles, shapes, and download instantly.",
    url: `${BASE_URL}/pattern`,
    image: `${BASE_URL}/images/pattern-og.png`,
    author: {
      "@type": "Organization",
      name: "UiGenKit",
    },
    mainEntity: {
      "@type": "WebApplication",
      name: "Pattern Generator",
      applicationCategory: "DesignApplication",
    },
  },

   about: {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About UiGenKit',
    description: 'Learn more about UiGenKit, a modern UI generator tool helping designers and developers create stunning UI elements quickly and easily.',
    url: `${BASE_URL}/about`,
    image: `${BASE_URL}/images/about-og.png`,
    author: {
      '@type': 'Person',
      name: 'karthikraji2020'
    },
    publisher: {
      '@type': 'Organization',
      name: 'UiGenKit',
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/uigenkit-og.png`
      }
    }
  }
};

module.exports = generateStructuredData;
