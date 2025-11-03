import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { Bookmark, Download, Trash2, Search, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterBy, setFilterBy] = useState('');

  const fetchBookmarks = async () => {
    setLoading(true);
    try {
      const data = await api.getBookmarks(filterBy || undefined);
      setBookmarks(data.bookmarks || []);
    } catch (error) {
      toast.error('Failed to load bookmarks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [filterBy]);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this bookmark?')) return;
    
    try {
      await api.deleteBookmark(id);
      toast.success('Bookmark deleted successfully');
      fetchBookmarks();
    } catch (error) {
      toast.error('Failed to delete bookmark');
      console.error(error);
    }
  };

  const handleDownload = async (id: number) => {
    try {
      await api.downloadBookmark(id);
      toast.success('Document downloaded successfully');
    } catch (error) {
      toast.error('Failed to download document');
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white">
          <Bookmark className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bookmarks</h1>
          <p className="text-muted-foreground">
            Your saved research and analysis reports
          </p>
        </div>
      </div>

      {/* Filter */}
      <Card className="p-4 border-border/50">
        <div className="flex items-center gap-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Filter by person name..."
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </Card>

      {/* Bookmarks List */}
      {loading ? (
        <Card className="p-8 text-center border-border/50">
          <p className="text-muted-foreground">Loading bookmarks...</p>
        </Card>
      ) : bookmarks.length === 0 ? (
        <Card className="p-8 text-center border-border/50">
          <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">No bookmarks found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Start by bookmarking project hunts or company analyses
          </p>
        </Card>
      ) : (
        <div className="grid gap-6">
          {bookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="p-6 border-border/50 hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-foreground">
                      {bookmark.company_name}
                    </h3>
                    <Badge variant={bookmark.report_type === 'hunt' ? 'default' : 'secondary'}>
                      {bookmark.report_type === 'hunt' ? 'Project Hunt' : 'Company Analysis'}
                    </Badge>
                  </div>

                  <div className="grid gap-2 text-sm text-muted-foreground">
                    {bookmark.domain_focus && (
                      <p><span className="font-medium text-foreground">Domain:</span> {bookmark.domain_focus}</p>
                    )}
                    {bookmark.industry && (
                      <p><span className="font-medium text-foreground">Industry:</span> {bookmark.industry}</p>
                    )}
                    {bookmark.location && (
                      <p><span className="font-medium text-foreground">Location:</span> {bookmark.location}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {bookmark.added_by}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(bookmark.date_added).toLocaleDateString()}
                    </div>
                  </div>

                  {bookmark.reason && (
                    <p className="text-sm text-muted-foreground italic bg-accent/30 rounded px-3 py-2">
                      "{bookmark.reason}"
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  {bookmark.document_path && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(bookmark.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(bookmark.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
