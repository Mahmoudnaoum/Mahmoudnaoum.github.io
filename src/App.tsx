import type React from 'react'
import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, X, Menu } from 'lucide-react'
import { cn } from './lib/utils'

const UPWORK = 'https://www.upwork.com/freelancers/mahmoudn16'

function Button({ href, children, variant = 'solid', className }: { href: string; children: ReactNode; variant?: 'solid' | 'outline'; className?: string }) {
  const ext = href.startsWith('http')
  return (
    <a href={href} {...(ext ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={cn('inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
        variant === 'solid' ? 'bg-neutral-900 text-white hover:bg-neutral-700' : 'border border-neutral-300 text-neutral-900 hover:border-neutral-900', className)}>
      {children}
    </a>
  )
}
function Badge({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs text-neutral-600">{children}</span>
}
function Card({ children, className, ...p }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...p} className={cn('group w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-2xl', className)}>{children}</button>
}

const Bars = () => (
  <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
    {[40, 65, 50, 85, 70, 95].map((h, i) => <rect key={i} x={30 + i * 25} y={100 - h} width="14" height={h} rx="2" fill={i === 5 ? '#404040' : '#a3a3a3'} />)}
    <line x1="22" y1="100" x2="180" y2="100" stroke="#d4d4d4" />
  </svg>
)
const Funnel = () => (
  <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
    {[140, 105, 70, 40].map((w, i) => <rect key={i} x={100 - w / 2} y={18 + i * 22} width={w} height="16" rx="3" fill={['#d4d4d4', '#a3a3a3', '#737373', '#404040'][i]} />)}
  </svg>
)
const Doc = () => (
  <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
    <rect x="65" y="12" width="70" height="96" rx="4" fill="#fff" stroke="#d4d4d4" />
    <rect x="75" y="24" width="35" height="6" rx="2" fill="#404040" />
    {[0, 1, 2, 3, 4, 5].map(i => <rect key={i} x="75" y={40 + i * 10} width={i % 3 === 2 ? 30 : 50} height="4" rx="2" fill="#d4d4d4" />)}
  </svg>
)
const Chat = () => (
  <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
    <rect x="35" y="22" width="90" height="24" rx="12" fill="#d4d4d4" />
    <rect x="75" y="54" width="90" height="24" rx="12" fill="#404040" />
    <rect x="35" y="86" width="60" height="18" rx="9" fill="#e5e5e5" />
  </svg>
)

type Shot = { src: string; w: number; h: number; alt: string; caption: string }
type Project = { id: string; title: string; line: string; client: string; tags: string[]; Visual: () => React.ReactElement; thumb?: Shot; shots?: Shot[]; problem: string; built: string; result: string }
const projects: Project[] = [
  { id: 'warehouse', title: 'Ad-spend warehouse + Retool dashboard', line: 'One weekly board instead of five exports.', client: 'A UK e-commerce brand, via a growth agency', tags: ['BigQuery', 'Retool', 'Google Ads', 'Meta', 'LinkedIn', 'Shopify', 'GA4'], Visual: Bars,
    thumb: { src: '/kpis-chart.webp', w: 1254, h: 494, alt: 'Retool dashboard with filters, KPI cards and a spend vs CPA chart', caption: 'Filters, week-over-week KPI cards and the spend vs CPA chart.' },
    shots: [
      { src: '/kpis-chart.webp', w: 1254, h: 494, alt: 'KPI cards and spend vs CPA chart', caption: 'Channel, account, market and week filters; KPI cards vs previous week; spend vs CPA by week.' },
      { src: '/weekly-table.webp', w: 1240, h: 332, alt: 'Weekly performance table', caption: 'Weekly table with every metric the team reviews.' },
      { src: '/campaigns.webp', w: 1240, h: 392, alt: 'Campaign breakdown table', caption: 'Campaign and ad-group breakdowns for the selected period.' },
    ],
    problem: 'Spend and revenue lived in five different tools. Every Monday someone stitched exports together by hand, and the numbers rarely matched across channels.',
    built: 'Daily pipelines from Google Ads, Meta, LinkedIn, Shopify and GA4 into BigQuery, modelled raw → clean → weekly KPI views. On top, a Retool dashboard with channel, account, market and week filters, KPI cards for spend, ROAS, conversions and CPA vs the previous week, a spend vs CPA chart, a weekly table and campaign / ad-group breakdowns. Weekly is the default view on purpose: daily ad data is too noisy to act on.',
    result: 'One weekly board instead of five exports. The team now spots quickly when spend rises but efficiency drops, and acts on it the same week.' },
  { id: 'posthog', title: 'PostHog product analytics', line: 'Clean events, working funnels, useful alerts.', client: 'An e-commerce brand', tags: ['PostHog', 'Tracking plan', 'Funnels'], Visual: Funnel,
    problem: 'Events were inconsistently named and many were missing, so funnels were unreliable and nobody trusted conversion numbers. Ad-blockers also hid part of the traffic.',
    built: 'A tracking plan, a clean PostHog implementation with server-side events for checkout and purchase, consistent naming and properties, and funnels plus alerts for the key purchase steps. Documented so the team can add events without breaking things.',
    result: 'Reliable funnels the team uses weekly, and alerts that catch tracking breaks before they hit reports.' },
  { id: 'brief', title: 'AI weekly brief agent', line: 'A Monday summary written for you.', client: 'A SaaS company', tags: ['n8n', 'Claude', 'Slack'], Visual: Doc,
    problem: 'Leadership wanted a weekly picture of the business, but compiling it took an analyst most of a morning.',
    built: 'An n8n workflow that pulls key metrics, asks Claude to write a short plain-English brief highlighting what changed and why it matters, and posts it to Slack. The prompt is grounded in the numbers so it explains rather than invents.',
    result: 'A consistent brief lands every Monday with no manual work, and questions get asked earlier in the week.' },
  { id: 'retool', title: 'Retool AI assistant', line: 'Ask your own data in plain English.', client: 'A growth agency', tags: ['Retool', 'RAG', 'SQL'], Visual: Chat,
    problem: 'Account managers needed answers from internal data and docs but had to wait for an analyst to write queries.',
    built: 'A Retool app with an AI assistant using retrieval over internal docs and safe, read-only SQL over the warehouse. Answers show the query or source used, so people can check them.',
    result: 'Self-serve answers in seconds, and analysts freed up for deeper work.' },
]

const services = [
  { name: 'Tracking audit', price: '$250', desc: 'A full review of your analytics, Meta CAPI and server-side tracking, with a clear list of fixes.' },
  { name: 'AI automation build', price: 'from $900', desc: 'Workflows and agents that remove repetitive work, including AI on your own data.' },
  { name: '30-min consultation', price: '$40', desc: 'A focused call to untangle a tracking, data or automation problem.' },
]

function CaseDialog({ p, onClose }: { p: Project; onClose: () => void }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', k); document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-900/30 sm:items-center sm:p-6" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="case-title">
      <div className="rise max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white p-6 sm:rounded-2xl sm:p-8" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-neutral-500">{p.client}</p>
            <h3 id="case-title" className="mt-1 text-xl font-semibold">{p.title}</h3>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1.5 hover:bg-neutral-100"><X className="h-5 w-5" /></button>
        </div>
        <dl className="mt-6 space-y-5 text-[15px] leading-relaxed">
          {([['Problem', p.problem], ['What I built', p.built], ['Result', p.result]] as const).map(([k, v]) => (
            <div key={k}><dt className="text-sm font-medium text-neutral-500">{k}</dt><dd className="mt-1 text-neutral-800">{v}</dd></div>
          ))}
        </dl>
        {p.shots && <div className="mt-8 space-y-6">{p.shots.map(sh => (
          <figure key={sh.src}><img src={sh.src} width={sh.w} height={sh.h} alt={sh.alt} loading="lazy" decoding="async" className="h-auto w-full rounded-lg border border-neutral-200" />
            <figcaption className="mt-2 text-sm text-neutral-500">{sh.caption}</figcaption></figure>))}
          <p className="text-xs text-neutral-400">Client names and money figures blurred for NDA.</p></div>}
        <div className="mt-6 flex flex-wrap gap-2">{p.tags.map(t => <Badge key={t}>{t}</Badge>)}</div>
      </div>
    </div>
  )
}

const nav = [['Work', '#work'], ['Services', '#services'], ['About', '#about'], ['Contact', '#contact']]

export default function App() {
  const [open, setOpen] = useState<Project | null>(null)
  const [menu, setMenu] = useState(false)
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <header className="flex items-center justify-between py-6">
        <a href="#" className="font-semibold">Mahmoud Naoum</a>
        <nav className="hidden gap-7 text-sm text-neutral-600 sm:flex">{nav.map(([l, h]) => <a key={l} href={h} className="hover:text-neutral-900">{l}</a>)}</nav>
        <button className="sm:hidden p-1" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </header>
      {menu && <nav className="-mt-2 mb-4 flex flex-col gap-3 border-b border-neutral-100 pb-4 text-neutral-700 sm:hidden">{nav.map(([l, h]) => <a key={l} href={h} onClick={() => setMenu(false)}>{l}</a>)}</nav>}

      <main>
        <section className="rise py-16 sm:py-28">
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">AI automation &amp; analytics engineer.</h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600 sm:text-xl">I help growth teams trust their numbers and automate the busywork.</p>
          <p className="mt-6 text-sm text-neutral-500">Top Rated Plus on Upwork · Works UK/EU hours</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={UPWORK}>Hire me on Upwork <ArrowUpRight className="h-4 w-4" /></Button>
            <Button href="#work" variant="outline">See work</Button>
          </div>
        </section>

        <section id="work" className="scroll-mt-6 py-12">
          <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">Selected work</h2>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
            {projects.map(p => (
              <Card key={p.id} onClick={() => setOpen(p)} aria-label={`Open case study: ${p.title}`}>
                <div className={cn('aspect-[5/3] overflow-hidden rounded-2xl bg-neutral-100 transition-colors group-hover:bg-neutral-200/70', p.thumb ? 'flex items-center p-3 sm:p-4' : 'p-8')}>
                  {p.thumb ? <img src={p.thumb.src} width={p.thumb.w} height={p.thumb.h} alt={p.thumb.alt} loading="lazy" decoding="async" className="h-auto w-full rounded-lg border border-neutral-200 bg-white" /> : <p.Visual />}
                </div>
                <h3 className="mt-4 flex items-center gap-1 font-medium">{p.title}<ArrowUpRight className="h-4 w-4 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></h3>
                <p className="mt-1 text-neutral-600">{p.line}</p>
              </Card>
            ))}
          </div>
        </section>

        <section id="services" className="scroll-mt-6 border-t border-neutral-100 py-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">Services</h2>
          <div className="mt-6 divide-y divide-neutral-100">
            {services.map(s => (
              <div key={s.name} className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
                <div><h3 className="font-medium">{s.name}</h3><p className="mt-1 max-w-xl text-neutral-600">{s.desc}</p></div>
                <p className="shrink-0 text-neutral-900">{s.price}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="scroll-mt-6 border-t border-neutral-100 py-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">About</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-700">I'm a backend and AI engineer based in Egypt. I build tracking, data pipelines and AI automations for growth teams, and I work remotely on UK/EU hours.</p>
        </section>

        <section id="contact" className="scroll-mt-6 border-t border-neutral-100 py-16">
          <h2 className="text-sm font-medium uppercase tracking-wider text-neutral-500">Contact</h2>
          <p className="mt-6 text-lg text-neutral-700">The fastest way to work together is through Upwork.</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {[['Upwork', UPWORK], ['LinkedIn', 'https://www.linkedin.com/in/mahmoud-naoum-bab38718/'], ['GitHub', 'https://github.com/Mahmoudnaoum']].map(([l, h]) => (
              <li key={l}><a href={h} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900">{l}<ArrowUpRight className="h-4 w-4" /></a></li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="border-t border-neutral-100 py-8 text-sm text-neutral-500">© {new Date().getFullYear()} Mahmoud Naoum</footer>
      {open && <CaseDialog p={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
