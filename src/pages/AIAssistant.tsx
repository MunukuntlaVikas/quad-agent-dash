import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { MessageSquare, Send, Bot, User as UserIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistant() {
  const [companyName, setCompanyName] = useState('');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName || !question) {
      toast.error('Please enter both company name and question');
      return;
    }

    const userMessage: Message = { role: 'user', content: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);

    try {
      const data = await api.chat({ company_name: companyName, question });
      const assistantMessage: Message = { role: 'assistant', content: data.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      toast.error('Failed to get response. Make sure the company is bookmarked.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
          <MessageSquare className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
          <p className="text-muted-foreground">
            Ask questions about your bookmarked research
          </p>
        </div>
      </div>

      {/* Company Selection */}
      <Card className="p-4 border-border/50">
        <Label htmlFor="company_name">Company Name</Label>
        <Input
          id="company_name"
          placeholder="Enter company name from your bookmarks"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mt-2"
        />
      </Card>

      {/* Chat Area */}
      <Card className="border-border/50 overflow-hidden">
        <ScrollArea className="h-[500px] p-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <Bot className="h-16 w-16 text-muted-foreground opacity-50" />
              <div>
                <p className="text-lg font-medium text-foreground">Start a conversation</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Ask questions about your bookmarked companies
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex gap-3 justify-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-accent text-foreground rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="border-t p-4 bg-accent/20">
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask a question about the company..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              className="resize-none"
              rows={2}
              disabled={loading || !companyName}
            />
            <Button type="submit" size="icon" disabled={loading || !companyName || !question}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send, Shift+Enter for new line
          </p>
        </form>
      </Card>
    </div>
  );
}
