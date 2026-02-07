// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  auth: {
    login: `${API_URL}/api/auth/login/json`,
    register: `${API_URL}/api/auth/register`,
  },
  campaigns: {
    create: `${API_URL}/api/campaigns/create`,
    list: `${API_URL}/api/campaigns`,
    update: (id: string) => `${API_URL}/api/campaigns/${id}`,
    delete: (id: string) => `${API_URL}/api/campaigns/${id}`,
  },
  adAccounts: {
    connect: `${API_URL}/api/ad-accounts/connect`,
    list: `${API_URL}/api/ad-accounts`,
  },
  suggestions: {
    generate: `${API_URL}/api/suggestions/generate`,
  },
};
