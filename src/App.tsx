import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Menu, X, ExternalLink, ArrowRight, Database, Zap, Brain, BarChart3, Globe, Sparkles, CheckCircle2, Star } from 'lucide-react'
import { cn } from './lib/utils'
import './index.css'

// Utility hooks
function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  
  useEffect(() => {
    const root = window.document.documentElement
    const stored = localStorage.getItem('theme') as 'light' | 'dark' || 'dark'
    setTheme(stored)
    root.classList.remove('light', 'dark')
    root.classList.add(stored)
  }, [])

  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(newTheme)
  }

  return { theme, toggle }
}

function useCounter(end: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration])
  
  return count
}

// UI Components
const Button = ({ className, variant = 'default', size = 'default', children, asChild, ...props }: any) => {
  const Comp = asChild ? 'span' : 'button'
  const variants: Record<string, string> = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  }
  const sizes: Record<string, string> = {
    default: 'h-10 px-4 py-2',
    lg: 'h-12 px-8 text-base',
    icon: 'h-10 w-10',
  }
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {asChild && typeof children === 'function' ? children() : children}
    </Comp>
  )
}

const Card = ({ className, ...props }: any) => (
  <div
    className={cn('rounded-xl border bg-card text-card-foreground shadow', className)}
    {...props}
  />
)

const Badge = ({ className, variant = 'default', ...props }: any) => {
  const variants: Record<string, string> = {
    default: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary text-secondary-foreground',
  }
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

// Case study data with visual components
const caseStudies = [
  {
    id: 1,
    icon: <Database className="w-6 h-6" />,
    title: 'Ad Spend + Product Data Warehouse',
    client: 'A UK Growth Agency',
    tags: ['BigQuery', 'Google Ads', 'Meta', 'Shopify', 'GA4'],
    outcome: 'One weekly board instead of five exports',
    problem: "A growth agency was running reports for their clients from five different places: Google Ads, Meta Ads Manager, LinkedIn Campaign Manager, Shopify admin, and GA4. Every Monday, someone spent hours exporting CSVs, copying numbers into a deck, and trying to make the metrics line up across platforms.",
    solution: "I built a BigQuery data warehouse that pulls from all five sources on a schedule, joins them by client and campaign, and outputs one clean weekly board. Google Ads and Meta come in via API, Shopify via webhook, LinkedIn and GA4 through their connectors. Each client gets their own dataset.",
    result: "One weekly board instead of five exports across three tools. The team opens one link on Monday morning and the numbers are already there, matched and ready. When a new client starts, they get added as a row in the config table.",
    visual: (
      <div className="flex items-end justify-center gap-1 h-24">
        {[40, 65, 85, 55, 95, 75].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="w-8 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t"
          />
        ))}
      </div>
    )
  },
  {
    id: 2,
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'PostHog Product Analytics Setup',
    client: 'An E-commerce Brand',
    tags: ['PostHog', 'Analytics', 'Events', 'Funnels'],
    outcome: 'Clean event naming and working alerts',
    problem: "An e-commerce company had PostHog installed but events were inconsistently named, funnels gave different numbers depending on who built them, and nobody trusted the dashboard.",
    solution: "I audited existing events, created a clean taxonomy with one name per action, rebuilt the SDK setup with proper identification and UTM capture, and set up funnels, session replays, and alerts.",
    result: "Clean event naming, working funnels, and alerts that catch issues before Monday. When the checkout funnel dropped 20%, the team got a Slack alert with a replay link showing the error.",
    visual: (
      <div className="flex items-center justify-center gap-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.15 }}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold"
          >
            {i + 1}
          </motion.div>
        ))}
        <motion.div
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <ArrowRight className="w-6 h-6 text-purple-500" />
        </motion.div>
      </div>
    )
  },
  {
    id: 3,
    icon: <Zap className="w-6 h-6" />,
    title: 'AI Weekly Brief Agent',
    client: 'A SaaS Company',
    tags: ['n8n', 'LLM', 'Slack', 'Automation'],
    outcome: 'Auto-posted Monday summaries',
    problem: "A SaaS company's head of growth spent two hours every Monday morning pulling numbers from PostHog, the ads warehouse, Stripe, and the CRM, then writing a summary for the exec team.",
    solution: "I built an n8n workflow that runs Sunday night, queries all data sources, feeds the numbers to an LLM with a prompt template, and posts the formatted summary to Slack.",
    result: "Monday summary auto-posted to Slack without manual reporting. The team opens Slack on Monday morning and the brief is already there. The head of growth gets those two hours back every week.",
    visual: (
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className="h-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded"
            style={{ width: `${100 - i * 15}%` }}
          />
        ))}
      </div>
    )
  },
  {
    id: 4,
    icon: <Brain className="w-6 h-6" />,
    title: 'Retool AI Assistant',
    client: 'A Growth Agency',
    tags: ['Retool', 'RAG', 'AI', 'SQL'],
    outcome: 'Plain English data queries',
    problem: "A growth agency had client data across their CRM, ads warehouse, and BigQuery. When account managers needed to answer a client question, they'd Slack the data team, wait for a query, then interpret the results.",
    solution: "I built a Retool app with an AI assistant that runs RAG over their data. The team types a question in plain English, the LLM generates SQL, runs it against the warehouse and CRM, and returns the answer with a chart.",
    result: "Team asks questions in plain English, gets answers from their own data. Account managers can answer client questions during the call. Questions that used to take half a day now take thirty seconds.",
    visual: (
      <div className="flex gap-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <div className="flex-1 space-y-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded"
            />
          ))}
        </div>
      </div>
    )
  }
]

