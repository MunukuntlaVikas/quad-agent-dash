import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { api, HuntBookmarkRequest } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2, Target, Download, Bookmark as BookmarkIcon, Search } from 'lucide-react';

export default function ProjectHunt() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    domain_focus: '',
    location: '',
    industry: '',
  });
  const [results, setResults] = useState<any>(null);
  const [bookmarkForm, setBookmarkForm] = useState({
    added_by: '',
    reason: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.domain_focus) {
      toast.error('Please enter a domain focus');
      return;
    }

    setLoading(true);
    try {
      const data = await api.huntProjects(formData);
      setResults(data);
      toast.success('Project hunt completed successfully!');
    } catch (error) {
      toast.error('Failed to hunt projects. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      await api.downloadHuntReport(formData);
      toast.success('Report downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download report');
      console.error(error);
    }
  };

  const handleBookmark = async () => {
    if (!bookmarkForm.added_by || !bookmarkForm.reason) {
      toast.error('Please fill in all bookmark fields');
      return;
    }

    try {
      const bookmarkData: HuntBookmarkRequest = {
        company_name: `${formData.domain_focus} - ${formData.industry}`,
        domain_focus: formData.domain_focus,
        industry: formData.industry,
        location: formData.location,
        full_report_content: results.opportunities_report,
        added_by: bookmarkForm.added_by,
        reason: bookmarkForm.reason,
      };
      await api.addBookmark(bookmarkData);
      toast.success('Hunt results bookmarked successfully!');
      setBookmarkForm({ added_by: '', reason: '' });
    } catch (error) {
      toast.error('Failed to bookmark results');
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white">
          <Target className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Project Hunt</h1>
          <p className="text-muted-foreground">
            Discover active opportunities, RFPs, and POC projects
          </p>
        </div>
      </div>

      {/* Hunt Form */}
      <Card className="p-6 border-border/50 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="domain_focus">Domain Focus *</Label>
              <Input
                id="domain_focus"
                placeholder="e.g., AI, Cloud Computing, Cybersecurity"
                value={formData.domain_focus}
                onChange={(e) => setFormData({ ...formData, domain_focus: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="e.g., Healthcare, Finance, Retail"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., United States, Europe, Global"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <Button type="submit" size="lg" disabled={loading} className="w-full md:w-auto">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Hunting Projects...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Start Hunt
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Results */}
      {results && (
        <>
          <Card className="p-6 border-border/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Hunt Results</h2>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download Report
              </Button>
            </div>
            <div className="space-y-2 text-sm mb-4 text-muted-foreground">
              <p><span className="font-medium text-foreground">Domain:</span> {results.domain_focus}</p>
              {results.location && <p><span className="font-medium text-foreground">Location:</span> {results.location}</p>}
              {results.industry && <p><span className="font-medium text-foreground">Industry:</span> {results.industry}</p>}
            </div>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-foreground bg-accent/30 rounded-lg p-4">
                {results.opportunities_report}
              </div>
            </div>
          </Card>

          {/* Bookmark Section */}
          <Card className="p-6 border-border/50 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <BookmarkIcon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Bookmark This Hunt</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="added_by">Your Name</Label>
                <Input
                  id="added_by"
                  placeholder="John Doe"
                  value={bookmarkForm.added_by}
                  onChange={(e) => setBookmarkForm({ ...bookmarkForm, added_by: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Bookmarking</Label>
                <Textarea
                  id="reason"
                  placeholder="Why are you saving this?"
                  value={bookmarkForm.reason}
                  onChange={(e) => setBookmarkForm({ ...bookmarkForm, reason: e.target.value })}
                  rows={1}
                />
              </div>
            </div>
            <Button onClick={handleBookmark} className="mt-4">
              <BookmarkIcon className="mr-2 h-4 w-4" />
              Save to Bookmarks
            </Button>
          </Card>
        </>
      )}
    </div>
  );
}
