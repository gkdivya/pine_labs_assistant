import { useQuery } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function InsightsSection() {
  const { data: insights, isLoading, error } = useQuery<{ insights: string }>({
    queryKey: ["/api/insights/business"],
    enabled: true,
  });

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="space-y-2">
        <Label htmlFor="business-insights" className="text-sm font-medium text-gray-900">
          Business Insights
        </Label>
        <Textarea
          id="business-insights"
          value={isLoading ? "Loading insights..." : error ? "Failed to load insights" : insights?.insights || "No insights available"}
          readOnly
          className="min-h-[120px] resize-none bg-gray-50 text-sm"
          placeholder="Business insights will appear here..."
        />
      </div>
    </div>
  );
}