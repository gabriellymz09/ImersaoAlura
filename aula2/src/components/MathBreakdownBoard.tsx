import React, { useState } from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  CheckCircle2,
  Code2,
  Copy,
  Check,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Layers,
  ArrowRight,
  Calculator,
  RotateCcw,
} from "lucide-react";
import { MathBreakdownData, Operation, PinkTheme } from "../types/calculator";
import { generateBreakdownForOperation } from "../utils/mathBreakdown";
import { playKeySound } from "../utils/audio";

interface MathBreakdownBoardProps {
  theme?: PinkTheme;
  initialData?: MathBreakdownData | null;
  onSendToCalculator?: (val: string) => void;
}

export const MathBreakdownBoard: React.FC<MathBreakdownBoardProps> = ({
  theme = "rose-gold",
  initialData,
  onSendToCalculator,
}) => {
  // Custom calculator solver on the board
  const [num1Input, setNum1Input] = useState<string>("125");
  const [opInput, setOpInput] = useState<Operation>("*");
  const [num2Input, setNum2Input] = useState<string>("24");

  const [activeBoardTab, setActiveBoardTab] = useState<
    "lousa" | "passos" | "python" | "propriedades"
  >("lousa");
  const [copied, setCopied] = useState<boolean>(false);

  // If initialData provided and not overridden by user inputs
  const [customData, setCustomData] = useState<MathBreakdownData | null>(
    initialData || null,
  );

  const currentBreakdown: MathBreakdownData = React.useMemo(() => {
    if (customData) return customData;
    const n1 = parseFloat(num1Input) || 0;
    const n2 = parseFloat(num2Input) || 0;
    return generateBreakdownForOperation(opInput, n1, n2);
  }, [customData, num1Input, opInput, num2Input]);

  const handleCalculateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    playKeySound("equals", true);
    const n1 = parseFloat(num1Input) || 0;
    const n2 = parseFloat(num2Input) || 0;
    setCustomData(generateBreakdownForOperation(opInput, n1, n2));
  };

  const handleResetToInputs = () => {
    setCustomData(null);
  };

  const handleCopyFullBreakdown = () => {
    const text = `📝 DEMONSTRAÇÃO DE CONTA: ${currentBreakdown.title}
Expressão: ${currentBreakdown.expression} = ${currentBreakdown.result}
Método: ${currentBreakdown.methodName}

PASSO A PASSO DIDÁTICO:
${currentBreakdown.steps
  .map(
    (s) =>
      `${s.stepNumber}. ${s.title}\n   ${s.description}\n   Expressão: ${s.expression}`,
  )
  .join("\n\n")}

CÓDIGO PYTHON:
${currentBreakdown.pythonCode}

PROPRIEDADES MATEMÁTICAS:
${currentBreakdown.mathematicalProperties.map((p) => `• ${p}`).join("\n")}
`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/60 via-slate-900/90 to-rose-950/60 border border-pink-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-pink-500/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Lousa de Demonstração de Contas Passo a Passo
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold border border-pink-500/30">
                Didático
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Veja a decomposição aritmética completa, o algoritmo de colunas,
              propriedades e código Python.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyFullBreakdown}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-pink-500/30 text-xs font-semibold text-pink-200 hover:text-white hover:bg-slate-800 transition-all shrink-0"
        >
          {copied ? (
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-pink-400" />
          )}
          <span>
            {copied ? "Demonstração Copiada!" : "Copiar Tudo (Texto/Markdown)"}
          </span>
        </button>
      </div>

      {/* Solver Toolbar: Try any custom operation */}
      <form
        onSubmit={handleCalculateCustom}
        className="p-3.5 rounded-2xl bg-slate-900/80 border border-pink-500/20 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-pink-400 uppercase tracking-wider flex items-center gap-1">
            <Calculator className="w-3.5 h-3.5" /> Demonstrar Outra Conta:
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="number"
            step="any"
            value={num1Input}
            onChange={(e) => {
              setNum1Input(e.target.value);
              setCustomData(null);
            }}
            placeholder="Ex: 125"
            className="w-24 px-3 py-1.5 rounded-xl bg-slate-950 border border-pink-500/30 text-xs font-mono font-bold text-white focus:outline-none focus:ring-1 focus:ring-pink-500"
          />

          <select
            value={opInput || "+"}
            onChange={(e) => {
              setOpInput(e.target.value as Operation);
              setCustomData(null);
            }}
            className="px-2 py-1.5 rounded-xl bg-slate-950 border border-pink-500/30 text-xs font-mono font-bold text-pink-300 focus:outline-none"
          >
            <option value="+">Somar (+)</option>
            <option value="-">Subtrair (-)</option>
            <option value="*">Multiplicar (×)</option>
            <option value="/">Dividir (÷)</option>
            <option value="^">Potência (^)</option>
          </select>

          <input
            type="number"
            step="any"
            value={num2Input}
            onChange={(e) => {
              setNum2Input(e.target.value);
              setCustomData(null);
            }}
            placeholder="Ex: 24"
            className="w-24 px-3 py-1.5 rounded-xl bg-slate-950 border border-pink-500/30 text-xs font-mono font-bold text-white focus:outline-none focus:ring-1 focus:ring-pink-500"
          />

          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-xs font-bold text-white shadow-sm transition-all active:scale-95"
          >
            Demonstrar Passo a Passo
          </button>
        </div>
      </form>

      {/* Main Board Container */}
      <div className="rounded-3xl bg-slate-900/90 border border-pink-500/30 overflow-hidden shadow-2xl">
        {/* Navigation Tabs on Board */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/80 border-b border-pink-500/20 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveBoardTab("lousa")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeBoardTab === "lousa"
                ? "bg-pink-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Lousa Escolar & Algoritmo</span>
          </button>

          <button
            onClick={() => setActiveBoardTab("passos")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeBoardTab === "passos"
                ? "bg-pink-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Etapas Numeradas ({currentBreakdown.steps.length})</span>
          </button>

          <button
            onClick={() => setActiveBoardTab("python")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeBoardTab === "python"
                ? "bg-pink-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Código Python Explicado</span>
          </button>

          <button
            onClick={() => setActiveBoardTab("propriedades")}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              activeBoardTab === "propriedades"
                ? "bg-pink-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Propriedades & Teoria</span>
          </button>
        </div>

        {/* Tab 1: Visual Chalkboard (Lousa) */}
        {activeBoardTab === "lousa" && (
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-pink-500/20">
              <div>
                <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider block">
                  {currentBreakdown.methodName}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {currentBreakdown.title}
                </h3>
              </div>

              <div className="p-3 rounded-2xl bg-black/50 border border-pink-500/30 text-right">
                <span className="text-[10px] text-pink-300/80 block uppercase font-mono">
                  Resultado
                </span>
                <span className="font-mono text-2xl font-black text-pink-300">
                  {currentBreakdown.result}
                </span>
              </div>
            </div>

            {/* Visual Board Display (Card alinhado como caderno de matemática) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Blackboard Column (7 cols) */}
              <div className="md:col-span-7 rounded-2xl bg-[#120716] border-2 border-pink-500/40 p-6 font-mono text-pink-100 shadow-[inset_0_0_20px_rgba(236,72,153,0.15)] space-y-4">
                <div className="flex items-center justify-between text-xs text-pink-400/80 pb-2 border-b border-pink-500/20">
                  <span>LOUSA DIGITAL DIDÁTICA</span>
                  <span>{currentBreakdown.expression}</span>
                </div>

                {currentBreakdown.visualBoard ? (
                  <div className="py-4 space-y-1 text-xl sm:text-2xl font-bold tracking-wider leading-relaxed">
                    {currentBreakdown.visualBoard.rows.map((row, idx) => (
                      <div
                        key={idx}
                        className={
                          idx === currentBreakdown.visualBoard?.rows.length! - 1
                            ? "text-pink-300 font-extrabold text-2xl sm:text-3xl pt-1"
                            : ""
                        }
                      >
                        {row}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-6 text-center text-xl font-bold text-pink-300">
                    {currentBreakdown.expression} = {currentBreakdown.result}
                  </div>
                )}

                {currentBreakdown.visualBoard?.notes && (
                  <div className="pt-3 border-t border-pink-500/20 text-xs text-pink-300/80 space-y-1">
                    {currentBreakdown.visualBoard.notes.map((note, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                        <span>{note}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Summary Explanations (5 cols) */}
              <div className="md:col-span-5 space-y-3">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-pink-500/20 space-y-2">
                  <span className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Por que
                    funciona assim?
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Cada algarismo num número posicional tem um peso baseado na
                    sua ordem decimal (unidades = 1, dezenas = 10, centenas =
                    100). O algoritmo decompõe a conta em etapas locais fáceis
                    de calcular.
                  </p>
                </div>

                {currentBreakdown.realWorldCuriosity && (
                  <div className="p-4 rounded-2xl bg-pink-950/30 border border-pink-500/20 space-y-2">
                    <span className="text-xs font-bold text-pink-300 flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-pink-400" />{" "}
                      Curiosidade Histórica & Computacional
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {currentBreakdown.realWorldCuriosity}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Numbered Step-by-Step */}
        {activeBoardTab === "passos" && (
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-wider mb-2">
              Passo a Passo Detalhado da Operação ({currentBreakdown.expression}
              )
            </h3>

            <div className="space-y-3">
              {currentBreakdown.steps.map((st) => (
                <div
                  key={st.stepNumber}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-pink-500/25 flex items-start gap-4 hover:border-pink-500/40 transition-colors"
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-sm">
                    {st.stepNumber}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <h4 className="text-sm font-bold text-white flex items-center justify-between">
                      <span>{st.title}</span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-pink-500/20 text-pink-300">
                        {st.expression}
                      </span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Python Code Equivalents */}
        {activeBoardTab === "python" && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-pink-300 uppercase tracking-wider">
                  Como resolver essa conta em Python
                </h3>
                <p className="text-xs text-slate-400">
                  Código limpo, didático e pronto para você copiar e executar
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentBreakdown.pythonCode);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-pink-200 hover:text-white"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-pink-400" />
                )}
                <span>{copied ? "Copiado!" : "Copiar Código"}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-slate-950 border border-pink-500/30 text-xs font-mono text-pink-100 overflow-x-auto leading-relaxed shadow-inner">
              <code>{currentBreakdown.pythonCode}</code>
            </pre>
          </div>
        )}

        {/* Tab 4: Mathematical Properties */}
        {activeBoardTab === "propriedades" && (
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-pink-300 uppercase tracking-wider">
              Propriedades Matemáticas Relevantes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentBreakdown.mathematicalProperties.map((prop, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-pink-500/20 text-xs text-slate-300 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{prop}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
