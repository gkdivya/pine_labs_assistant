import { TrendingUp, TrendingDown, DollarSign, CreditCard, Users, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import type { WeeklyInsights } from "@shared/schema";

interface InsightItemProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  format?: 'currency' | 'percentage' | 'number';
}

function InsightItem({ title, value, change, icon, format = 'number' }: InsightItemProps) {
  const formatValue = (val: string | number) => {
    if (format === 'currency') {
      return `₹${typeof val === 'number' ? val.toLocaleString() : val}`;
    }
    if (format === 'percentage') {
      return `${val}%`;
    }
    return typeof val === 'number' ? val.toLocaleString() : val;
  };

  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center space-x-3">
        <div className="text-pine-blue">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          {change !== undefined && (
            <div className="flex items-center mt-1">
              {isPositive && <TrendingUp className="w-3 h-3 text-green-500 mr-1" />}
              {isNegative && <TrendingDown className="w-3 h-3 text-red-500 mr-1" />}
              <span className={`text-xs ${isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-500'}`}>
                {change > 0 ? '+' : ''}{change}% from last week
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-gray-900">{formatValue(value)}</div>
      </div>
    </div>
  );
}

export default function InsightsSection() {
  const { data: insights, isLoading } = useQuery<WeeklyInsights>({
    queryKey: ["/api/insights/weekly"],
    enabled: true,
  });

  if (isLoading) {
    return (
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Last Week Insights</h2>
          <p className="text-sm text-gray-500">Loading performance data...</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Last Week Insights</h2>
            <p className="text-sm text-gray-500">Connect your Pine Labs account to view insights</p>
          </div>
          <Badge variant="outline" className="text-gray-500 border-gray-300">
            No Data
          </Badge>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 text-sm">
            Please connect your Pine Labs merchant account to view transaction insights and analytics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Last Week Insights</h2>
          <p className="text-sm text-gray-500">Performance overview for your Pine Labs account</p>
        </div>
        <Badge variant="outline" className="text-pine-blue border-pine-blue">
          Live Data
        </Badge>
      </div>
      
      <div className="space-y-1 divide-y divide-gray-100">
        <InsightItem
          title="Total Transactions"
          value={insights?.totalTransactions ?? 0}
          change={insights?.transactionChange}
          icon={<CreditCard className="w-5 h-5" />}
        />
        
        <InsightItem
          title="Total Revenue"
          value={insights?.totalRevenue ?? 0}
          change={insights?.revenueChange}
          icon={<DollarSign className="w-5 h-5" />}
          format="currency"
        />
        
        <InsightItem
          title="Active Customers"
          value={insights?.activeCustomers ?? 0}
          change={insights?.customerChange}
          icon={<Users className="w-5 h-5" />}
        />
        
        <InsightItem
          title="Failure Rate"
          value={insights?.failureRate ?? 0}
          change={insights?.failureChange}
          icon={<AlertCircle className="w-5 h-5" />}
          format="percentage"
        />
      </div>
      
      {insights?.topPaymentMethod && insights?.averageTicket && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Top Payment Method: <span className="font-medium text-pine-blue">{insights.topPaymentMethod}</span></span>
            <span className="text-gray-600">Avg. Ticket: <span className="font-medium text-gray-900">₹{insights.averageTicket.toLocaleString()}</span></span>
          </div>
        </div>
      )}
    </div>
  );
}