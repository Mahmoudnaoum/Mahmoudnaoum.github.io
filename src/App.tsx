import { useState, useEffect } from 'react'
import { Moon, Sun, Menu, X, ExternalLink } from 'lucide-react'
import { cn } from './lib/utils'
import './index.css'

// Button Component
const Button = ({ className, variant = 'default', size = 'default', children, ...props }: any) => {
  const variants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  }
  const sizes: Record<string, string> = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  }
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

// Card Components
const Card = ({ className, ...props }: any) => (
  <div
    className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
    {...props}
  />
)

const CardHeader = ({ className, ...props }: any) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
)

const CardTitle = ({ className, ...props }: any) => (
  <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
)

const CardDescription = ({ className, ...props }: any) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props} />
)

const CardContent = ({ className, ...props }: any) => (
  <div className={cn('p-6 pt-0', className)} {...props} />
)

// Badge Component
const Badge = ({ className, variant = 'default', ...props }: any) => {
  const variants: Record<string, string> = {
    default: 'border-transparent bg-primary text-primary-foreground',
    secondary: 'border-transparent bg-secondary text-secondary-foreground',
    outline: 'text-foreground',
  }
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

// Separator Component
const Separator = ({ className, orientation = 'horizontal', ...props }: any) => (
  <div
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    {...props}
  />
)

// Dialog Components (using native dialog for simplicity)
const Dialog = ({ open, onOpenChange, children }: any) => {
  return open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80" onClick={() => onOpenChange(false)} />
      <div className="relative z-50 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto bg-background p-6 rounded-lg shadow-lg">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </div>
    </div>
  ) : null
}

const DialogHeader = ({ className, ...props }: any) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)

const DialogTitle = ({ className, ...props }: any) => (
  <h2 className={cn('text-2xl font-semibold leading-none tracking-tight', className)} {...props} />
)

const DialogDescription = ({ className, ...props }: any) => (
  <p className={cn('text-sm text-muted-foreground', className)} {...props} />
)

// Theme Provider
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const root = window.document.documentElement
    const initialTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light'
    setTheme(initialTheme)
    root.classList.remove('light', 'dark')
    root.classList.add(initialTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(newTheme)
  }

  return { theme, toggleTheme }
}

// Case Study Data
const caseStudies = [
  {
    id: 'data-warehouse',
    title: 'Ad Spend + Product Data Warehouse',
    client: 'A UK Growth Agency',
    tags: ['BigQuery', 'Google Ads', 'Meta', 'Shopify', 'GA4'],
    outcome: 'One weekly board instead of five exports across three tools.',
    problem: "A growth agency was running reports for their clients from five different places: Google Ads, Meta Ads Manager, LinkedIn Campaign Manager, Shopify admin, and GA4. Every Monday, someone spent hours exporting CSVs, copying numbers into a deck, and trying to make the metrics line up across platforms.",
    solution: "I built a BigQuery data warehouse that pulls from all five sources on a schedule, joins them by client and campaign, and outputs one clean weekly board. Google Ads and Meta come in via API, Shopify via webhook, LinkedIn and GA4 through their connectors. Each client gets their own dataset. Spend, clicks, conversions, and revenue all in one query.",
    result: "One weekly board instead of five exports across three tools. The team opens one link on Monday morning and the numbers are already there, matched and ready. When a new client starts, they get added as a row in the config table and the pipeline picks them up automatically."
  },
  {
    id: 'posthog-setup',
    title: 'PostHog Product Analytics Setup',
    client: 'An E-commerce Brand',
    tags: ['PostHog', 'Product Analytics', 'Event Tracking', 'Funnels'],
    outcome: 'Clean event naming, working funnels, and alerts that catch issues before Monday.',
    problem: "An e-commerce company had PostHog installed but events were inconsistently named, funnels gave different numbers depending on who built them, and nobody trusted the dashboard. Engineering renamed events without telling anyone, and tracking broke silently until someone noticed the numbers stopped moving.",
    solution: "I audited the existing events, created a clean taxonomy with one name per action, rebuilt the SDK setup with proper identification and UTM capture, and set up funnels, session replays, and alerts. Added a reverse proxy so ad blockers don't break tracking. Documented the event structure and set up Slack alerts when key metrics spike or drop.",
    result: "Clean event naming, working funnels, and alerts that catch issues before Monday. When the checkout funnel dropped 20%, the team got a Slack alert with a replay link showing the error. Engineering knew what broke and where, and fixed it the same day instead of discovering it a week later in a meeting."
  },
  {
    id: 'ai-brief-agent',
    title: 'AI Weekly Brief Agent',
    client: 'A SaaS Company',
    tags: ['n8n', 'LLM', 'Slack', 'Automation'],
    outcome: 'Monday summary auto-posted to Slack without manual reporting.',
    problem: "A SaaS company's head of growth spent two hours every Monday morning pulling numbers from PostHog, the ads warehouse, Stripe, and the CRM, then writing a summary for the exec team. By the time the update was ready, half the morning was gone and the meeting had usually started.",
    solution: "I built an n8n workflow that runs Sunday night, queries all the data sources, feeds the numbers to an LLM with a prompt template, and posts the formatted summary to Slack. The prompt asks for week-over-week changes, flags anything that moved more than 15%, and keeps the tone conversational. If a data source fails, it posts an error and skips that section instead of breaking the whole brief.",
    result: "Monday summary auto-posted to Slack without manual reporting. The team opens Slack on Monday morning and the brief is already there. When MRR dropped one week, the alert fired and everyone saw it before the standup instead of discovering it mid-meeting. The head of growth gets those two hours back every week."
  },
  {
    id: 'retool-ai-assistant',
    title: 'Retool AI Assistant',
    client: 'A Growth Agency',
    tags: ['Retool', 'RAG', 'AI', 'Data'],
    outcome: 'Team asks questions in plain English, gets answers from their own data.',
    problem: "A growth agency had client data across their CRM, the ads warehouse, and a BigQuery analytics database. When account managers needed to answer a client question, they'd Slack the data team, wait for a query, then interpret the results. Simple questions like 'which campaigns drove the most revenue last month' took hours to answer.",
    solution: "I built a Retool app with an AI assistant that runs RAG over their data. The team types a question in plain English, the LLM generates SQL, runs it against the warehouse and CRM, and returns the answer with a chart if it makes sense. Added guardrails so it can't write to the database or access tables outside the approved list. Logged every query so the data team can see what people are asking.",
    result: "Team asks questions in plain English, gets answers from their own data. Account managers can answer client questions during the call instead of saying 'I'll get back to you'. The data team sees the query log and knows which questions come up most often, so they can build those into dashboards. Questions that used to take half a day now take thirty seconds."
  }
]

