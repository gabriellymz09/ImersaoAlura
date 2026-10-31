import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Play, Sparkles } from 'lucide-react';
import { PYTHON_SCRIPTS, downloadPythonScript } from '../utils/pythonScripts';
import { PythonTraceStep } from '../types/calculator';

interface PythonCodeViewerProps {
  activeTrace: PythonTraceStep | null;
  onRunInTerminal?: () => void;
}

export const PythonCodeViewer: React.FC<PythonCodeViewerProps> = ({
  activeTrace,
  onRunInTerminal,
}) => {
  const [selectedScriptId, setSelectedScriptId] = useState<string>('simples');
  const [copied, setCopied] = useState<boolean>(false);

  const currentScript =
    PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentScript.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadPythonScript(currentScript.filename, currentScript.code);
  };

  // Simple, robust syntax highlighter for Python
  const renderHighlightedLine = (line: string, index: number) => {
    const lineNumber = index + 1;
    const isHighlighted =
      activeTrace &&
      selectedScriptId === 'modular' &&
      activeTrace.lineNumbers.includes(lineNumber);

    // If whole line is a comment
    if (line.trim().startsWith('#')) {
      return (
        <span className="text-pink-300/60 italic font-mono">
          {line}
        </span>
      );
    }

    // Split words with regex
    const tokens = line.split(/([ \t\(\)\[\]\{\}:,=+\-*/'"])/);

    return (
      <span className="font-mono">
        {tokens.map((token, i) => {
          if (!token) return null;

          // Keywords
          const keywords = [
            'def',
            'return',
            'if',
            'elif',
            'else',
            'while',
            'for',
            'in',
            'import',
            'from',
            'class',
            'try',
            'except',
            'raise',
            'break',
            'continue',
            'as',
            'not',
            'and',
            'or',
            'True',
            'False',
            'None',
          ];
          const builtins = ['print', 'input', 'float', 'int', 'str', 'len', 'range', 'isinstance'];

          if (keywords.includes(token)) {
            return (
              <span key={i} className="text-pink-400 font-semibold">
                {token}
              </span>
            );
          }
          if (builtins.includes(token)) {
            return (
              <span key={i} className="text-rose-300 font-medium">
                {token}
              </span>
            );
          }
          if (/^".*"$/.test(token) || /^'.*'$/.test(token)) {
            return (
              <span key={i} className="text-amber-200">
                {token}
              </span>
            );
          }
          if (/^[0-9]+(\.[0-9]+)?$/.test(token)) {
            return (
              <span key={i} className="text-purple-300">
                {token}
              </span>
            );
          }
          if (['+', '-', '*', '/', '==', '!=', '>', '<', '<=', '>='].includes(token)) {
            return (
              <span key={i} className="text-pink-500 font-bold">
                {token}
              </span>
            );
          }

          return <span key={i}>{token}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="bg-slate-900/90 border border-pink-500/30 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl flex flex-col h-full">
      {/* Top Bar with Script Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b border-pink-500/20 bg-slate-950/70">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400">
            <FileCode className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <span>{currentScript.filename}</span>
              <span className="text-[11px] font-normal text-pink-300/80">
                · {currentScript.level}
              </span>
            </h2>
            <p className="text-xs text-slate-400 truncate max-w-md">
              {currentScript.description}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {onRunInTerminal && (
            <button
              onClick={onRunInTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-pink-900/40 hover:bg-pink-800/60 border border-pink-500/30 rounded-lg transition-colors"
              title="Testar este script no Simulador de Terminal"
            >
              <Play className="w-3.5 h-3.5 text-pink-400" />
              <span>Simular</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span>Copiar</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 rounded-lg shadow-sm shadow-pink-600/30 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Script Selector Tabs */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-950/40 border-b border-pink-500/10 overflow-x-auto text-xs">
        <span className="text-slate-400 font-medium mr-1 whitespace-nowrap">Escolha a versão:</span>
        {PYTHON_SCRIPTS.map((script) => (
          <button
            key={script.id}
            onClick={() => setSelectedScriptId(script.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedScriptId === script.id
                ? 'bg-gradient-to-r from-pink-600/40 to-rose-600/40 text-pink-200 border border-pink-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span>{script.filename}</span>
          </button>
        ))}
      </div>

      {/* Live Trace Banner (if a step was performed in calculator) */}
      {activeTrace && (
        <div className="mx-4 mt-3 p-3 rounded-xl bg-pink-950/60 border border-pink-500/40 text-xs flex items-start gap-3 animate-fadeIn">
          <div className="p-1 rounded-md bg-pink-500/20 text-pink-300 shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-pink-200 font-mono">
                Função executada: {activeTrace.functionName}()
              </span>
              <span className="font-mono text-pink-400 font-bold">
                Retorno: {String(activeTrace.returnValue)}
              </span>
            </div>
            <p className="text-pink-300/80">{activeTrace.explanation}</p>
          </div>
        </div>
      )}

      {/* Code Body with Line Numbers */}
      <div className="flex-1 overflow-auto p-4 bg-slate-950/80 font-mono text-xs leading-relaxed max-h-[560px]">
        <table className="w-full border-collapse">
          <tbody>
            {currentScript.code.split('\n').map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted =
                activeTrace &&
                selectedScriptId === 'modular' &&
                activeTrace.lineNumbers.includes(lineNum);

              return (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isHighlighted ? 'bg-pink-500/25 border-l-2 border-pink-400' : 'hover:bg-slate-900/60'
                  }`}
                >
                  <td className="w-10 pr-4 text-right text-slate-600 select-none font-mono text-[11px] align-top">
                    {lineNum}
                  </td>
                  <td className="text-slate-200 font-mono whitespace-pre select-text">
                    {renderHighlightedLine(line, idx)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
