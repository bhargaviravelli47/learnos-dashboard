# LearnOS — Next-Gen Student Dashboard

A high-fidelity learning dashboard built with Next.js 14, Supabase, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd learning-dashboard
npm install
```

### 2. Set Up Supabase
1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/seed.sql` — this creates the `courses` table and inserts seed data
3. Copy your project URL and anon key from **Settings → API**

### 3. Configure Environment
```bash
cp .env.example .env.local
# Fill in your Supabase URL and anon key
```

### 4. Run
```bash
npm run dev
# Open http://localhost:3000
```

---

## 🏗 Architecture

### Server / Client Component Split

| Component | Type | Reason |
|-----------|------|--------|
| `app/page.tsx` | Server | Orchestrates layout, initiates Suspense boundary |
| `CoursesServer` (inline RSC) | Server | Fetches Supabase data securely on the server |
| `CourseGrid` | Client | Needs `framer-motion` stagger animations |
| `CourseCard` | Client | `useInView` hook for progress bar animation |
| `HeroTile` | Client | Dynamic greeting based on time-of-day |
| `ActivityTile` | Client | Random data generation + animations |
| `Sidebar` | Client | `useState` for collapse, `layoutId` animations |

**Key principle**: Data fetching happens exclusively in Server Components. Client Components receive data as props — zero client-side data fetching, no loading waterfalls.

### Supabase Connection
Uses `@supabase/ssr` with `createServerClient` to create a cookie-aware server client inside Next.js Server Components. Environment variables are server-only (no `NEXT_PUBLIC_` prefix for secret keys in a real app — anon key is intentionally public here as Supabase RLS handles access control).

### Animation Strategy (Framer Motion)

- **Page entrance**: `staggerChildren` in `CourseGrid` staggers tiles sequentially (100ms apart)
- **Spring physics**: All hover and layout animations use `type: "spring", stiffness: 300, damping: 20` for natural feel
- **No layout shifts**: All animations use `transform` (scale, y) and `opacity` only — no width/height/margin changes during animation
- **Progress bars**: Animate via `width` on initial mount (acceptable — not triggered by hover/scroll), using a custom spring easing
- **Sidebar**: `layoutId="sidebar-active"` creates a shared layout animation for the active indicator pill
- **Hardware acceleration**: `whileHover: { scale }` triggers GPU compositing automatically via Framer Motion

### Zero Layout Shift Compliance
- Skeleton loaders match exact dimensions of loaded cards
- `Suspense` boundary wraps only the course grid (hero and activity tiles render immediately)
- No font layout shift: `next/font` with `display: swap` and size fallbacks

---

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Dashboard page (Server Component)
│   └── globals.css         # Tailwind directives + custom utilities
├── components/
│   ├── Sidebar.tsx         # Collapsible nav with layoutId animations
│   ├── HeroTile.tsx        # Welcome greeting + streak stats
│   ├── CourseGrid.tsx      # Staggered animation container (Client)
│   ├── CourseCard.tsx      # Individual course tile with progress bar
│   ├── ActivityTile.tsx    # Contribution heatmap
│   └── skeletons/
│       └── CourseSkeleton.tsx  # Shimmer placeholder cards
├── lib/
│   └── supabase/
│       └── server.ts       # Supabase server client factory
├── types/
│   └── index.ts            # TypeScript interfaces
├── supabase/
│   └── seed.sql            # DB schema + seed data
├── .env.example            # Required environment variables
└── README.md
```

---

## 🎨 Design Decisions

- **Font**: Syne (geometric, futuristic) for headings + Space Mono for data/labels — avoids the overused Inter/Roboto defaults
- **Color**: Deep `#080C14` base with cyan/violet/emerald accents — not the clichéd purple gradient on white
- **Bento Grid**: CSS Grid with `col-span` variants per breakpoint — no JavaScript layout libraries
- **Grain texture**: CSS SVG filter applied via `::after` pseudo-element — zero performance cost
- **Responsive**: Desktop (full sidebar), tablet (icon-only sidebar), mobile (bottom nav bar)

---

## 🔒 Security

- Supabase anon key is safe to expose (it's designed to be public)
- Row Level Security (RLS) is enabled on the `courses` table with a permissive read policy
- No sensitive keys in client-side code
- `.env.local` is gitignored — only `.env.example` is committed

---

## 🚢 Deployment (Vercel)

1. Push to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Add environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — Vercel auto-detects Next.js

---

## ⚡ Challenges & Solutions

**Challenge**: Framer Motion's `whileHover` with both `scale` and dynamic `boxShadow` simultaneously.  
**Solution**: Used `whileHover` object combining both — Framer handles compositing correctly when `boxShadow` changes don't affect layout.

**Challenge**: Making skeleton dimensions match real card dimensions exactly.  
**Solution**: Used fixed `h-*` classes on skeleton elements mirroring the real card's content sections.

**Challenge**: Icon rendering from a string field in the database.  
**Solution**: Created a static `ICON_MAP` record mapping icon name strings to Lucide components — tree-shaken at build time, no dynamic imports needed.
