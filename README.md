# GrowChief

**TL;DR**  
Production-ready Next.js App Router platform with MDX-driven docs and blog, authentication, scalable layout architecture, and responsive UI built from Figma.

GrowChief is a production‑ready web platform focused on social media growth and engagement workflows.

The entire frontend was independently implemented from Figma designs,
with a strong focus on responsive layouts, UI consistency,
and real-world frontend patterns using the Next.js App Router.

## Preview

Live demo: https://growchief.netlify.app/

- Responsive layout (desktop & mobile)
- Documentation and blog powered by MDX
- App Router navigation and layouts
- SEO-friendly pages and metadata

## My Role

Frontend Developer (Junior-level)

- Independently implemented the entire frontend based on Figma designs
- Translated UI designs into responsive and accessible React components
- Built reusable layout and UI patterns using the Next.js App Router
- Implemented blog and documentation systems using MDX
- Worked with complex styling (gradients, hover states, animations)
- Focused on clean structure, maintainability, and real-world UX details

## Key Engineering Challenges

### Scalable App Router Architecture

- Structured multiple layouts using the App Router ((site), docs, blog)
- Handled shared and route-specific UI concerns cleanly
- Ensured predictable navigation and scroll behavior

### Content-Driven System with MDX

- Built a unified MDX pipeline for docs and blog
- Implemented author profiles, related posts, and metadata
- Enabled SEO-friendly static and dynamic rendering

### UI System & Design Consistency

- Created reusable UI primitives (buttons, cards, layouts)
- Implemented complex gradient-based UI effects
- Ensured consistency across multiple sections and content types

## Features

- **Modern Tech Stack**: Next.js with App Router, React, TypeScript
- **Documentation System**: Full-featured docs with search, navigation, and MDX support
- **Blog Platform**: Dynamic blog with author profiles, related posts, and social sharing
- **Authentication (Demo Mode in Public Repo)**: Public auth flows are preserved with safe mock responses instead of live backend actions
- **Responsive Design**: Mobile-first approach with Tailwind CSS 4
- **MDX Support**: Rich content authoring with MDX
- **SEO Optimized**: Meta tags, structured data, and optimized performance

## Tech Stack

- **Framework**: Next.js (App Router)
- **UI Library**: React
- **Language**: TypeScript
- **Styling**: Tailwind CSS (CSS-first configuration)
- **Content**: MDX
- **Authentication**: NextAuth.js (+ demo-mode fallback in public version)
- **Database**: PostgreSQL (private production setup)
- **Animations**: GSAP, Framer Motion
- **Forms**: React Hook Form + Zod

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd grow
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Fill in the required environment variables:

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Email (Resend)
RESEND_API_KEY="your-resend-api-key"

# Optional
NEXT_PUBLIC_SITE_URL="https://your-domain.com"
NEXT_PUBLIC_AUTH_DEMO_MODE="true"
```

`NEXT_PUBLIC_AUTH_DEMO_MODE=true` is recommended for the public portfolio version.  
When enabled, authentication flows use safe mock responses and do not require private database or email infrastructure.

4. If you want to run the full authentication flow locally, set up the database:

```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
grow/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── (site)/       # Main site pages (blog, home)
│   │   ├── docs/         # Documentation pages
│   │   ├── auth/         # Authentication pages
│   │   └── api/          # API routes
│   ├── components/       # React components
│   │   ├── blog/         # Blog components
│   │   ├── docs/         # Documentation components
│   │   ├── layout/       # Layout components
│   │   ├── sections/     # Page sections
│   │   └── ui/           # Reusable UI components
│   ├── lib/              # Utilities and helpers
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript types
├── public/               # Static assets
└── config/               # Configuration files
```

## Styling

The project uses **Tailwind CSS** with a CSS-first approach. Theme configuration is in `src/app/styles/globals.css` using the `@theme` directive.

### Custom Styles

- `globals.css` - Global styles and Tailwind theme
- `button.css` - Button component styles
- `input.css` - Input component styles
- `pricing.css` - Pricing card styles
- `blog.css` - Blog-specific styles

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Content Management

### Documentation

Documentation pages are located in `src/components/content/docs/` as MDX files. They are automatically loaded and rendered with the `DocsMdxLoader` component.

### Blog Posts

Blog posts are in `src/components/content/blog/` as MDX files with frontmatter. Author profiles are in `src/components/content/author/`.

## Authentication

The project uses NextAuth.js with the Prisma adapter for authentication.

In the public repository, authentication is presented in demo mode:

- Sign in, Sign up, Google auth, and Forgot password preserve the intended UX
- Actions return clear demo responses instead of server errors
- Private backend infrastructure, database access, and email delivery are not included in this repository

This repository is a public portfolio version of a commercial-style project.  
The original implementation depends on private infrastructure, so backend-dependent authentication actions are intentionally mocked here to keep the user experience consistent.

## Deployment

### Build for Production

```bash
npm run build
```

The build process includes:

- Prisma client generation
- Next.js build
- Prisma engine copy for Netlify deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Import the repository into Netlify
3. Add environment variables
4. Deploy

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

## License

This repository is provided for demonstration and portfolio purposes.

---
