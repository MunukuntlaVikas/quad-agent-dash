import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Target, Building2, Mail, Bookmark, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import logo from '@/assets/quadrant-logo.png';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Project Hunt', href: '/hunt', icon: Target },
  { name: 'Company Analysis', href: '/analysis', icon: Building2 },
  { name: 'Email Outreach', href: '/email', icon: Mail },
  { name: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
  { name: 'AI Assistant', href: '/chat', icon: MessageSquare },
];

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Quadrant Technologies" className="h-8" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-foreground">Sales Agent</span>
                <span className="text-xs text-muted-foreground">AI-Powered Intelligence</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-card/95 backdrop-blur-lg">
        <div className="grid grid-cols-5 gap-1 p-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px]">{item.name.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
