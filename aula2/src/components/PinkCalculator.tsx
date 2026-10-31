import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  History,
  Copy,
  Check,
  Delete,
  Sparkles,
  Code2,
  Atom,
  Binary,
  Ruler,
  Scale,
  BookOpen
} from 'lucide-react';
import {
  Operation,
  CalculationHistoryItem,
  PinkTheme,
  PythonTraceStep,
  CalculatorMode,
  AngleUnit,
  ScientificFunction,
  MathBreakdownData
} from '../types/calculator';
import { playKeySound } from '../utils/audio';
import { generateBreakdownForOperation, generateBreakdownForScientific } from '../utils/mathBreakdown';

interface PinkCalculatorProps {
  theme: PinkTheme;
  setTheme: (theme: PinkTheme) => void;
  onTraceUpdate?: (step: PythonTraceStep) => void;
  onViewCodeClick?: () => void;
  onOpenBreakdown?: (data: MathBreakdownData) => void;
  onNavigateTab?: (tab: 'calculator' | 'code' | 'terminal' | 'guide' | 'challenges' | 'scales' | 'units' | 'breakdown') => void;
  externalValue?: string | null;
}

export const PinkCalculator: React.FC<PinkCalculatorProps> = ({
  theme,
  setTheme,
  onTraceUpdate,
  onViewCodeClick,
  onOpenBreakdown,
  onNavigateTab,
  externalValue,
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [currentOperation, setCurrentOperation] = useState<Operation>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);
  const [expression, setExpression] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [lastCalculation, setLastCalculation] = useState<string | null>(null);
  const [lastBreakdown, setLastBreakdown] = useState<MathBreakdownData | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  // Sync external incoming values (e.g. from Scales Studio or Unit Converter)
  useEffect(() => {
    if (externalValue !== undefined && externalValue !== null) {
      setDisplayValue(externalValue);
      setWaitingForSecondOperand(true);
    }
  }, [externalValue]);

  // Scientific Mode States
  const [mode, setMode] = useState<CalculatorMode>('scientific');
  const [angleUnit, setAngleUnit] = useState<AngleUnit>('DEG');

  // Safe numerical formatter
  const formatNumber = (num: number): string => {
    if (isNaN(num)) return 'Erro';
    if (!isFinite(num)) return 'Infinito';
    if (Number.isInteger(num)) {
      return num.toLocaleString('pt-BR');
    }
    // Limit decimals to 8 to avoid floating point precision artifacts (e.g. 0.1 + 0.2)
    const fixed = parseFloat(num.toFixed(8));
    return fixed.toLocaleString('pt-BR', { maximumFractionDigits: 8 });
  };

  const handleDigit = useCallback(
    (digit: string) => {
      playKeySound('num', soundEnabled);
      if (isError) {
        setDisplayValue(digit);
        setIsError(false);
        setWaitingForSecondOperand(false);
        return;
      }

      if (waitingForSecondOperand) {
        setDisplayValue(digit);
        setWaitingForSecondOperand(false);
      } else {
        setDisplayValue((prev) => (prev === '0' ? digit : prev + digit));
      }
    },
    [isError, waitingForSecondOperand, soundEnabled]
  );

  const handleDecimal = useCallback(() => {
    playKeySound('num', soundEnabled);
    if (isError) {
      setDisplayValue('0.');
      setIsError(false);
      setWaitingForSecondOperand(false);
      return;
    }

    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!displayValue.includes('.')) {
      setDisplayValue((prev) => prev + '.');
    }
  }, [displayValue, isError, waitingForSecondOperand, soundEnabled]);

  const handleClear = useCallback(() => {
    playKeySound('clear', soundEnabled);
    setDisplayValue('0');
    setPreviousValue(null);
    setCurrentOperation(null);
    setWaitingForSecondOperand(false);
    setExpression('');
    setIsError(false);
  }, [soundEnabled]);

  const handleBackspace = useCallback(() => {
    playKeySound('num', soundEnabled);
    if (isError || waitingForSecondOperand) return;
    if (displayValue.length > 1) {
      setDisplayValue((prev) => prev.slice(0, -1));
    } else {
      setDisplayValue('0');
    }
  }, [displayValue, isError, waitingForSecondOperand, soundEnabled]);

  const handleToggleSign = useCallback(() => {
    playKeySound('op', soundEnabled);
    if (isError) return;
    const current = parseFloat(displayValue);
    if (current === 0) return;
    setDisplayValue((prev) => (prev.startsWith('-') ? prev.slice(1) : '-' + prev));
  }, [displayValue, isError, soundEnabled]);

  const handlePercentage = useCallback(() => {
    playKeySound('op', soundEnabled);
    if (isError) return;
    const current = parseFloat(displayValue);
    const result = current / 100;
    setDisplayValue(String(result));
    setExpression(`${displayValue}%`);
  }, [displayValue, isError, soundEnabled]);

  // Insert Constant Pi or e
  const handleInsertConstant = useCallback(
    (constant: 'pi' | 'e') => {
      playKeySound('num', soundEnabled);
      const val = constant === 'pi' ? Math.PI : Math.E;
      setDisplayValue(String(val));
      setWaitingForSecondOperand(false);
      setIsError(false);

      if (onTraceUpdate) {
        onTraceUpdate({
          functionName: constant === 'pi' ? 'math.pi' : 'math.e',
          codeSnippet: `import math\nconstante = math.${constant}`,
          arguments: {},
          returnValue: val,
          explanation: `Em Python: import math -> math.${constant} = ${val.toFixed(8)}...`,
          lineNumbers: [8, 9],
        });
      }
    },
    [soundEnabled, onTraceUpdate]
  );

  // Execute Scientific Unary Function (sin, cos, tan, log, log10, sqrt, sqr, cube)
  const handleScientificUnary = useCallback(
    (fn: ScientificFunction) => {
      playKeySound('op', soundEnabled);
      const current = parseFloat(displayValue);

      if (isNaN(current)) return;

      let result = 0;
      let errorMsg: string | null = null;
      let pySnippet = '';
      let explanation = '';

      switch (fn) {
        case 'sin': {
          const rad = angleUnit === 'DEG' ? (current * Math.PI) / 180 : current;
          result = Math.sin(rad);
          // Clean round small precision anomalies for known angles (e.g. sin(180) = 0)
          if (Math.abs(result) < 1e-12) result = 0;
          pySnippet =
            angleUnit === 'DEG'
              ? `import math\n# Converte graus para radianos com math.radians()\nradianos = math.radians(${current})\nresultado = math.sin(radianos)`
              : `import math\nresultado = math.sin(${current})`;
          explanation = `Seno de ${current}${angleUnit === 'DEG' ? '°' : ' rad'} = ${result.toFixed(6)}. Em Python, funções trigonométricas operam em radianos!`;
          break;
        }

        case 'cos': {
          const rad = angleUnit === 'DEG' ? (current * Math.PI) / 180 : current;
          result = Math.cos(rad);
          if (Math.abs(result) < 1e-12) result = 0;
          pySnippet =
            angleUnit === 'DEG'
              ? `import math\nradianos = math.radians(${current})\nresultado = math.cos(radianos)`
              : `import math\nresultado = math.cos(${current})`;
          explanation = `Cosseno de ${current}${angleUnit === 'DEG' ? '°' : ' rad'} = ${result.toFixed(6)}. Em Python: math.cos(radianos).`;
          break;
        }

        case 'tan': {
          const rad = angleUnit === 'DEG' ? (current * Math.PI) / 180 : current;
          if (Math.abs(Math.cos(rad)) < 1e-12) {
            errorMsg = 'Erro: Tangente Indefinida';
          } else {
            result = Math.tan(rad);
            if (Math.abs(result) < 1e-12) result = 0;
          }
          pySnippet = `import math\nresultado = math.tan(math.radians(${current}))`;
          explanation = `Tangente de ${current}${angleUnit === 'DEG' ? '°' : ' rad'} = ${result.toFixed(6)}.`;
          break;
        }

        case 'log': {
          // Natural logarithm (ln)
          if (current <= 0) {
            errorMsg = 'Erro: Log de x ≤ 0!';
            pySnippet = `import math\n# ValueError: math domain error\n# O logaritmo não é definido para números <= 0\nmath.log(${current})`;
            explanation = `⚠️ Em Python, math.log(x) dispara ValueError se x <= 0! O domínio do logaritmo exige números estritamente positivos.`;
          } else {
            result = Math.log(current);
            pySnippet = `import math\n# Logaritmo natural ln(x)\nresultado = math.log(${current})`;
            explanation = `Logaritmo Natural ln(${current}) = ${result.toFixed(6)}. No Python, math.log(x) sem segundo argumento calcula a base natural 'e'.`;
          }
          break;
        }

        case 'log10': {
          // Base 10 logarithm
          if (current <= 0) {
            errorMsg = 'Erro: Log de x ≤ 0!';
            pySnippet = `import math\nmath.log10(${current})`;
            explanation = `⚠️ Em Python, math.log10(x) dispara ValueError para x <= 0.`;
          } else {
            result = Math.log10(current);
            pySnippet = `import math\nresultado = math.log10(${current})`;
            explanation = `Logaritmo na Base 10 log10(${current}) = ${result.toFixed(6)}. Em Python: math.log10(x).`;
          }
          break;
        }

        case 'sqrt': {
          if (current < 0) {
            errorMsg = 'Erro: Raiz de Negativo!';
            pySnippet = `import math\n# ValueError: math domain error\nmath.sqrt(${current})`;
            explanation = `⚠️ Em Python, math.sqrt(x) gera ValueError para x < 0. No conjunto dos números reais, não existe raiz quadrada de negativo.`;
          } else {
            result = Math.sqrt(current);
            pySnippet = `import math\nresultado = math.sqrt(${current})`;
            explanation = `Raiz quadrada √(${current}) = ${result.toFixed(6)}. Em Python: math.sqrt(${current}) ou ${current} ** 0.5.`;
          }
          break;
        }

        case 'sqr': {
          result = Math.pow(current, 2);
          pySnippet = `# Em Python usamos o operador ** para exponenciação:\nresultado = ${current} ** 2`;
          explanation = `Elevado ao quadrado: (${current})² = ${result}. Em Python: x ** 2 ou math.pow(x, 2).`;
          break;
        }

        case 'cube': {
          result = Math.pow(current, 3);
          pySnippet = `resultado = ${current} ** 3`;
          explanation = `Elevado ao cubo: (${current})³ = ${result}. Em Python: x ** 3.`;
          break;
        }

        default:
          return;
      }

      if (errorMsg) {
        playKeySound('error', soundEnabled);
        setIsError(true);
        setDisplayValue(errorMsg);
        setWaitingForSecondOperand(false);
        if (onTraceUpdate) {
          onTraceUpdate({
            functionName: `math.${fn}`,
            codeSnippet: pySnippet,
            arguments: { x: current },
            returnValue: 'ValueError (math domain error)',
            explanation,
            lineNumbers: [25, 26, 27],
          });
        }
        return;
      }

      // Successful calculation
      const labelMap: { [key: string]: string } = {
        sin: `sen(${current}${angleUnit === 'DEG' ? '°' : ''})`,
        cos: `cos(${current}${angleUnit === 'DEG' ? '°' : ''})`,
        tan: `tan(${current}${angleUnit === 'DEG' ? '°' : ''})`,
        log: `ln(${current})`,
        log10: `log10(${current})`,
        sqrt: `√(${current})`,
        sqr: `(${current})²`,
        cube: `(${current})³`,
      };

      const exprLabel = labelMap[fn] || `${fn}(${current})`;
      const resStr = String(parseFloat(result.toFixed(8)));

      const breakdown = generateBreakdownForScientific(fn, current, angleUnit);
      setLastBreakdown(breakdown);

      setExpression(`${exprLabel} =`);
      setDisplayValue(resStr);
      setLastCalculation(`${exprLabel} = ${resStr}`);
      setWaitingForSecondOperand(true);

      const historyItem: CalculationHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        expression: exprLabel,
        result: resStr,
        operation: fn,
        num1: current,
        timestamp: new Date(),
      };
      setHistory((prev) => [historyItem, ...prev.slice(0, 19)]);

      if (onTraceUpdate) {
        onTraceUpdate({
          functionName: `math.${fn}`,
          codeSnippet: pySnippet,
          arguments: { x: current },
          returnValue: result,
          explanation,
          lineNumbers: [15, 16, 17],
        });
      }
    },
    [displayValue, angleUnit, soundEnabled, onTraceUpdate]
  );

  const performCalculation = (
    num1: number,
    num2: number,
    op: Operation
  ): { result: number | null; error?: string; trace: PythonTraceStep } => {
    let result: number | null = 0;
    let funcName = 'somar';
    let lineNumbers = [11, 12];
    let explanation = '';

    switch (op) {
      case '+':
        result = num1 + num2;
        funcName = 'somar';
        lineNumbers = [11, 12, 13];
        explanation = `Em Python: def somar(a, b): return a + b\nArgumentos: a = ${num1}, b = ${num2} -> Retorna: ${result}`;
        break;
      case '-':
        result = num1 - num2;
        funcName = 'subtrair';
        lineNumbers = [15, 16, 17];
        explanation = `Em Python: def subtrair(a, b): return a - b\nArgumentos: a = ${num1}, b = ${num2} -> Retorna: ${result}`;
        break;
      case '*':
        result = num1 * num2;
        funcName = 'multiplicar';
        lineNumbers = [19, 20, 21];
        explanation = `Em Python: def multiplicar(a, b): return a * b\nArgumentos: a = ${num1}, b = ${num2} -> Retorna: ${result}`;
        break;
      case '^':
        result = Math.pow(num1, num2);
        funcName = 'potencia';
        lineNumbers = [42, 43, 44];
        explanation = `Em Python: def potencia(base, exp): return base ** exp\n${num1} ** ${num2} = ${result}`;
        break;
      case '/':
        if (num2 === 0) {
          return {
            result: null,
            error: 'Erro: Divisão por Zero!',
            trace: {
              functionName: 'dividir',
              codeSnippet: `def dividir(a, b):\n    if b == 0:\n        raise ZeroDivisionError("Divisão por zero não é permitida!")\n    return a / b`,
              arguments: { a: num1, b: num2 },
              returnValue: 'ZeroDivisionError',
              explanation: `⚠️ Em Python, dividir por zero dispara uma exceção ZeroDivisionError! Capturamos esse erro usando try/except para proteger o aplicativo.`,
              lineNumbers: [23, 24, 25],
            },
          };
        }
        result = num1 / num2;
        funcName = 'dividir';
        lineNumbers = [23, 24, 25, 26];
        explanation = `Em Python: def dividir(a, b): return a / b\nArgumentos: a = ${num1}, b = ${num2} -> Retorna: ${result}`;
        break;
      default:
        result = num2;
    }

    const opSymbol = op === '*' ? '×' : op === '/' ? '÷' : op === '^' ? '^' : op;
    const trace: PythonTraceStep = {
      functionName: funcName,
      codeSnippet: `def ${funcName}(a, b):\n    return a ${op === '^' ? '**' : op} b`,
      arguments: { a: num1, b: num2 },
      returnValue: result,
      explanation: `${num1} ${opSymbol} ${num2} = ${result}. ${explanation}`,
      lineNumbers,
    };

    return { result, trace };
  };

  const handleOperation = useCallback(
    (nextOp: Operation) => {
      playKeySound('op', soundEnabled);
      const inputVal = parseFloat(displayValue);

      if (isError) {
        setIsError(false);
      }

      const opSymbol = nextOp === '*' ? '×' : nextOp === '/' ? '÷' : nextOp;

      if (previousValue === null) {
        setPreviousValue(inputVal);
        setExpression(`${displayValue} ${opSymbol}`);
      } else if (currentOperation) {
        // Chained calculation
        const { result, error, trace } = performCalculation(previousValue, inputVal, currentOperation);
        if (error) {
          playKeySound('error', soundEnabled);
          setIsError(true);
          setDisplayValue(error);
          setPreviousValue(null);
          setCurrentOperation(null);
          if (onTraceUpdate) onTraceUpdate(trace);
          return;
        }

        if (result !== null) {
          setPreviousValue(result);
          setDisplayValue(String(result));
          setExpression(`${formatNumber(result)} ${opSymbol}`);
          if (onTraceUpdate) onTraceUpdate(trace);
        }
      } else {
        setExpression(`${displayValue} ${opSymbol}`);
      }

      setWaitingForSecondOperand(true);
      setCurrentOperation(nextOp);
    },
    [displayValue, isError, previousValue, currentOperation, onTraceUpdate, soundEnabled]
  );

  const handleEquals = useCallback(() => {
    if (currentOperation === null || previousValue === null) {
      playKeySound('num', soundEnabled);
      return;
    }

    const secondOperand = parseFloat(displayValue);
    const { result, error, trace } = performCalculation(previousValue, secondOperand, currentOperation);

    if (error) {
      playKeySound('error', soundEnabled);
      setIsError(true);
      setDisplayValue(error);
      setPreviousValue(null);
      setCurrentOperation(null);
      setWaitingForSecondOperand(false);
      if (onTraceUpdate) onTraceUpdate(trace);
      return;
    }

    if (result !== null) {
      playKeySound('equals', soundEnabled);
      const opSymbol = currentOperation === '*' ? '×' : currentOperation === '/' ? '÷' : currentOperation;
      const fullExpr = `${previousValue} ${opSymbol} ${secondOperand}`;
      const resultStr = String(result);

      const breakdown = generateBreakdownForOperation(currentOperation, previousValue, secondOperand);
      setLastBreakdown(breakdown);

      setExpression(`${fullExpr} =`);
      setDisplayValue(resultStr);
      setLastCalculation(`${fullExpr} = ${formatNumber(result)}`);

      // Add to history
      const newHistoryItem: CalculationHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        expression: fullExpr,
        result: resultStr,
        operation: currentOperation,
        num1: previousValue,
        num2: secondOperand,
        timestamp: new Date(),
      };
      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 19)]);

      setPreviousValue(null);
      setCurrentOperation(null);
      setWaitingForSecondOperand(true);

      if (onTraceUpdate) onTraceUpdate(trace);
    }
  }, [currentOperation, displayValue, previousValue, onTraceUpdate, soundEnabled]);

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === '.' || e.key === ',') {
        e.preventDefault();
        handleDecimal();
      } else if (e.key === '+') {
        e.preventDefault();
        handleOperation('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleOperation('-');
      } else if (e.key === '*') {
        e.preventDefault();
        handleOperation('*');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperation('/');
      } else if (e.key === '^') {
        e.preventDefault();
        handleOperation('^');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleDecimal, handleOperation, handleEquals, handleBackspace, handleClear]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(displayValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const restoreHistory = (item: CalculationHistoryItem) => {
    setDisplayValue(item.result);
    setExpression(`${item.expression} =`);
    setPreviousValue(null);
    setCurrentOperation(null);
    setWaitingForSecondOperand(true);
    setShowHistory(false);
  };

  // Theme palettes
  const themeClasses = {
    'rose-gold': {
      card: 'bg-gradient-to-b from-[#221025]/90 to-[#150a17]/95 border-pink-500/30 shadow-[0_20px_50px_rgba(236,72,153,0.18)]',
      displayBg: 'bg-[#120715]/80 border-pink-500/20 text-white',
      displaySub: 'text-pink-300/70',
      numBtn: 'bg-pink-950/40 hover:bg-pink-900/50 text-pink-100 border border-pink-500/15 shadow-sm active:bg-pink-800/60',
      opBtn: 'bg-gradient-to-b from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-md shadow-pink-600/30 border border-pink-400/30',
      sciBtn: 'bg-gradient-to-b from-pink-950/60 to-purple-950/50 hover:bg-pink-900/60 text-pink-200 border border-pink-500/25 text-xs font-semibold shadow-sm',
      specBtn: 'bg-pink-900/30 hover:bg-pink-800/40 text-pink-200 border border-pink-500/20',
      eqBtn: 'bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 hover:opacity-95 text-white font-bold shadow-lg shadow-pink-500/40',
      accent: 'text-pink-400',
    },
    'pastel-blush': {
      card: 'bg-gradient-to-b from-[#fff5f8] to-[#fce7f3] border-pink-300 shadow-[0_20px_50px_rgba(244,114,182,0.25)] text-slate-800',
      displayBg: 'bg-white/90 border-pink-200 text-slate-900',
      displaySub: 'text-pink-600/70',
      numBtn: 'bg-white hover:bg-pink-50 text-pink-950 border border-pink-200 shadow-sm active:bg-pink-100',
      opBtn: 'bg-gradient-to-b from-pink-400 to-rose-400 hover:from-pink-300 hover:to-rose-300 text-white shadow-md shadow-pink-300/50 border border-pink-300',
      sciBtn: 'bg-pink-100/90 hover:bg-pink-200 text-pink-900 border border-pink-300/80 text-xs font-semibold shadow-sm',
      specBtn: 'bg-pink-100 hover:bg-pink-200/80 text-pink-800 border border-pink-200',
      eqBtn: 'bg-gradient-to-r from-pink-500 to-rose-500 hover:opacity-95 text-white font-bold shadow-lg shadow-pink-400/40',
      accent: 'text-pink-600',
    },
    'cyber-neon': {
      card: 'bg-[#0e0714] border-pink-500/50 shadow-[0_0_35px_rgba(255,42,133,0.3)]',
      displayBg: 'bg-[#08030c] border-pink-500/40 text-pink-50',
      displaySub: 'text-pink-400',
      numBtn: 'bg-[#1f0d2b]/80 hover:bg-[#341647] text-pink-200 border border-pink-500/25 active:bg-[#481c61]',
      opBtn: 'bg-[#ff2a85] hover:bg-[#ff4798] text-white font-bold shadow-[0_0_15px_rgba(255,42,133,0.6)] border border-pink-300',
      sciBtn: 'bg-[#21092e] hover:bg-[#3b1252] text-pink-300 border border-pink-500/40 text-xs font-semibold shadow-[0_0_8px_rgba(255,42,133,0.2)]',
      specBtn: 'bg-[#2b1037] hover:bg-[#3f1952] text-pink-300 border border-pink-500/30',
      eqBtn: 'bg-gradient-to-r from-[#ff2a85] to-[#f43f5e] hover:brightness-110 text-white font-black shadow-[0_0_20px_rgba(255,42,133,0.8)]',
      accent: 'text-[#ff2a85]',
    },
  }[theme];

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Decorative ambient pink glow */}
      <div className="absolute -inset-2 bg-gradient-to-r from-pink-600/30 via-rose-500/20 to-fuchsia-600/30 rounded-3xl blur-2xl opacity-60 -z-10" />

      {/* Calculator Body */}
      <div
        className={`rounded-3xl p-5 sm:p-6 border backdrop-blur-xl transition-all duration-300 ${themeClasses.card}`}
      >
        {/* Top Controls Bar */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-pink-500/15">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-400 shrink-0" />
            {/* Mode Segmented Switch: Básica / Científica */}
            <div className="flex items-center p-0.5 rounded-lg bg-black/25 border border-pink-500/20 text-[11px]">
              <button
                onClick={() => setMode('basic')}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  mode === 'basic'
                    ? 'bg-pink-600 text-white font-semibold shadow-xs'
                    : 'text-pink-300/70 hover:text-white'
                }`}
              >
                Básica
              </button>
              <button
                onClick={() => setMode('scientific')}
                className={`px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors ${
                  mode === 'scientific'
                    ? 'bg-pink-600 text-white font-semibold shadow-xs'
                    : 'text-pink-300/70 hover:text-white'
                }`}
              >
                <Atom className="w-3 h-3" />
                <span>Científica</span>
              </button>
            </div>

            {/* Quick Navigation to New Features */}
            {onNavigateTab && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onNavigateTab('scales')}
                  title="Abrir Estúdio de Escalas"
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-pink-950/50 hover:bg-pink-900/60 border border-pink-500/30 text-pink-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Ruler className="w-3 h-3 text-pink-400" />
                  <span>Escalas</span>
                </button>
                <button
                  onClick={() => onNavigateTab('units')}
                  title="Abrir Conversor de Medidas"
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-pink-950/50 hover:bg-pink-900/60 border border-pink-500/30 text-pink-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <Scale className="w-3 h-3 text-pink-400" />
                  <span>Medidas</span>
                </button>
                <button
                  onClick={() => onNavigateTab('breakdown')}
                  title="Abrir Lousa de Demonstração de Contas"
                  className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-pink-950/50 hover:bg-pink-900/60 border border-pink-500/30 text-pink-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  <BookOpen className="w-3 h-3 text-pink-400" />
                  <span>Passo a Passo</span>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {/* Angle Unit Switcher (DEG / RAD) if scientific */}
            {mode === 'scientific' && (
              <button
                onClick={() => setAngleUnit(angleUnit === 'DEG' ? 'RAD' : 'DEG')}
                title="Alternar unidade angular (Graus / Radianos)"
                className="px-2 py-1 rounded-md text-[10px] font-bold tracking-wider bg-pink-950/60 hover:bg-pink-900/60 border border-pink-500/30 text-pink-300 transition-colors"
              >
                {angleUnit}
              </button>
            )}

            {/* Sound toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Silenciar cliques' : 'Ativar som de clique'}
              className="p-1.5 rounded-lg text-pink-300/80 hover:text-pink-100 hover:bg-pink-500/20 transition-colors"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* History toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              title="Histórico de Cálculos"
              className={`p-1.5 rounded-lg transition-colors relative ${
                showHistory
                  ? 'bg-pink-500/30 text-pink-200'
                  : 'text-pink-300/80 hover:text-pink-100 hover:bg-pink-500/20'
              }`}
            >
              <History className="w-4 h-4" />
              {history.length > 0 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-pink-400" />
              )}
            </button>

            {/* View Python Code trigger */}
            {onViewCodeClick && (
              <button
                onClick={onViewCodeClick}
                title="Ver código Python correspondente"
                className="p-1.5 rounded-lg text-pink-300/80 hover:text-pink-100 hover:bg-pink-500/20 transition-colors"
              >
                <Code2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Display Area */}
        <div
          className={`rounded-2xl p-4 mb-5 border transition-colors flex flex-col justify-end min-h-[110px] relative group overflow-hidden ${themeClasses.displayBg}`}
        >
          {/* Subtle Expression Breadcrumb */}
          <div className="flex items-center justify-between text-xs min-h-[18px] mb-1">
            <span className={`font-mono truncate ${themeClasses.displaySub}`}>
              {expression || (currentOperation ? `${previousValue} ${currentOperation}` : '')}
            </span>
            <button
              onClick={copyToClipboard}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-pink-300 hover:text-white"
              title="Copiar resultado"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Main Large Display Number */}
          <div className="flex items-baseline justify-end overflow-hidden">
            <span
              className={`font-mono text-right font-bold tracking-tight select-all transition-all ${
                displayValue.length > 14
                  ? 'text-xl'
                  : displayValue.length > 9
                  ? 'text-2xl'
                  : 'text-4xl'
              } ${isError ? 'text-rose-400 text-lg font-semibold' : ''}`}
            >
              {isError ? displayValue : displayValue}
            </span>
          </div>

          {/* Quick Python Equivalent Indicator & Step-by-Step Prompt */}
          {lastCalculation && !isError && (
            <div className="mt-1 pt-1.5 border-t border-pink-500/15 flex items-center justify-between text-[11px] text-pink-300/80 font-mono">
              <span className="truncate">Python: {lastCalculation}</span>
              {lastBreakdown && onOpenBreakdown && (
                <button
                  onClick={() => onOpenBreakdown(lastBreakdown)}
                  className="text-pink-300 hover:text-white font-bold underline flex items-center gap-1 shrink-0 ml-2 text-[10px] bg-pink-950/60 hover:bg-pink-900/70 px-2 py-0.5 rounded border border-pink-500/30 transition-colors"
                  title="Ver demonstração didática detalhada"
                >
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  <span>Demonstrar Passo a Passo</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* History Drawer Overlay */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 overflow-hidden rounded-xl bg-pink-950/60 border border-pink-500/30 p-3"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-pink-500/20 text-xs text-pink-200">
                <span className="font-semibold flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-pink-400" /> Histórico Recente
                </span>
                {history.length > 0 && (
                  <button
                    onClick={() => setHistory([])}
                    className="text-[11px] text-pink-400 hover:text-pink-200"
                  >
                    Limpar tudo
                  </button>
                )}
              </div>
              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1">
                {history.length === 0 ? (
                  <p className="text-xs text-pink-300/60 text-center py-4">Nenhum cálculo recente ainda.</p>
                ) : (
                  history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => restoreHistory(item)}
                      className="w-full text-left p-1.5 rounded-lg hover:bg-pink-500/20 transition-colors flex items-center justify-between text-xs group"
                    >
                      <span className="font-mono text-pink-200/80 group-hover:text-pink-100">
                        {item.expression} =
                      </span>
                      <span className="font-mono font-bold text-pink-400 group-hover:text-pink-300">
                        {formatNumber(parseFloat(item.result))}
                      </span>
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCIENTIFIC FUNCTIONS PANEL (Displayed when in scientific mode) */}
        <AnimatePresence>
          {mode === 'scientific' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 space-y-2 overflow-hidden"
            >
              {/* Scientific Row 1: Trigonometric & Logarithmic */}
              <div className="grid grid-cols-5 gap-2">
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleScientificUnary('sin')}
                  className={`h-10 rounded-xl transition-all ${themeClasses.sciBtn}`}
                  title="Seno em Python: math.sin(radianos)"
                >
                  sen
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleScientificUnary('cos')}
                  className={`h-10 rounded-xl transition-all ${themeClasses.sciBtn}`}
                  title="Cosseno em Python: math.cos(radianos)"
                >
                  cos
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleScientificUnary('tan')}
                  className={`h-10 rounded-xl transition-all ${themeClasses.sciBtn}`}
                  title="Tangente em Python: math.tan(radianos)"
                >
                  tan
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleScientificUnary('log')}
                  className={`h-10 rounded-xl transition-all ${themeClasses.sciBtn}`}
                  title="Logaritmo Natural (ln) em Python: math.log(x)"
                >
                  ln
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleScientificUnary('log10')}
                  className={`h-10 rounded-xl transition-all ${themeClasses.sciBtn}`}
                  title="Logaritmo Base 10 em Python: math.log10(x)"
                >
                  log₁₀
                </motion.button>
              </div>

              {/* Scientific Row 2: Powers, Roots & Constants */}
              <div className="grid grid-cols-5 gap-2">
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleScientificUnary('sqrt')}
                  className={`h-10 rounded-xl transition-all ${themeClasses.sciBtn}`}
                  title="Raiz Quadrada em Python: math.sqrt(x)"
                >
                  √(x)
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleScientificUnary('sqr')}
                  className={`h-10 rounded-xl transition-all ${themeClasses.sciBtn}`}
                  title="Ao Quadrado em Python: x ** 2"
                >
                  x²
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleOperation('^')}
                  className={`h-10 rounded-xl transition-all ${
                    currentOperation === '^' ? 'ring-2 ring-pink-300' : ''
                  } ${themeClasses.sciBtn}`}
                  title="Potência em Python: x ** y ou math.pow(x, y)"
                >
                  xʸ
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleInsertConstant('pi')}
                  className={`h-10 rounded-xl transition-all ${themeClasses.sciBtn}`}
                  title="Número Pi em Python: math.pi (3.14159...)"
                >
                  π
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handleInsertConstant('e')}
                  className={`h-10 rounded-xl transition-all ${themeClasses.sciBtn}`}
                  title="Número Euler em Python: math.e (2.71828...)"
                >
                  e
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Standard Keypad Grid (4 columns) */}
        <div className="grid grid-cols-4 gap-2.5">
          {/* Row 1 */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleClear}
            className={`h-12 rounded-xl text-sm font-bold transition-all ${themeClasses.specBtn}`}
            title="Limpar tudo (Esc)"
          >
            AC
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleToggleSign}
            className={`h-12 rounded-xl text-sm font-semibold transition-all ${themeClasses.specBtn}`}
            title="Inverter sinal (±)"
          >
            ±
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handlePercentage}
            className={`h-12 rounded-xl text-sm font-semibold transition-all ${themeClasses.specBtn}`}
            title="Porcentagem (%)"
          >
            %
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleOperation('/')}
            className={`h-12 rounded-xl text-lg font-bold transition-all ${
              currentOperation === '/' ? 'ring-2 ring-white' : ''
            } ${themeClasses.opBtn}`}
            title="Divisão em Python: /"
          >
            ÷
          </motion.button>

          {/* Row 2 */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleDigit('7')}
            className={`h-12 rounded-xl text-base font-semibold transition-all ${themeClasses.numBtn}`}
          >
            7
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleDigit('8')}
            className={`h-12 rounded-xl text-base font-semibold transition-all ${themeClasses.numBtn}`}
          >
            8
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleDigit('9')}
            className={`h-12 rounded-xl text-base font-semibold transition-all ${themeClasses.numBtn}`}
          >
            9
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleOperation('*')}
            className={`h-12 rounded-xl text-lg font-bold transition-all ${
              currentOperation === '*' ? 'ring-2 ring-white' : ''
            } ${themeClasses.opBtn}`}
            title="Multiplicação em Python: *"
          >
            ×
          </motion.button>

          {/* Row 3 */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleDigit('4')}
            className={`h-12 rounded-xl text-base font-semibold transition-all ${themeClasses.numBtn}`}
          >
            4
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleDigit('5')}
            className={`h-12 rounded-xl text-base font-semibold transition-all ${themeClasses.numBtn}`}
          >
            5
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleDigit('6')}
            className={`h-12 rounded-xl text-base font-semibold transition-all ${themeClasses.numBtn}`}
          >
            6
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleOperation('-')}
            className={`h-12 rounded-xl text-lg font-bold transition-all ${
              currentOperation === '-' ? 'ring-2 ring-white' : ''
            } ${themeClasses.opBtn}`}
            title="Subtração em Python: -"
          >
            −
          </motion.button>

          {/* Row 4 */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleDigit('1')}
            className={`h-12 rounded-xl text-base font-semibold transition-all ${themeClasses.numBtn}`}
          >
            1
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleDigit('2')}
            className={`h-12 rounded-xl text-base font-semibold transition-all ${themeClasses.numBtn}`}
          >
            2
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleDigit('3')}
            className={`h-12 rounded-xl text-base font-semibold transition-all ${themeClasses.numBtn}`}
          >
            3
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleOperation('+')}
            className={`h-12 rounded-xl text-lg font-bold transition-all ${
              currentOperation === '+' ? 'ring-2 ring-white' : ''
            } ${themeClasses.opBtn}`}
            title="Soma em Python: +"
          >
            +
          </motion.button>

          {/* Row 5 */}
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => handleDigit('0')}
            className={`h-12 rounded-xl text-base font-semibold transition-all ${themeClasses.numBtn}`}
          >
            0
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleDecimal}
            className={`h-12 rounded-xl text-base font-bold transition-all ${themeClasses.numBtn}`}
            title="Separador decimal float"
          >
            .
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleBackspace}
            className={`h-12 rounded-xl text-sm font-semibold flex items-center justify-center transition-all ${themeClasses.specBtn}`}
            title="Apagar último dígito (Backspace)"
          >
            <Delete className="w-4 h-4" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={handleEquals}
            className={`h-12 rounded-xl text-lg font-extrabold transition-all ${themeClasses.eqBtn}`}
            title="Calcular resultado (Enter)"
          >
            =
          </motion.button>
        </div>

        {/* Theme Palette Switcher below keypad */}
        <div className="mt-5 pt-3 border-t border-pink-500/15 flex items-center justify-between text-xs">
          <span className="text-pink-300/80 font-medium">Tema Rosa:</span>
          <div className="flex items-center gap-1.5 p-1 bg-black/20 rounded-lg">
            <button
              onClick={() => setTheme('rose-gold')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                theme === 'rose-gold'
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'text-pink-300/70 hover:text-white'
              }`}
            >
              Rose Gold
            </button>
            <button
              onClick={() => setTheme('pastel-blush')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                theme === 'pastel-blush'
                  ? 'bg-pink-400 text-slate-900 shadow-sm'
                  : 'text-pink-300/70 hover:text-white'
              }`}
            >
              Pastel Blush
            </button>
            <button
              onClick={() => setTheme('cyber-neon')}
              className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                theme === 'cyber-neon'
                  ? 'bg-[#ff2a85] text-white shadow-sm'
                  : 'text-pink-300/70 hover:text-white'
              }`}
            >
              Cyber Neon
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