const tools = ['BigQuery', 'PostHog', 'n8n', 'Retool', 'Meta Ads', 'Google Ads', 'OpenAI', 'Shopify', 'GA4']

function App() {
  const { theme, toggle } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const earned = useCounter(30)

  const selectedCaseStudy = caseStudies.find(cs => cs.id === selectedCase)

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg"
      >
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Mahmoud Naoum
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#work" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Work</a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggle}>
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button className="hidden md:inline-flex" asChild>
              <a href="mailto:mahmoudnaoum13@gmail.com">Get Started</a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='%23888' stroke-width='1' opacity='0.1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="container relative px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-medium">Top Rated Plus on Upwork</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              I will track{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                your growth.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              AI automation & analytics engineer who helps growth teams trust their numbers and automate the busywork.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="text-lg" asChild>
                  <a href="#pricing">
                    View Services <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="text-lg" asChild>
                  <a href="#work">See Case Studies</a>
                </Button>
              </motion.div>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                  ${earned}K+
                </div>
                <div className="text-sm text-muted-foreground">Earned on Upwork</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
                  <Globe className="w-8 h-8" />
                  UK/EU
                </div>
                <div className="text-sm text-muted-foreground">Working Hours</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-2">
                  100%
                </div>
                <div className="text-sm text-muted-foreground">Under NDA</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools Marquee */}
      <section className="border-y bg-muted/30 py-8">
        <div className="container px-4">
          <div className="flex gap-8 overflow-hidden">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex gap-8 items-center"
            >
              {[...tools, ...tools].map((tool, i) => (
                <Badge key={i} variant="secondary" className="whitespace-nowrap text-sm px-4 py-2">
                  {tool}
                </Badge>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies Bento Grid */}
      <section id="work" className="py-24">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real projects. Real results. All under NDA.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {caseStudies.map((study, i) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedCase(study.id)}
                className={cn(
                  "group relative cursor-pointer",
                  study.id === 1 && "md:col-span-2"
                )}
              >
                <Card className="h-full p-8 border-2 hover:border-primary/50 transition-all bg-card/50 backdrop-blur">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      {study.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1">{study.title}</h3>
                      <p className="text-sm text-muted-foreground">{study.client}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    {study.visual}
                  </div>

                  <p className="text-muted-foreground mb-4">{study.outcome}</p>

                  <div className="flex flex-wrap gap-2">
                    {study.tags.map(tag => (
                      <Badge key={tag} variant="default">{tag}</Badge>
                    ))}
                  </div>

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple Pricing</h2>
            <p className="text-xl text-muted-foreground">Fixed prices. Clear scope.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: 'Tracking Audit', price: '$250', desc: 'Review what you track, find what is broken, get a plan to fix it.', popular: false },
              { name: 'AI Automation', price: '$900+', desc: 'Weekly reports and workflows that run on their own with n8n or custom agents.', popular: true },
              { name: '30-min Call', price: '$40', desc: 'We will look at your setup and whether we should work together.', popular: false }
            ].map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <Card className={cn(
                  "h-full p-8 text-center",
                  plan.popular && "border-2 border-primary shadow-lg"
                )}>
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {plan.price}
                  </div>
                  <p className="text-muted-foreground mb-8">{plan.desc}</p>
                  <Button className="w-full" asChild>
                    <a href="https://www.upwork.com/freelancers/mahmoudn16" target="_blank" rel="noopener noreferrer">
                      Get Started <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24">
        <div className="container px-4 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">FAQ</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { q: 'Do you work with clients under NDA?', a: 'Yes, all my work is confidential. I cannot name clients, but I am happy to walk through case studies on a call.' },
              { q: 'What are your working hours?', a: 'I work remotely from Egypt on UK and EU hours (9am-6pm GMT/CET).' },
              { q: 'How do we get started?', a: 'Book a $40 consultation call, or start with a $250 tracking audit. We will look at your setup and go from there.' }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    {faq.q}
                  </h3>
                  <p className="text-muted-foreground">{faq.a}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Let's talk about your analytics setup, data pipelines, or AI automation needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100" asChild>
                <a href="mailto:mahmoudnaoum13@gmail.com">mahmoudnaoum13@gmail.com</a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <a href="https://www.linkedin.com/in/mahmoud-naoum-bab38718/" target="_blank" rel="noopener noreferrer">
                  LinkedIn <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          © 2026 Mahmoud Naoum. Working remotely from Egypt on UK/EU hours.
        </div>
      </footer>

      {/* Case Study Dialog */}
      {selectedCase && selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={() => setSelectedCase(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-xl shadow-2xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setSelectedCase(null)} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted">
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  {selectedCaseStudy.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{selectedCaseStudy.title}</h2>
                  <p className="text-muted-foreground">{selectedCaseStudy.client}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedCaseStudy.tags.map(tag => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>

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
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default App
