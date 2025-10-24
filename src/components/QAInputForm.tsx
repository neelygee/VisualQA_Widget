import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Loader2 } from "lucide-react";

interface QAInputFormProps {
  onAnalyze: (url: string, securityKey: string) => void;
  isAnalyzing: boolean;
}

export function QAInputForm({ onAnalyze, isAnalyzing }: QAInputFormProps) {
  const [url, setUrl] = useState("");
  const [securityKey, setSecurityKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && securityKey) {
      onAnalyze(url, securityKey);
    }
  };

  return (
    <Card className="border-[#0070E0] border-2">
      <CardHeader>
        <CardTitle>Visual Quality Assurance Tool</CardTitle>
        <CardDescription>
          Enter the preview URL and security key to analyze brand compliance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url">Preview URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://preview.docusign.com/page"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="security-key">Security Key</Label>
            <Input
              id="security-key"
              type="password"
              placeholder="Enter security key"
              value={securityKey}
              onChange={(e) => setSecurityKey(e.target.value)}
              required
              className="border-gray-300"
            />
          </div>
          <Button
            type="submit"
            disabled={isAnalyzing || !url || !securityKey}
            className="w-full bg-[#0070E0] hover:bg-[#005BB5]"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Run QA Analysis"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
