import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { CheckItem } from "./CheckItem";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Download, RefreshCw } from "lucide-react";

interface QACheck {
  title: string;
  description: string;
  status: "pass" | "fail" | "warning";
  details?: string;
}

interface QACategory {
  category: string;
  checks: QACheck[];
}

interface QAResultsProps {
  results: QACategory[];
  url: string;
  onReset: () => void;
}

export function QAResults({ results, url, onReset }: QAResultsProps) {
  const totalChecks = results.reduce((acc, cat) => acc + cat.checks.length, 0);
  const passedChecks = results.reduce(
    (acc, cat) => acc + cat.checks.filter((c) => c.status === "pass").length,
    0
  );
  const failedChecks = results.reduce(
    (acc, cat) => acc + cat.checks.filter((c) => c.status === "fail").length,
    0
  );
  const warningChecks = results.reduce(
    (acc, cat) => acc + cat.checks.filter((c) => c.status === "warning").length,
    0
  );

  const overallStatus = failedChecks === 0 ? "PASS" : "FAIL";

  const handleExport = () => {
    const reportData = {
      url,
      timestamp: new Date().toISOString(),
      overallStatus,
      summary: {
        total: totalChecks,
        passed: passedChecks,
        failed: failedChecks,
        warnings: warningChecks,
      },
      results,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "application/json",
    });
    const url_export = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url_export;
    a.download = `qa-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url_export);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-[#0070E0] bg-gradient-to-br from-white to-blue-50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>QA Analysis Results</CardTitle>
              <CardDescription className="mt-2">
                Page analyzed: <span className="text-gray-700">{url}</span>
              </CardDescription>
            </div>
            <Badge
              className={`${
                overallStatus === "PASS"
                  ? "bg-green-600"
                  : "bg-red-600"
              } text-white text-lg px-4 py-2`}
            >
              {overallStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <div className="text-gray-600">Total Checks</div>
              <div className="mt-1">{totalChecks}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <div className="text-green-700">Passed</div>
              <div className="text-green-600 mt-1">{passedChecks}</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
              <div className="text-red-700">Failed</div>
              <div className="text-red-600 mt-1">{failedChecks}</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
              <div className="text-yellow-700">Warnings</div>
              <div className="text-yellow-600 mt-1">{warningChecks}</div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              onClick={handleExport}
              variant="outline"
              className="flex-1 border-[#0070E0] text-[#0070E0] hover:bg-blue-50"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button
              onClick={onReset}
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-50"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              New Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Checklist</CardTitle>
          <CardDescription>
            Review each category to see specific compliance checks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full" defaultValue={results.map((_, i) => `item-${i}`)}>
            {results.map((category, index) => {
              const categoryPassed = category.checks.filter(
                (c) => c.status === "pass"
              ).length;
              const categoryFailed = category.checks.filter(
                (c) => c.status === "fail"
              ).length;
              const categoryWarnings = category.checks.filter(
                (c) => c.status === "warning"
              ).length;

              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span>{category.category}</span>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {categoryPassed} passed
                        </Badge>
                        {categoryFailed > 0 && (
                          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                            {categoryFailed} failed
                          </Badge>
                        )}
                        {categoryWarnings > 0 && (
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            {categoryWarnings} warnings
                          </Badge>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      {category.checks.map((check, checkIndex) => (
                        <CheckItem
                          key={checkIndex}
                          title={check.title}
                          description={check.description}
                          status={check.status}
                          details={check.details}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
