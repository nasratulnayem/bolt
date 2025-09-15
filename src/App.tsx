import React, { useState } from 'react';
import { Upload, Download, CheckCircle, Globe, Zap } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [progressText, setProgressText] = useState('');

  const handleImport = async () => {
    if (!url.trim()) return;

    setIsImporting(true);
    setIsComplete(false);
    setProgress(0);

    const steps = [
      { progress: 15, text: 'Connecting to website...' },
      { progress: 35, text: 'Analyzing content structure...' },
      { progress: 55, text: 'Extracting posts and pages...' },
      { progress: 75, text: 'Processing media files...' },
      { progress: 90, text: 'Generating WordPress XML...' },
      { progress: 100, text: 'Import complete!' }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProgress(step.progress);
      setProgressText(step.text);
    }

    setIsImporting(false);
    setIsComplete(true);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent('<?xml version="1.0" encoding="UTF-8"?>\n<!-- WordPress Export for ' + url + ' -->'));
    element.setAttribute('download', 'wordpress-import.xml');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetTool = () => {
    setUrl('');
    setIsImporting(false);
    setProgress(0);
    setIsComplete(false);
    setProgressText('');
  };

  return (
    <div className="app-container-1 min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            WP<span className="text-blue-400">Cup</span>
          </h1>
          <p className="text-slate-400">WordPress Content Importer</p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-800 rounded-lg p-6 shadow-lg">
          
          {/* Input Section */}
          {!isImporting && !isComplete && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Website URL
                </label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="import-input-1 w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <button
                onClick={handleImport}
                disabled={!url.trim()}
                className="import-btn-1 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Start Import
              </button>
            </div>
          )}

          {/* Progress Section */}
          {isImporting && (
            <div className="progress-container-2 space-y-4">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-white mb-1">Processing Content</h3>
                <p className="text-sm text-slate-400">Please wait while we import your content</p>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="progress-bar-2 h-full bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <div className="flex justify-between items-center text-sm">
                  <span className="progress-text-2 text-slate-300">{progressText}</span>
                  <span className="text-blue-400 font-medium">{progress}%</span>
                </div>
              </div>
            </div>
          )}

          {/* Success Section */}
          {isComplete && (
            <div className="text-center space-y-4">
              <div className="success-msg-3 flex flex-col items-center space-y-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Import Complete</h3>
                  <p className="text-sm text-slate-400">Your WordPress import file is ready</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleDownload}
                  className="download-btn-3 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download WordPress XML
                </button>

                <button
                  onClick={resetTool}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm"
                >
                  Import Another Website
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-slate-500 text-xs">
          <p>Transform any website into WordPress content</p>
        </div>
      </div>
    </div>
  );
}

export default App;