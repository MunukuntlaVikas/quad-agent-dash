import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Building2, Mail, Bookmark, MessageSquare, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Target,
    title: 'Project Hunt',
    description: 'AI-powered discovery of active project requirements, RFPs, and POC opportunities',
    href: '/hunt',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Building2,
    title: 'Company Analysis',
    description: 'Deep dive into company readiness, decision-makers, and optimal approach strategies',
    href: '/analysis',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    icon: Mail,
    title: 'Email Outreach',
    description: 'Generate and send personalized cold emails with contact verification',
    href: '/email',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Bookmark,
    title: 'Bookmarks',
    description: 'Save and organize your research with full document storage and retrieval',
    href: '/bookmarks',
    gradient: 'from-blue-500 to-violet-600',
  },
  {
    icon: MessageSquare,
    title: 'AI Assistant',
    description: 'Chat with AI about your saved research and get instant insights',
    href: '/chat',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-8 md:p-12 text-primary-foreground shadow-lg">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.1))]" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-6 w-6" />
            <span className="text-sm font-semibold uppercase tracking-wider opacity-90">
              Sales Intelligence Platform
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            AI-Powered Sales Agent
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mb-6">
            Hunt opportunities, analyze companies, automate outreach, and close deals faster with intelligent automation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/hunt">Start Project Hunt</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/analysis">Analyze Company</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Platform Features</h2>
          <p className="text-muted-foreground">
            Comprehensive tools for modern sales teams
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.href} to={feature.href}>
                <Card className="group relative overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 p-6 h-full">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`} />
                  <div className="relative space-y-3">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-md`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <Card className="border-border/50 p-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">AI-Powered</div>
            <p className="text-sm text-muted-foreground">
              Advanced Gemini AI for intelligent insights
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">Real-Time</div>
            <p className="text-sm text-muted-foreground">
              Live data from multiple sources
            </p>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">Automated</div>
            <p className="text-sm text-muted-foreground">
              Smart workflows that save hours daily
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
