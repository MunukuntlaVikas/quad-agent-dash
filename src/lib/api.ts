// API configuration and client
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface ProjectHuntRequest {
  domain_focus: string;
  location?: string;
  industry?: string;
}

export interface CompanyAnalysisRequest {
  company_name: string;
  industry?: string;
  location?: string;
}

export interface EmailRequest {
  email: string;
  client_name: string;
  company: string;
  domain: string;
  lead_context?: string;
}

export interface BookmarkRequest {
  company_name: string;
  analysis_summary: string;
  added_by: string;
  reason: string;
}

export interface HuntBookmarkRequest {
  company_name: string;
  domain_focus: string;
  industry: string;
  location: string;
  full_report_content: string;
  added_by: string;
  reason: string;
}

export interface ChatRequest {
  company_name: string;
  question: string;
}

// API Client
export const api = {
  // Project Hunting
  huntProjects: async (data: ProjectHuntRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/hunt`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to hunt projects');
    return response.json();
  },

  downloadHuntReport: async (data: ProjectHuntRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/hunt/report.docx`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to download report');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hunt_report_${Date.now()}.docx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  // Company Analysis
  analyzeCompany: async (data: CompanyAnalysisRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/analyze-company`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to analyze company');
    return response.json();
  },

  downloadCompanyAnalysis: async (data: CompanyAnalysisRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/analyze-company/report.docx`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to download analysis');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `company_analysis_${Date.now()}.docx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  // Email
  sendEmail: async (data: EmailRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/sales/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to send email');
    return response.json();
  },

  // Bookmarks
  addBookmark: async (data: HuntBookmarkRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/hunt/bookmark`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to add bookmark');
    return response.json();
  },

  getBookmarks: async (addedBy?: string) => {
    const url = addedBy 
      ? `${API_BASE_URL}/api/v1/projects/bookmarks/enhanced?added_by=${addedBy}`
      : `${API_BASE_URL}/api/v1/projects/bookmarks/enhanced`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to get bookmarks');
    return response.json();
  },

  deleteBookmark: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/bookmarks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete bookmark');
    return response.json();
  },

  downloadBookmark: async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/bookmarks/${id}/download`);
    if (!response.ok) throw new Error('Failed to download bookmark');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookmark_${id}.docx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  // Chat
  chat: async (data: ChatRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/v1/projects/chat/enhanced`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to send chat message');
    return response.json();
  },

  // Health check
  healthCheck: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) throw new Error('API is not healthy');
    return response.json();
  },
};
