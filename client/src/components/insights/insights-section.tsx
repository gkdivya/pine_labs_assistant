import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, CreditCard, TrendingUp, CheckCircle, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import type { BusinessInsights, MerchantInsights } from "@shared/schema";

interface InsightCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  format?: 'currency' | 'percentage' | 'number';
}

function InsightCard({ title, value, icon, format = 'number' }: InsightCardProps) {
  const formatValue = (val: string | number) => {
    if (format === 'currency') {
      return `₹${typeof val === 'number' ? val.toLocaleString() : val}`;
    }
    if (format === 'percentage') {
      return `${val}%`;
    }
    return typeof val === 'number' ? val.toLocaleString() : val;
  };

  return (
    <Card className="bg-white border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <div className="text-pine-blue">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-gray-900">{formatValue(value)}</div>
      </CardContent>
    </Card>
  );
}

export default function InsightsSection() {
  const merchantName = useMemo(() => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('merchant') || 'Unknown Merchant';
  }, []);

  const { data: businessInsights, isLoading: isLoadingBusiness } = useQuery<BusinessInsights>({
    queryKey: ["/business-insights", merchantName],
    queryFn: async () => {
      const response = await fetch("/business-insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ merchant: merchantName }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch business insights");
      }
      return response.json();
    },
    enabled: true,
  });

  const { data: cardInsights, isLoading: isLoadingCards } = useQuery<MerchantInsights>({
    queryKey: ["/get-cards-data", merchantName],
    queryFn: async () => {
      const response = await fetch("/get-cards-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ merchant: merchantName }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch card insights");
      }
      return response.json();
    },
    enabled: true,
  });

  if (isLoadingBusiness || isLoadingCards) {
    return (
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Merchant Insights - {merchantName}</h2>
          <p className="text-sm text-gray-500">Loading performance data...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-white border border-gray-200">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4">
          <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-3 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!businessInsights && !cardInsights) {
    return (
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Merchant Insights - {merchantName}</h2>
            <p className="text-sm text-gray-500">Unable to load merchant data</p>
          </div>
          <Badge variant="outline" className="text-gray-500 border-gray-300">
            No Data
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Merchant Insights - {merchantName}</h2>
          <p className="text-sm text-gray-500">Performance overview for your Pine Labs account</p>
        </div>
        <Badge variant="outline" className="text-pine-blue border-pine-blue">
          Live Data
        </Badge>
      </div>
      
      {/* Cards Section with Card Insights Data */}
      {cardInsights && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <InsightCard
            title="Total Transactions"
            value={cardInsights.totalTransactions}
            icon={<CreditCard className="w-4 h-4" />}
          />
          
          <InsightCard
            title="Total Refund Amount"
            value={cardInsights.totalRefundAmount}
            icon={<DollarSign className="w-4 h-4" />}
            format="currency"
          />
          
          <InsightCard
            title="Average Settlement Amount"
            value={cardInsights.averageSettlementAmount}
            icon={<TrendingUp className="w-4 h-4" />}
            format="currency"
          />
          
          <InsightCard
            title="Success Rate"
            value={(cardInsights.successRate * 100).toFixed(1)}
            icon={<CheckCircle className="w-4 h-4" />}
            format="percentage"
          />
        </div>
      )}

      {/* Business Insights Text Area */}
      {businessInsights && (
        <div className="mt-4">
          <Card className="bg-white border border-gray-200">
            <CardHeader className="flex flex-row items-center space-y-0 pb-3">
              <FileText className="w-4 h-4 text-pine-blue mr-2" />
              <CardTitle className="text-sm font-medium text-gray-900">Business Insights Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {businessInsights.insights}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}