import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";

interface CheckItemProps {
  title: string;
  description: string;
  status: "pass" | "fail" | "warning";
  details?: string;
}

export function CheckItem({ title, description, status, details }: CheckItemProps) {
  const statusConfig = {
    pass: {
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      badge: "bg-green-600",
      label: "PASS",
    },
    fail: {
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      badge: "bg-red-600",
      label: "FAIL",
    },
    warning: {
      icon: AlertCircle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      badge: "bg-yellow-600",
      label: "WARNING",
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div className={`p-4 rounded-lg border-2 ${config.bgColor} border-gray-200`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <Icon className={`h-5 w-5 mt-0.5 ${config.color}`} />
          <div className="flex-1">
            <h4 className="mb-1">{title}</h4>
            <p className="text-gray-600">{description}</p>
            {details && (
              <p className="mt-2 text-gray-700 bg-white p-2 rounded border border-gray-200">
                {details}
              </p>
            )}
          </div>
        </div>
        <Badge className={`${config.badge} text-white shrink-0`}>
          {config.label}
        </Badge>
      </div>
    </div>
  );
}
