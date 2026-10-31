import React from 'react';
import { Download, Sparkles } from 'lucide-react';
import { downloadPythonScript, PYTHON_SCRIPTS } from '../utils/pythonScripts';

interface HeaderProps {
  activeTab: 'calculator' | 'code' | 'terminal' | 'guide' | 'challenges';
  setActiveTab: (tab: 'calculator' | 'code' | 'terminal' | 'guide' | 'challenges') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const handleDownloadAll = () => {
    // Download the modular and basic scripts
    PYTHON_SCRIPTS.forEach((script, idx) => {
      setTimeout(() => {
        downloadPythonScript(script.filename, script.code);
      }, idx * 250);
    });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-pink-500/20 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand single text element */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('calculator');
          }}
          className="text-lg font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap shrink-0 group"
        >
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-600 to-rose-400 text-white shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="bg-gradient-to-r from-pink-200 via-pink-400 to-rose-300 bg-clip-text text-transparent font-extrabold">
            Python Pink Calc
          </span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'calculator'
                ? 'text-pink-400 font-semibold'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            Calculadora
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'code'
                ? 'text-pink-400 font-semibold'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            Código Python
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'terminal'
                ? 'text-pink-400 font-semibold'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            Simulador Terminal
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'guide'
                ? 'text-pink-400 font-semibold'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            Explicações Didáticas
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'challenges'
                ? 'text-pink-400 font-semibold'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            Desafios Práticos
          </button>
        </nav>

        {/* Zone 3: 1 primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 rounded-lg hover:from-pink-500 hover:to-rose-400 shadow-md shadow-pink-600/25 active:scale-95 transition-all whitespace-nowrap shrink-0"
            title="Baixar arquivos .py para rodar no seu computador"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar Scripts .py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
