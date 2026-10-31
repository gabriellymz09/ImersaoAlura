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
export type CalculatorMode = 'basic' | 'scientific' | 'scales' | 'units' | 'breakdown';

export interface PythonTraceStep {
  functionName: string;
  codeSnippet: string;
  arguments: { [key: string]: number | string };
  returnValue: number | string | null;
  explanation: string;
  lineNumbers: number[];
}

// 📐 Types for Scale Studio (Criação e Cálculo de Escalas)
export type ScaleDirection = 'real-to-drawing' | 'drawing-to-real' | 'find-scale';

export interface ScalePreset {
  id: string;
  name: string;
  numerator: number;
  denominator: number;
  category: 'architecture' | 'engineering' | 'cartography' | 'modeling' | 'custom';
  description: string;
}

export interface ScaleCalculationResult {
  realValue: number;
  realUnit: string;
  drawingValue: number;
  drawingUnit: string;
  ratioStr: string;
  factor: number;
  proportionFormula: string;
  pythonSnippet: string;
  explanation: string;
}

// 📏 Types for Unit & Measurement Conversions (Alterações de Medidas)
export type UnitCategoryType =
  | 'length'
  | 'mass'
  | 'area'
  | 'volume'
  | 'temperature'
  | 'speed'
  | 'time'
  | 'digital';

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  toBase: (val: number) => number;
  fromBase: (val: number) => number;
  description: string;
}

export interface UnitCategoryConfig {
  id: UnitCategoryType;
  name: string;
  iconName: string;
  description: string;
  baseUnit: string;
  units: UnitDefinition[];
}

// 📝 Types for Mathematical Demonstration (Demonstração de Contas)
export interface StepDetail {
  stepNumber: number;
  title: string;
  description: string;
  expression: string;
  subResult?: string;
  note?: string;
}

export interface MathBreakdownData {
  title: string;
  operationSymbol: string;
  expression: string;
  result: string | number;
  steps: StepDetail[];
  methodName: string;
  visualBoard?: {
    type: 'vertical-addition' | 'vertical-subtraction' | 'long-multiplication' | 'long-division' | 'power-expansion' | 'scale-proportion' | 'unit-factor';
    rows: string[];
    highlightIndex?: number;
    notes?: string[];
  };
  mathematicalProperties: string[];
  pythonCode: string;
  realWorldCuriosity?: string;
}
