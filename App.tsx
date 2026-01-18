import React, { useState } from 'react';
import { analyzeFeature } from './services/geminiService';
import { AnalysisResponse, LoadingState } from './types';
import { RiskChart } from './components/RiskChart';
import { MarkdownViewer } from './components/MarkdownViewer';
import { 
  Activity, 
  FileSearch, 
  AlertTriangle, 
  Send, 
  Loader2,
  Trash2
} from 'lucide-react';

const EXAMPLE_FEATURE = "Remote volume control. Users can adjust hearing aid volume using a slider in the app. The volume setting is transmitted via Bluetooth to the hearing aids and saved locally on the phone for quick access.";

function App() {
  const [input, setInput] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [result, setResult] = useState<AnalysisResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setLoadingState(LoadingState.ANALYZING);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeFeature(input);
      setResult(data);
      setLoadingState(LoadingState.COMPLETE);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during analysis.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  const loadExample = () => {
    setInput(EXAMPLE_FEATURE);
  };

  const clearInput = () => {
    setInput('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Custom SVG Logo */}
            <div className="relative w-10 h-10 flex-shrink-0">
               <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
                  <defs>
                    <linearGradient id="blueGrad" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#3b82f6" />
                      <stop offset="1" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                  {/* Shield Background (Left/White) */}
                  <path d="M50 5L15 18V45C15 68 30 88 50 95C70 88 85 68 85 45V18L50 5Z" fill="white" stroke="#e2e8f0" strokeWidth="2"/>
                  {/* Shield Right Half (Blue) */}
                  <path d="M50 5V95C70 88 85 68 85 45V18L50 5Z" fill="url(#blueGrad)" />
                  {/* Medical Cross (Left) */}
                  <rect x="24" y="38" width="18" height="6" rx="1" fill="#3b82f6" />
                  <rect x="30" y="32" width="6" height="18" rx="1" fill="#3b82f6" />
                  {/* Radar Waves (Right) */}
                  <circle cx="50" cy="41" r="3" fill="white" />
                  <path d="M56 41C56 44.3137 53.3137 47 50 47" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  <path d="M62 41C62 47.6274 56.6274 53 50 53" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                  <path d="M68 41C68 50.9411 59.9411 59 50 59" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
                  {/* Digital Bits (Top Right) */}
                  <rect x="78" y="12" width="5" height="5" fill="#3b82f6" rx="1"/>
                  <rect x="85" y="20" width="3" height="3" fill="#3b82f6" rx="0.5" opacity="0.7"/>
               </svg>
            </div>
            
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                Threat<span className="text-blue-600">Scope</span>
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                 <div className="h-[1px] bg-slate-300 w-3"></div>
                 <p className="text-[10px] font-bold text-slate-500 tracking-[0.2em] uppercase leading-none">Medical</p>
                 <div className="h-[1px] bg-slate-300 w-3"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
             {/* Placeholder for right-side header items if needed */}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full gap-8 grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Input */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-indigo-600" />
                Feature Input
              </h2>
              <div className="flex items-center gap-2">
                {input && (
                  <button 
                    onClick={clearInput}
                    className="text-xs text-slate-500 hover:text-red-600 font-medium px-2 py-1 hover:bg-red-50 rounded flex items-center gap-1 transition-colors"
                    title="Clear text"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </button>
                )}
                <button 
                  onClick={loadExample}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 bg-indigo-50 rounded hover:bg-indigo-100 transition-colors"
                >
                  Load Example
                </button>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 mb-4">
              Describe a feature (user story, technical spec, or requirement) to identify cybersecurity threats and compliance needs.
            </p>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., The app allows users to update firmware OTA via Bluetooth..."
              className="w-full h-64 p-4 rounded-lg border border-slate-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none resize-none text-sm leading-relaxed text-slate-800 placeholder:text-slate-400"
            />

            <div className="mt-4">
              <button
                onClick={handleAnalyze}
                disabled={loadingState === LoadingState.ANALYZING || !input.trim()}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingState === LoadingState.ANALYZING ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing Threats...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Analyze Feature
                  </>
                )}
              </button>
              <p className="text-xs text-slate-400 text-center mt-3">
                * Limited to Class IIa medical devices - hearing aids and companion apps.
              </p>
            </div>
          </div>

          {/* Quick Stats / Info Panel */}
          <div className="bg-slate-100 rounded-xl p-6 border border-slate-200">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">Analysis Coverage</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                GDPR & Privacy
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                Bluetooth (BLE) Security
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                Patient Safety Risks
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                FDA & MDR Compliance
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="lg:col-span-8 space-y-6">
          
          {loadingState === LoadingState.IDLE && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 min-h-[400px] border-2 border-dashed border-slate-200 rounded-xl bg-slate-50/50">
              <Activity className="w-16 h-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">Ready to analyze</p>
              <p className="text-sm">Enter a feature description on the left to begin.</p>
            </div>
          )}

          {loadingState === LoadingState.ERROR && (
             <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
               <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-2" />
               <h3 className="text-lg font-semibold text-red-800">Analysis Failed</h3>
               <p className="text-red-600">{error}</p>
             </div>
          )}

          {result && loadingState === LoadingState.COMPLETE && (
            <>
               {/* Dashboard Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Summary Card */}
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">Threat Overview</h3>
                    <div className="text-3xl font-bold text-slate-900 mb-1">
                      {result.riskData.length}
                    </div>
                    <p className="text-sm text-slate-500">Potential risks identified across {result.riskData.reduce((acc, curr) => acc.add(curr.area), new Set()).size} domains.</p>
                    
                    <div className="mt-6 space-y-3">
                       {result.riskData.slice(0, 3).map((risk, idx) => (
                         <div key={idx} className="flex items-center justify-between text-sm p-2 bg-slate-50 rounded">
                            <span className="text-slate-700 truncate max-w-[60%]">{risk.area}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              risk.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                              risk.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                              risk.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-blue-100 text-blue-700'
                            }`}>
                              {risk.priority}
                            </span>
                         </div>
                       ))}
                       {result.riskData.length > 3 && (
                         <p className="text-xs text-center text-slate-400 mt-2">+ {result.riskData.length - 3} more risks</p>
                       )}
                    </div>
                 </div>

                 {/* Visualization Card */}
                 <RiskChart data={result.riskData} />
               </div>

               {/* Full Report */}
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 min-h-[500px]">
                 <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                   <h2 className="text-xl font-bold text-slate-800">Detailed Analysis Report</h2>
                   <span className="text-xs font-mono text-slate-400">Generated via Gemini</span>
                 </div>
                 <MarkdownViewer content={result.markdownReport} />
               </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;