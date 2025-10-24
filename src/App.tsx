import { useState } from "react";
import { QAInputForm } from "./components/QAInputForm";
import { QAResults } from "./components/QAResults";
import { analyzeWebpage } from "./components/qaUtils";
import { FileCheck, Square } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";

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

function App() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<QACategory[] | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState("");

  const handleAnalyze = async (url: string, securityKey: string) => {
    setIsAnalyzing(true);
    setResults(null);
    
    try {
      toast.info("Connecting to preview environment...");
      const analysisResults = await analyzeWebpage(url, securityKey);
      setResults(analysisResults);
      setAnalyzedUrl(url);
      toast.success("Analysis complete!");
    } catch (error) {
      toast.error("Failed to analyze page. Please check your URL and security key.");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setAnalyzedUrl("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Toaster />
      
      {/* Header */}
      <header className="bg-white border-b-2 border-[#0070E0] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#0070E0] p-3 rounded-lg">
              <FileCheck className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-[#484848]">Docusign Visual QA Tool</h1>
              <p className="text-gray-600">Brand compliance checker for preview environments</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {!results ? (
          <div className="max-w-2xl mx-auto">
            <QAInputForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            
            {/* Info Section */}
            <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-gray-800 mb-3">Visual QA Checklist</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <Square className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <span><strong>Brand Colors:</strong> Verifies Docusign color palette usage and contrast ratios</span>
                </li>
                <li className="flex items-start gap-2">
                  <Square className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <span><strong>Voice & Tone:</strong> Ensures professional, benefit-focused messaging</span>
                </li>
                <li className="flex items-start gap-2">
                  <Square className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <span><strong>Spacing & Layout:</strong> Checks module padding and grid alignment</span>
                </li>
                <li className="flex items-start gap-2">
                  <Square className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <span><strong>Copy Compliance:</strong> Validates sentence case, punctuation, and terminology</span>
                </li>
                <li className="flex items-start gap-2">
                  <Square className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <span><strong>Typography:</strong> Confirms font usage matches design system</span>
                </li>
                <li className="flex items-start gap-2">
                  <Square className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                  <span><strong>Imagery:</strong> Reviews image quality, alt text, and brand style</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <QAResults results={results} url={analyzedUrl} onReset={handleReset} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
          <p>Docusign Internal Tool • For use by Docusign team members only</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
