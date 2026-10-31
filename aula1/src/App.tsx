/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { PinkCalculator } from './components/PinkCalculator';
import { PythonCodeViewer } from './components/PythonCodeViewer';
import { PythonTerminalSimulator } from './components/PythonTerminalSimulator';
import { EducationalGuide } from './components/EducationalGuide';
import { BeginnerChallenges } from './components/BeginnerChallenges';
import { PinkTheme, PythonTraceStep } from './types/calculator';
import {
  Code2,
  Terminal,
  BookOpen,
  Award,
  Sparkles,
  Download,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  Laptop
} from 'lucide-react';
import { PYTHON_SCRIPTS, downloadPythonScript } from './utils/pythonScripts';

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'calculator' | 'code' | 'terminal' | 'guide' | 'challenges'
  >('calculator');
  const [theme, setTheme] = useState<PinkTheme>('rose-gold');
  const [activeTrace, setActiveTrace] = useState<PythonTraceStep | null>(null);

  const handleTraceUpdate = (step: PythonTraceStep) => {
    setActiveTrace(step);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white relative overflow-x-hidden">
      {/* Background aesthetic gradients */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl transform -translate-y-1/2" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/15 via-slate-950/40 to-slate-950" />
      </div>

      {/* Top Bar Navigation */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-pink-500/15 pb-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-medium text-pink-400">
              <span>Python para Iniciantes</span>
              <span aria-hidden="true">·</span>
              <span>Quatro Operações Básicas</span>
              <span aria-hidden="true">·</span>
              <span>Aesthetic Pink Modern Design</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white text-balance">
              Calculadora Python{' '}
              <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500 bg-clip-text text-transparent">
                Pink Edition
              </span>
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed text-pretty">
              Aprenda a programar sua primeira calculadora em Python com código limpo, visual moderno em tons de rosa, explicações didáticas de cada linha e simulador interativo em tempo real.
            </p>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('code')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-pink-500/20 rounded-lg transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-pink-400" />
              <span>Ver Código Fonte</span>
            </button>
            <button
              onClick={() => setActiveTab('terminal')}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-pink-500/20 rounded-lg transition-colors"
            >
              <Terminal className="w-3.5 h-3.5 text-pink-400" />
              <span>Simulador</span>
            </button>
          </div>
        </div>

        {/* 2-Column Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Pink Calculator (5 Cols on Desktop) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Calculadora Interativa
              </span>
              <span className="text-[11px] text-slate-400">
                Suporta teclado (0-9, +, -, *, /, =)
              </span>
            </div>

            <PinkCalculator
              theme={theme}
              setTheme={setTheme}
              onTraceUpdate={handleTraceUpdate}
              onViewCodeClick={() => setActiveTab('code')}
            />

            {/* Quick summary below calculator */}
            <div className="w-full max-w-sm mt-4 p-3.5 rounded-2xl bg-slate-900/60 border border-pink-500/20 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center justify-between font-semibold text-pink-300">
                <span className="flex items-center gap-1">
                  <Laptop className="w-3.5 h-3.5 text-pink-400" /> Quer rodar no seu computador?
                </span>
                <button
                  onClick={() => setActiveTab('guide')}
                  className="text-pink-400 hover:text-pink-200 underline text-[11px]"
                >
                  Ver tutorial
                </button>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Você pode baixar o arquivo <code className="text-pink-300">calculadora_rosa_gui.py</code> e ter este mesmo aplicativo rosa rodando na sua área de trabalho!
              </p>
            </div>
          </div>

          {/* Right Column: Tabbed Educational Suite (7 Cols on Desktop) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-900/80 border border-pink-500/20 rounded-xl overflow-x-auto">
              <button
                onClick={() => setActiveTab('code')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'code' || activeTab === 'calculator'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Código Python & Trace</span>
              </button>

              <button
                onClick={() => setActiveTab('terminal')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'terminal'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Terminal className="w-4 h-4" />
                <span>Simulador Terminal</span>
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'guide'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Explicações Didáticas</span>
              </button>

              <button
                onClick={() => setActiveTab('challenges')}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === 'challenges'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Desafios Práticos</span>
              </button>
            </div>

            {/* Active Tab Content Area */}
            <div className="w-full">
              {(activeTab === 'code' || activeTab === 'calculator') && (
                <PythonCodeViewer
                  activeTrace={activeTrace}
                  onRunInTerminal={() => setActiveTab('terminal')}
                />
              )}

              {activeTab === 'terminal' && <PythonTerminalSimulator />}

              {activeTab === 'guide' && <EducationalGuide />}

              {activeTab === 'challenges' && <BeginnerChallenges />}
            </div>
          </div>
        </div>

        {/* 4 Basic Operations Concept Strip */}
        <div className="pt-6 border-t border-pink-500/15">
          <div className="mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-pink-400">
              As 4 Operações Matemáticas no Python
            </h2>
            <p className="text-xs text-slate-400">
              Como cada operação é declarada e calculada na sintaxe oficial da linguagem
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Op 1: Soma */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-pink-500/20 hover:border-pink-500/40 transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-300">1. Soma (+)</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-semibold">
                  num1 + num2
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Adiciona dois valores decimais ou inteiros.
              </p>
              <div className="font-mono text-[11px] text-pink-200 bg-slate-950/80 p-2 rounded border border-pink-500/10">
                def somar(a, b):<br />
                &nbsp;&nbsp;return a + b
              </div>
            </div>

            {/* Op 2: Subtração */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-pink-500/20 hover:border-pink-500/40 transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-300">2. Subtração (-)</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-semibold">
                  num1 - num2
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Diminui o segundo operando do primeiro.
              </p>
              <div className="font-mono text-[11px] text-pink-200 bg-slate-950/80 p-2 rounded border border-pink-500/10">
                def subtrair(a, b):<br />
                &nbsp;&nbsp;return a - b
              </div>
            </div>

            {/* Op 3: Multiplicação */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-pink-500/20 hover:border-pink-500/40 transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-300">3. Multiplicação (*)</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-semibold">
                  num1 * num2
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calcula o produto usando o asterisco (*).
              </p>
              <div className="font-mono text-[11px] text-pink-200 bg-slate-950/80 p-2 rounded border border-pink-500/10">
                def multiplicar(a, b):<br />
                &nbsp;&nbsp;return a * b
              </div>
            </div>

            {/* Op 4: Divisão */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-pink-500/20 hover:border-pink-500/40 transition-colors space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-300">4. Divisão (/)</span>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-semibold">
                  num1 / num2
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Divide e checa proteção contra divisor zero (0).
              </p>
              <div className="font-mono text-[11px] text-pink-200 bg-slate-950/80 p-2 rounded border border-pink-500/10">
                def dividir(a, b):<br />
                &nbsp;&nbsp;if b == 0: raise ...<br />
                &nbsp;&nbsp;return a / b
              </div>
            </div>
          </div>

          {/* Scientific Operations Extension Strip */}
          <div className="mt-4 pt-4 border-t border-pink-500/10">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                Funções Científicas Avançadas (Módulo math)
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-pink-500/15 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-pink-300">
                  <span>Seno (sen)</span>
                  <span className="font-mono text-[11px] text-pink-400">math.sin(rad)</span>
                </div>
                <p className="text-[11px] text-slate-400">Recebe radianos: use math.radians(graus) para converter.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-pink-500/15 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-pink-300">
                  <span>Cosseno (cos)</span>
                  <span className="font-mono text-[11px] text-pink-400">math.cos(rad)</span>
                </div>
                <p className="text-[11px] text-slate-400">Retorna a projeção horizontal no círculo trigonométrico.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-pink-500/15 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-pink-300">
                  <span>Logaritmos (ln / log₁₀)</span>
                  <span className="font-mono text-[11px] text-pink-400">math.log(x)</span>
                </div>
                <p className="text-[11px] text-slate-400">math.log para natural (ln) e math.log10 para base 10 (x &gt; 0).</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/40 border border-pink-500/15 text-xs space-y-1.5">
                <div className="flex items-center justify-between font-bold text-pink-300">
                  <span>Raiz Quadrada (√)</span>
                  <span className="font-mono text-[11px] text-pink-400">math.sqrt(x)</span>
                </div>
                <p className="text-[11px] text-slate-400">Calcula a raiz quadrada real de números não-negativos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Python Scripts Quick Download Banner */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-pink-950/50 via-slate-900/80 to-rose-950/50 border border-pink-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-base font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              Pronta para praticar no seu editor preferido?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Você pode baixar os 4 arquivos Python completos (Terminal Básico, Modular com Funções, Científica com math e Desktop Tkinter Rosa) prontos para rodar no VS Code, PyCharm ou IDLE.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {PYTHON_SCRIPTS.map((script) => (
              <button
                key={script.id}
                onClick={() => downloadPythonScript(script.filename, script.code)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-pink-500/30 rounded-lg transition-all active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-pink-400" />
                <span>{script.filename}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-pink-500/15 py-6 px-4 sm:px-6 lg:px-8 bg-slate-950/90 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-pink-300/80">
            <span>Calculadora Python Pink Edition</span>
            <span aria-hidden="true">·</span>
            <span>Aprenda programação com design e elegância</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://docs.python.org/pt-br/3/tutorial/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-300 transition-colors flex items-center gap-1"
            >
              <span>Documentação Oficial Python</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
