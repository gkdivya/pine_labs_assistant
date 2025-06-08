// Frontend types for the Pine Labs Assistant

export interface Message {
  id: number;
  content: string;
  sender: string; // 'user' or 'bot'
  timestamp: Date;
  sessionId: string;
}

// Business insights response type
export interface BusinessInsights {
  insights: string;
}

// Merchant insights type (for card data)
export interface MerchantInsights {
  totalTransactions: number;
  totalRefundAmount: number;
  averageSettlementAmount: number;
  successRate: number;
}

// Merchant insights text type
export interface MerchantInsightsText {
  summary: string;
}

// Weekly insights type (if needed)
export interface WeeklyInsights {
  totalTransactions: number;
  transactionChange: number;
  totalRevenue: number;
  revenueChange: number;
  activeCustomers: number;
  customerChange: number;
  failureRate: number;
  failureChange: number;
  topPaymentMethod: string;
  averageTicket: number;
}
