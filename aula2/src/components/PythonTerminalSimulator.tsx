import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, Sparkles, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TerminalLine {
  id: string;
  type: 'system' | 'output' | 'input' | 'error' | 'success';
  text: string;
}

export const PythonTerminalSimulator: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'system',
      text: 'Python 3.12.0 (main, Oct 2026) [GCC 11.2.0] on linux',
    },
    {
      id: '2',
      type: 'system',
      text: 'Digite "ajuda" para ver instruções ou use os botões de teste rápido.',
    },
    {
      id: '3',
      type: 'output',
      text: '✨ Bem-vinda à Calculadora Python Pink! ✨',
    },
    {
      id: '4',
      type: 'output',
      text: '------------------------------------------',
    },
    {
      id: '5',
      type: 'output',
      text: 'Digite o primeiro número: ',
    },
  ]);

  const [step, setStep] = useState<'num1' | 'op' | 'num2' | 'finished'>('num1');
  const [num1, setNum1] = useState<string>('');
  const [operation, setOperation] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleReset = () => {
    setStep('num1');
    setNum1('');
    setOperation('');
    setInputValue('');
    setLines([
      {
        id: Math.random().toString(),
        type: 'system',
        text: 'Terminal reiniciado: python calculadora_basica.py',
      },
      {
        id: Math.random().toString(),
        type: 'output',
        text: '✨ Bem-vinda à Calculadora Python Pink! ✨',
      },
      {
        id: Math.random().toString(),
        type: 'output',
        text: '------------------------------------------',
      },
      {
        id: Math.random().toString(),
        type: 'output',
        text: 'Digite o primeiro número: ',
      },
    ]);
  };

  const submitInput = (valToSubmit?: string) => {
    const rawVal = valToSubmit !== undefined ? valToSubmit : inputValue;
    const trimmed = rawVal.trim();
    if (!trimmed) return;

    // Add user input line
    const userLine: TerminalLine = {
      id: Math.random().toString(),
      type: 'input',
      text: `> ${trimmed}`,
    };

    if (step === 'num1') {
      const parsed = parseFloat(trimmed);
      if (isNaN(parsed)) {
        setLines((prev) => [
          ...prev,
          userLine,
          {
            id: Math.random().toString(),
            type: 'error',
            text: '❌ Erro de Entrada: Digite um número válido (ex: 10 ou 5.5).',
          },
          {
            id: Math.random().toString(),
            type: 'output',
            text: 'Digite o primeiro número: ',
          },
        ]);
        setInputValue('');
        return;
      }
      setNum1(trimmed);
      setStep('op');
      setLines((prev) => [
        ...prev,
        userLine,
        {
          id: Math.random().toString(),
          type: 'output',
          text: 'Escolha a operação (+, -, *, /): ',
        },
      ]);
      setInputValue('');
    } else if (step === 'op') {
      if (!['+', '-', '*', '/'].includes(trimmed)) {
        setLines((prev) => [
          ...prev,
          userLine,
          {
            id: Math.random().toString(),
            type: 'error',
            text: '❌ Operação inválida! Digite apenas +, -, * ou /.',
          },
          {
            id: Math.random().toString(),
            type: 'output',
            text: 'Escolha a operação (+, -, *, /): ',
          },
        ]);
        setInputValue('');
        return;
      }
      setOperation(trimmed);
      setStep('num2');
      setLines((prev) => [
        ...prev,
        userLine,
        {
          id: Math.random().toString(),
          type: 'output',
          text: 'Digite o segundo número: ',
        },
      ]);
      setInputValue('');
    } else if (step === 'num2') {
      const parsed2 = parseFloat(trimmed);
      if (isNaN(parsed2)) {
        setLines((prev) => [
          ...prev,
          userLine,
          {
            id: Math.random().toString(),
            type: 'error',
            text: '❌ Erro de Entrada: Digite um número válido.',
          },
          {
            id: Math.random().toString(),
            type: 'output',
            text: 'Digite o segundo número: ',
          },
        ]);
        setInputValue('');
        return;
      }

      const n1 = parseFloat(num1);
      const n2 = parsed2;

      // Division by zero check
      if (operation === '/' && n2 === 0) {
        setLines((prev) => [
          ...prev,
          userLine,
          {
            id: Math.random().toString(),
            type: 'error',
            text: '⚠️ ZeroDivisionError: Não é possível dividir por zero em Python!',
          },
          {
            id: Math.random().toString(),
            type: 'output',
            text: '------------------------------------------',
          },
          {
            id: Math.random().toString(),
            type: 'system',
            text: 'Cálculo finalizado. Clique em "Reiniciar" ou escolha um exemplo rápido para testar novamente.',
          },
        ]);
        setStep('finished');
        setInputValue('');
        return;
      }

      let res = 0;
      if (operation === '+') res = n1 + n2;
      else if (operation === '-') res = n1 - n2;
      else if (operation === '*') res = n1 * n2;
      else if (operation === '/') res = n1 / n2;

      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#f472b6', '#ec4899', '#f43f5e', '#ffffff'],
        });
      } catch {
        // Safe fallback
      }

      setLines((prev) => [
        ...prev,
        userLine,
        {
          id: Math.random().toString(),
          type: 'output',
          text: '------------------------------------------',
        },
        {
          id: Math.random().toString(),
          type: 'success',
          text: `💖 Resultado: ${n1} ${operation} ${n2} = ${res}`,
        },
        {
          id: Math.random().toString(),
          type: 'output',
          text: '------------------------------------------',
        },
        {
          id: Math.random().toString(),
          type: 'system',
          text: '✨ Programa concluído com sucesso! (Código de saída: 0)',
        },
      ]);
      setStep('finished');
      setInputValue('');
    } else if (step === 'finished') {
      handleReset();
    }
  };

  const runQuickExample = (n1: string, op: string, n2: string) => {
    handleReset();
    setTimeout(() => {
      setNum1(n1);
      setOperation(op);

      const parsed1 = parseFloat(n1);
      const parsed2 = parseFloat(n2);

      let res: number | string = 0;
      let isZeroError = false;

      if (op === '+') res = parsed1 + parsed2;
      else if (op === '-') res = parsed1 - parsed2;
      else if (op === '*') res = parsed1 * parsed2;
      else if (op === '/') {
        if (parsed2 === 0) {
          isZeroError = true;
        } else {
          res = parsed1 / parsed2;
        }
      }

      const generatedLines: TerminalLine[] = [
        {
          id: Math.random().toString(),
          type: 'system',
          text: `python calculadora_basica.py [Executando teste: ${n1} ${op} ${n2}]`,
        },
        {
          id: Math.random().toString(),
          type: 'output',
          text: '✨ Bem-vinda à Calculadora Python Pink! ✨',
        },
        {
          id: Math.random().toString(),
          type: 'output',
          text: 'Digite o primeiro número: ',
        },
        {
          id: Math.random().toString(),
          type: 'input',
          text: `> ${n1}`,
        },
        {
          id: Math.random().toString(),
          type: 'output',
          text: 'Escolha a operação (+, -, *, /): ',
        },
        {
          id: Math.random().toString(),
          type: 'input',
          text: `> ${op}`,
        },
        {
          id: Math.random().toString(),
          type: 'output',
          text: 'Digite o segundo número: ',
        },
        {
          id: Math.random().toString(),
          type: 'input',
          text: `> ${n2}`,
        },
        {
          id: Math.random().toString(),
          type: 'output',
          text: '------------------------------------------',
        },
      ];

      if (isZeroError) {
        generatedLines.push({
          id: Math.random().toString(),
          type: 'error',
          text: '⚠️ ZeroDivisionError: Não é possível dividir por zero!',
        });
      } else {
        generatedLines.push({
          id: Math.random().toString(),
          type: 'success',
          text: `💖 Resultado: ${n1} ${op} ${n2} = ${res}`,
        });
      }

      generatedLines.push({
        id: Math.random().toString(),
        type: 'system',
        text: '✨ Programa finalizado.',
      });

      setLines(generatedLines);
      setStep('finished');
    }, 150);
  };

  const runScientificExample = (title: string, cmd: string, outputText: string) => {
    handleReset();
    setTimeout(() => {
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#f472b6', '#ec4899', '#f43f5e', '#ffffff'],
        });
      } catch {
        // Safe fallback
      }

      setLines([
        {
          id: Math.random().toString(),
          type: 'system',
          text: `python calculadora_cientifica.py [Executando teste: ${title}]`,
        },
        {
          id: Math.random().toString(),
          type: 'output',
          text: '🌸 CALCULADORA CIENTÍFICA PYTHON PINK (import math) 🌸',
        },
        {
          id: Math.random().toString(),
          type: 'output',
          text: '------------------------------------------',
        },
        {
          id: Math.random().toString(),
          type: 'input',
          text: `>>> import math\n>>> ${cmd}`,
        },
        {
          id: Math.random().toString(),
          type: 'success',
          text: `💖 ${outputText}`,
        },
        {
          id: Math.random().toString(),
          type: 'output',
          text: '------------------------------------------',
        },
        {
          id: Math.random().toString(),
          type: 'system',
          text: '✨ Função científica executada com sucesso!',
        },
      ]);
      setStep('finished');
    }, 150);
  };

  return (
    <div className="bg-slate-900/90 border border-pink-500/30 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl flex flex-col h-full">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-pink-500/20">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-xs text-pink-300 font-medium flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-pink-400" />
            simulador_terminal_python.py
          </span>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          title="Reiniciar simulador"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Quick Test Bar */}
      <div className="px-4 py-2.5 bg-slate-950/40 border-b border-pink-500/10 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-400 font-medium whitespace-nowrap">Exemplos Rápidos:</span>
        <button
          onClick={() => runScientificExample('Seno de 30°', 'math.sin(math.radians(30))', 'sen(30°) = 0.5')}
          className="px-2.5 py-1 rounded bg-pink-900/40 hover:bg-pink-800/60 border border-pink-500/30 text-pink-200 whitespace-nowrap font-medium"
        >
          sen(30°) = 0.5
        </button>
        <button
          onClick={() => runScientificExample('Cosseno de 60°', 'math.cos(math.radians(60))', 'cos(60°) = 0.5')}
          className="px-2.5 py-1 rounded bg-pink-900/40 hover:bg-pink-800/60 border border-pink-500/30 text-pink-200 whitespace-nowrap font-medium"
        >
          cos(60°) = 0.5
        </button>
        <button
          onClick={() => runScientificExample('Logaritmo Base 10', 'math.log10(100)', 'log10(100) = 2.0')}
          className="px-2.5 py-1 rounded bg-pink-900/40 hover:bg-pink-800/60 border border-pink-500/30 text-pink-200 whitespace-nowrap font-medium"
        >
          log₁₀(100) = 2
        </button>
        <button
          onClick={() => runScientificExample('Raiz Quadrada', 'math.sqrt(144)', '√(144) = 12.0')}
          className="px-2.5 py-1 rounded bg-pink-900/40 hover:bg-pink-800/60 border border-pink-500/30 text-pink-200 whitespace-nowrap font-medium"
        >
          √(144) = 12
        </button>
        <button
          onClick={() => runQuickExample('25', '+', '75')}
          className="px-2.5 py-1 rounded bg-pink-950/50 hover:bg-pink-900/60 border border-pink-500/20 text-pink-200 whitespace-nowrap"
        >
          Soma (25 + 75)
        </button>
        <button
          onClick={() => runQuickExample('50', '/', '0')}
          className="px-2.5 py-1 rounded bg-rose-950/50 hover:bg-rose-900/60 border border-rose-500/30 text-rose-300 whitespace-nowrap"
          title="Ver o comportamento da divisão por zero no Python"
        >
          Divisão por Zero ⚠️
        </button>
      </div>

      {/* Console Output Screen */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1.5 min-h-[320px] max-h-[460px] bg-slate-950/90 select-text">
        {lines.map((line) => (
          <div key={line.id} className="leading-relaxed">
            {line.type === 'system' && (
              <span className="text-slate-500 italic">{line.text}</span>
            )}
            {line.type === 'output' && (
              <span className="text-pink-100">{line.text}</span>
            )}
            {line.type === 'input' && (
              <span className="text-pink-400 font-semibold">{line.text}</span>
            )}
            {line.type === 'error' && (
              <span className="text-rose-400 font-semibold bg-rose-950/30 px-1 py-0.5 rounded">
                {line.text}
              </span>
            )}
            {line.type === 'success' && (
              <span className="text-emerald-300 font-bold bg-emerald-950/30 px-1.5 py-0.5 rounded">
                {line.text}
              </span>
            )}
          </div>
        ))}
        <div ref={terminalBottomRef} />
      </div>

      {/* Terminal Input Prompt */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitInput();
        }}
        className="p-3 bg-slate-950 border-t border-pink-500/20 flex items-center gap-2"
      >
        <span className="font-mono text-pink-400 text-sm font-bold pl-2 select-none">
          {step === 'finished' ? '↺' : '>'}
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={
            step === 'num1'
              ? 'Digite o 1º número e pressione Enter...'
              : step === 'op'
              ? 'Digite a operação (+, -, *, /) e pressione Enter...'
              : step === 'num2'
              ? 'Digite o 2º número e pressione Enter...'
              : 'Pressione Enter para iniciar novo cálculo...'
          }
          className="flex-1 bg-transparent border-none outline-none font-mono text-xs text-white placeholder-slate-500"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-medium text-xs flex items-center gap-1 shadow-sm transition-colors"
        >
          <span>{step === 'finished' ? 'Novo' : 'Enviar'}</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
