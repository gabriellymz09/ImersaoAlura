export type Operation = '+' | '-' | '*' | '/' | '^' | null;

export type ScientificFunction =
  | 'sin'
  | 'cos'
  | 'tan'
  | 'log'
  | 'log10'
  | 'sqrt'
  | 'sqr'
  | 'cube'
  | 'fact'
  | 'pi'
  | 'e';

export type AngleUnit = 'DEG' | 'RAD';

export interface CalculationHistoryItem {
  id: string;
  expression: string;
  result: string;
  operation: Operation | ScientificFunction;
  num1: number;
  num2?: number;
  timestamp: Date;
}

export type PinkTheme = 'rose-gold' | 'pastel-blush' | 'cyber-neon';
export type CalculatorMode = 'basic' | 'scientific';

export interface PythonTraceStep {
  functionName: string;
  codeSnippet: string;
  arguments: { [key: string]: number | string };
  returnValue: number | string | null;
  explanation: string;
  lineNumbers: number[];
}
