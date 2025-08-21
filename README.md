# Pexegueiro - A Galicia Muiñeira

🏛️ **A digital cultural heritage project documenting the historic mills of Cesantes**

An interactive web platform dedicated to preserving and sharing the heritage of Cesantes water mills (_muíños_) through maps, interviews, historical documentation, and cultural narratives.

## 🌟 About

"A Galicia muiñeira: e as xeracións que xiraron ao son dos muiños" (The Milling Galicia: and the generations that turned to the sound of mills) is a living digital book that captures the cultural significance of traditional Galician mills. This project documents not just the physical structures, but the human stories, traditions, and knowledge that surrounded these essential community landmarks.

The platform features:

- **Interactive Maps** - Explore mill locations with detailed geographic information
- **Historical Inventory** - Comprehensive documentation of mills across the region
- **Oral History Interviews** - First-hand accounts from community elders
- **Cultural Documentation** - Stories, legends, and traditional knowledge
- **QR Code Integration** - Easy access to content via mobile scanning

## 🗺️ Key Features

### Interactive Maps

Built with Leaflet, providing:

- Precise geolocation of historic mills
- Walking routes connecting O Viso, Cesantes, and Vila center
- Visual markers for mills and points of interest

### Content Collections

- **Entradas** (Entries): 64+ articles covering various aspects of mill culture
- **Entrevistas** (Interviews): 23+ recorded interviews with community members
- **Muinos** (Mills): 20+ detailed mill documentation entries

### Navigation & Accessibility

- QR code system for easy mobile access (100+ redirect routes)
- Responsive design optimized for all devices
- Content available in Galician

## 🚀 Technical Stack

- **Framework**: [Astro](https://astro.build) - Static site generator with hybrid rendering
- **Styling**: [Tailwind CSS](https://tailwindcss.com) with typography plugin
- **Interactive Components**: React 19 for dynamic features
- **Maps**: Leaflet for interactive geographic visualization
- **Content**: MDX for rich content authoring with embedded components
- **Icons**: Astro Icon with Game Icons and MDI collections
- **Build Tools**: TypeScript, Prettier with auto-formatting

## 📁 Project Structure

```
pexegueiro/
├── public/                    # Static assets
│   ├── CNAME                 # Custom domain configuration
│   └── [icons & images]      # Favicons and branding assets
├── src/
│   ├── assets/               # Project assets
│   ├── components/           # Reusable Astro/React components
│   │   ├── GlobalMap.tsx     # Interactive Leaflet map
│   │   ├── Header.astro      # Site navigation
│   │   └── Footer.astro      # Site footer
│   ├── content/              # Content collections
│   │   ├── entradas/         # 64+ cultural articles
│   │   ├── entrevistas/      # 23+ oral history interviews
│   │   └── muinos/           # 20+ mill documentation
│   ├── layouts/              # Page layout templates
│   └── pages/                # Route pages and dynamic content
├── astro.config.mjs          # Astro configuration + 100+ QR redirects
└── package.json              # Dependencies and scripts
```

## 🔧 Development

### Prerequisites

- Node.js (v18+)
- pnpm

### Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd pexegueiro

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

The development server will start at `http://localhost:4321`

### Available Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `pnpm run dev`     | Start development server         |
| `pnpm run build`   | Build production site            |
| `pnpm run preview` | Preview production build locally |
| `pnpm run astro`   | Run Astro CLI commands           |

### Development Notes

The project uses:

- **Content Collections** for type-safe content management
- **MDX** for rich content with embedded components
- **QR Code Redirects** - Extensive redirect system in `astro.config.mjs`
- **React Integration** for interactive components like maps
- **Responsive Design** with mobile-first approach

## 🌐 Deployment

- **Site URL**: https://pexegueiro.estudoslocais.org
- **Build Output**: Static files generated to `./dist/`
- **Sitemap**: Auto-generated for SEO optimization

## 🤝 Contributing

This is a "living book" project that welcomes community contributions. The platform is designed to grow with new content, interviews, and mill documentation.

To contribute:

1. Fork the repository
2. Create content in the appropriate collection (`entradas/`, `entrevistas/`, `muinos/`)
3. Follow existing content structure and naming conventions
4. Submit a pull request

## 📜 Content Guidelines

- **Language**: Content primarily in Galician
- **Structure**: Use MDX frontmatter for metadata
- **Naming**: Follow kebab-case slug conventions
- **Images**: Place in appropriate asset directories

## 🏛️ Cultural Mission

This project serves as both a technical platform and cultural preservation initiative, ensuring that the knowledge, stories, and heritage surrounding Galician mills are preserved for future generations. Through digital storytelling, we honor the "silent witnesses" of a bygone world that shaped modern Galician identity.

---

_Built with ❤️ to preserve Galician cultural heritage_
