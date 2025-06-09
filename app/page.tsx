"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Download, Loader2, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState("");
  const [theme, setTheme] = useState("default");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSlides, setGeneratedSlides] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const themes = [
    { id: "default", name: "Default", color: "bg-gray-100" },
    { id: "professional", name: "Professional", color: "bg-blue-100" },
    { id: "creative", name: "Creative", color: "bg-purple-100" },
    { id: "minimal", name: "Minimal", color: "bg-green-100" },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!file && !textContent.trim()) {
      setError("Please upload a file or enter some text content");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      }
      formData.append("textContent", textContent);
      formData.append("theme", theme);

      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate presentation");
      }

      const result = await response.json();
      setGeneratedSlides(result.slides);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedSlides) return;

    const blob = new Blob([generatedSlides], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "presentation.md";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFile(null);
    setTextContent("");
    setGeneratedSlides(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Slide it In
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your documents into beautiful presentations with AI
          </p>
        </motion.div>

        {!generatedSlides ? (
          <div className="max-w-4xl mx-auto">
            {/* File Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">Upload Your Content</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload File (PDF, TXT, MD)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors">
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <input
                      type="file"
                      accept=".pdf,.txt,.md"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-amber-600 hover:text-amber-700"
                    >
                      Click to upload or drag and drop
                    </label>
                    {file && (
                      <p className="mt-2 text-sm text-gray-600">
                        Selected: {file.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Text Input */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Or paste your content here
                  </label>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Paste your text content here..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Theme Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-6">Choose Theme</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "p-4 rounded-lg border-2 transition-all",
                      theme === t.id
                        ? "border-amber-500 bg-amber-50"
                        : "border-gray-200 hover:border-amber-300"
                    )}
                  >
                    <div className={cn("h-16 rounded mb-2", t.color)} />
                    <p className="font-medium">{t.name}</p>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Generate Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <button
                onClick={handleGenerate}
                disabled={isGenerating || (!file && !textContent.trim())}
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white rounded-lg font-semibold text-lg transition-colors flex items-center gap-2 mx-auto"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-5 w-5" />
                    Generate Presentation
                  </>
                )}
              </button>

              {error && (
                <p className="mt-4 text-red-600 bg-red-50 p-3 rounded-lg">
                  {error}
                </p>
              )}
            </motion.div>
          </div>
        ) : (
          /* Results Section */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Presentation</h2>
                <div className="flex gap-4">
                  <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
                  >
                    Create Another
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm">{generatedSlides}</pre>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>
                  💡 <strong>Tip:</strong> You can use this Markdown with tools like{" "}
                  <a
                    href="https://marp.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-600 hover:underline"
                  >
                    Marp
                  </a>{" "}
                  or convert it to PowerPoint using online converters.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}