function App() {
  const { theme, toggleTheme } = useTheme()
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const selectedCaseStudy = caseStudies.find(cs => cs.id === selectedCase)

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            <a href="#" className="flex items-center space-x-2">
              <span className="font-bold text-xl">Mahmoud Naoum</span>
            </a>
            <nav className="hidden md:flex gap-6">
              <a href="#work" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Work
              </a>
              <a href="#services" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Services
              </a>
              <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden border-t p-4">
            <nav className="flex flex-col gap-3">
              <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium">Work</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium">Services</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-sm font-medium">Contact</a>
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="container py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Hello, I'm Mahmoud! 👋
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              I'm an AI automation & analytics engineer who helps growth teams trust their numbers and automate the busywork.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              I work remotely from Egypt on UK and EU hours, building clean data pipelines and AI agents for growth teams who need one person to handle both the tracking and the automation.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge>⭐ Top Rated Plus on Upwork</Badge>
              <Badge variant="secondary">🌍 UK/EU Hours</Badge>
              <Badge variant="outline">🔒 NDA Work</Badge>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="container py-16">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-8">
            Featured Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <Card
                key={study.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedCase(study.id)}
              >
                <CardHeader>
                  <CardTitle className="text-xl">{study.title}</CardTitle>
                  <CardDescription>{study.client}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{study.outcome}</p>
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="container py-16 bg-muted/50">
          <div className="py-8">
            <h2 className="text-3xl font-bold mb-8">Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tracking Audit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">$250</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    I review what you track today, find what's broken, and give you a plan to fix it.
                  </p>
                  <Button className="w-full" asChild>
                    <a href="https://www.upwork.com/freelancers/mahmoudn16" target="_blank" rel="noopener noreferrer">
                      Get started <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">AI Automation Build</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">$900+</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Weekly reports and workflows that run on their own with n8n or a custom agent.
                  </p>
                  <Button className="w-full" asChild>
                    <a href="https://www.upwork.com/freelancers/mahmoudn16" target="_blank" rel="noopener noreferrer">
                      Get started <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">30-min Call</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">$40</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    We'll look at your setup, your questions, and whether we should work together.
                  </p>
                  <Button className="w-full" asChild>
                    <a href="https://www.upwork.com/freelancers/mahmoudn16" target="_blank" rel="noopener noreferrer">
                      Book now <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Let's work together</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Feel free to reach out if you need help with analytics setup, data pipelines, or AI automation. Most of my work is under NDA, but I'm happy to walk through case studies on a call.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="mailto:mahmoudnaoum13@gmail.com">
                  mahmoudnaoum13@gmail.com
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.linkedin.com/in/mahmoud-naoum-bab38718/" target="_blank" rel="noopener noreferrer">
                  LinkedIn <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.upwork.com/freelancers/mahmoudn16" target="_blank" rel="noopener noreferrer">
                  Upwork <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
        <div className="container py-8">
          <p className="text-sm text-muted-foreground">
            © 2026 Mahmoud Naoum. Working remotely from Egypt on UK/EU hours.
          </p>
        </div>
      </footer>

      {/* Case Study Dialog */}
      <Dialog open={!!selectedCase} onOpenChange={() => setSelectedCase(null)}>
        {selectedCaseStudy && (
          <>
            <DialogHeader>
              <DialogTitle>{selectedCaseStudy.title}</DialogTitle>
              <DialogDescription>{selectedCaseStudy.client}</DialogDescription>
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedCaseStudy.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </DialogHeader>
            <Separator className="my-6" />
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Problem</h3>
                <p className="text-muted-foreground">{selectedCaseStudy.problem}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">What I Built</h3>
                <p className="text-muted-foreground">{selectedCaseStudy.solution}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Result</h3>
                <p className="text-muted-foreground">{selectedCaseStudy.result}</p>
              </div>
            </div>
          </>
        )}
      </Dialog>
    </div>
  )
}

export default App
