import React from 'react';
import { Download, Sparkles, Ruler, Scale, BookOpen, Code2, Terminal, Award } from 'lucide-react';
import { downloadPythonScript, PYTHON_SCRIPTS } from '../utils/pythonScripts';

export type AppTab =
  | 'calculator'
  | 'scales'
  | 'units'
  | 'breakdown'
  | 'code'
  | 'terminal'
  | 'guide'
  | 'challenges';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const handleDownloadAll = () => {
    PYTHON_SCRIPTS.forEach((script, idx) => {
      setTimeout(() => {
        downloadPythonScript(script.filename, script.code);
      }, idx * 250);
    });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-pink-500/20 px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Brand */}
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
          <span className="bg-gradient-to-r from-pink-200 via-pink-400 to-rose-300 bg-clip-text text-transparent font-extrabold hidden sm:inline">
            Python Pink Calc
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4 md:gap-5 text-xs sm:text-sm font-medium overflow-x-auto py-1 max-w-2xl">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-lg transition-colors ${
              activeTab === 'calculator'
                ? 'bg-pink-600/30 text-pink-300 font-bold border border-pink-500/30'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            Calculadora
          </button>

          <button
            onClick={() => setActiveTab('scales')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === 'scales'
                ? 'bg-pink-600/30 text-pink-300 font-bold border border-pink-500/30'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            <Ruler className="w-3.5 h-3.5 text-pink-400" />
            <span>Escalas</span>
          </button>

          <button
            onClick={() => setActiveTab('units')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === 'units'
                ? 'bg-pink-600/30 text-pink-300 font-bold border border-pink-500/30'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-pink-400" />
            <span>Medidas</span>
          </button>

          <button
            onClick={() => setActiveTab('breakdown')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 ${
              activeTab === 'breakdown'
                ? 'bg-pink-600/30 text-pink-300 font-bold border border-pink-500/30'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-pink-400" />
            <span>Demonstração</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-lg transition-colors hidden lg:inline ${
              activeTab === 'code'
                ? 'bg-pink-600/30 text-pink-300 font-bold border border-pink-500/30'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            Código Python
          </button>

          <button
            onClick={() => setActiveTab('terminal')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-lg transition-colors hidden lg:inline ${
              activeTab === 'terminal'
                ? 'bg-pink-600/30 text-pink-300 font-bold border border-pink-500/30'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            Terminal
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-lg transition-colors hidden xl:inline ${
              activeTab === 'guide'
                ? 'bg-pink-600/30 text-pink-300 font-bold border border-pink-500/30'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            Guia
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-lg transition-colors hidden xl:inline ${
              activeTab === 'challenges'
                ? 'bg-pink-600/30 text-pink-300 font-bold border border-pink-500/30'
                : 'text-slate-300 hover:text-pink-300'
            }`}
          >
            Desafios
          </button>
        </nav>

        {/* Zone 3: Primary Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-white bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 rounded-lg hover:from-pink-500 hover:to-rose-400 shadow-md shadow-pink-600/25 active:scale-95 transition-all whitespace-nowrap"
            title="Baixar 5 scripts Python prontos"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Baixar Scripts .py (5)</span>
            <span className="sm:hidden">Scripts .py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
