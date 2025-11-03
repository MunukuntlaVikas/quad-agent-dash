import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function EmailOutreach() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    client_name: '',
    company: '',
    domain: '',
    lead_context: '',
  });
  const [results, setResults] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.client_name || !formData.company || !formData.domain) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const data = await api.sendEmail(formData);
      setResults(data);
      if (data.status === 'sent') {
        toast.success('Email sent successfully!');
      } else if (data.status === 'verification_failed') {
        toast.warning('Email verification failed. Please check the contact information.');
      } else {
        toast.error('Failed to send email');
      }
    } catch (error) {
      toast.error('Failed to send email. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-white">
          <Mail className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Email Outreach</h1>
          <p className="text-muted-foreground">
            Generate and send personalized cold emails with verification
          </p>
        </div>
      </div>

      <Card className="p-6 border-border/50 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name *</Label>
              <Input
                id="client_name"
                placeholder="John Doe"
                value={formData.client_name}
                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                placeholder="Acme Corp"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Domain Focus *</Label>
              <Input
                id="domain"
                placeholder="AI, Cloud, Cybersecurity"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lead_context">Additional Context (Optional)</Label>
            <Textarea
              id="lead_context"
              placeholder="Add any specific context about the lead or opportunity..."
              value={formData.lead_context}
              onChange={(e) => setFormData({ ...formData, lead_context: e.target.value })}
              rows={4}
            />
          </div>

          <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Email...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Generate & Send Email
              </>
            )}
          </Button>
        </form>
      </Card>

      {results && (
        <Card className="p-6 border-border/50 shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {results.status === 'sent' ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500" />
              )}
              <h2 className="text-xl font-semibold text-foreground">
                {results.status === 'sent' ? 'Email Sent Successfully' : 'Email Status'}
              </h2>
            </div>

            <div className="space-y-2 text-sm">
              <p><span className="font-medium text-foreground">To:</span> <span className="text-muted-foreground">{results.to}</span></p>
              <p><span className="font-medium text-foreground">Subject:</span> <span className="text-muted-foreground">{results.subject}</span></p>
              {results.verification_score !== undefined && (
                <p>
                  <span className="font-medium text-foreground">Verification Score:</span>{' '}
                  <span className={results.verification_score >= 70 ? 'text-green-500' : 'text-amber-500'}>
                    {results.verification_score}%
                  </span>
                </p>
              )}
            </div>

            {results.preview && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-foreground mb-2">Email Preview</h3>
                <div className="bg-accent/30 rounded-lg p-4 text-sm text-foreground whitespace-pre-wrap">
                  {results.preview}
                </div>
              </div>
            )}

            {results.recommendations && results.recommendations.length > 0 && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Recommendations:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {results.recommendations.map((rec: string, idx: number) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
