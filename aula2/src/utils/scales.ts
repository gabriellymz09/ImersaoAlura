import { ScalePreset, ScaleCalculationResult } from '../types/calculator';

// Standard unit factors to meters
export const LENGTH_UNIT_TO_METERS: { [key: string]: { name: string; factor: number; symbol: string } } = {
  mm: { name: 'Milímetros', factor: 0.001, symbol: 'mm' },
  cm: { name: 'Centímetros', factor: 0.01, symbol: 'cm' },
  m: { name: 'Metros', factor: 1.0, symbol: 'm' },
  km: { name: 'Quilômetros', factor: 1000.0, symbol: 'km' },
  in: { name: 'Polegadas', factor: 0.0254, symbol: 'in' },
  ft: { name: 'Pés', factor: 0.3048, symbol: 'ft' },
};

export const DEFAULT_SCALE_PRESETS: ScalePreset[] = [
  // Arquitetura
  {
    id: 'arch-1-50',
    name: '1:50 (Plantas Baixas)',
    numerator: 1,
    denominator: 50,
    category: 'architecture',
    description: 'Padrão da ABNT para plantas baixas, cortes e elevações residenciais.',
  },
  {
    id: 'arch-1-100',
    name: '1:100 (Projetos Gerais)',
    numerator: 1,
    denominator: 100,
    category: 'architecture',
    description: '1 cm no desenho = 1 metro na vida real. Ideal para plantas executivas gerais.',
  },
  {
    id: 'arch-1-20',
    name: '1:20 (Detalhamento)',
    numerator: 1,
    denominator: 20,
    category: 'architecture',
    description: 'Detalhamento de cozinhas, banheiros, marcenaria e esquadrias.',
  },
  {
    id: 'arch-1-200',
    name: '1:200 (Implantação)',
    numerator: 1,
    denominator: 200,
    category: 'architecture',
    description: 'Plantas de cobertura, implantação no terreno e localização.',
  },
  {
    id: 'arch-1-500',
    name: '1:500 (Loteamentos)',
    numerator: 1,
    denominator: 500,
    category: 'architecture',
    description: 'Urbanismo, quadras e levantamentos topográficos amplos.',
  },

  // Modelismo & Miniaturas
  {
    id: 'mod-1-64',
    name: '1:64 (Hot Wheels / Diecast)',
    numerator: 1,
    denominator: 64,
    category: 'modeling',
    description: 'Escala mundial clássica de carrinhos de ferro e miniaturas diecast.',
  },
  {
    id: 'mod-1-87',
    name: '1:87 (Ferromodelismo H0)',
    numerator: 1,
    denominator: 87,
    category: 'modeling',
    description: 'A escala H0 mais popular do mundo para maquetes de trens e ferrovias.',
  },
  {
    id: 'mod-1-43',
    name: '1:43 (Colecionismo Automotivo)',
    numerator: 1,
    denominator: 43,
    category: 'modeling',
    description: 'Escala europeia padrão para réplicas detalhadas de carros de corrida e passeio.',
  },
  {
    id: 'mod-1-72',
    name: '1:72 (Plastimodelismo Militar)',
    numerator: 1,
    denominator: 72,
    category: 'modeling',
    description: 'Modelos de aviões e tanques militares com alto nível de detalhe.',
  },

  // Engenharia & Peças
  {
    id: 'eng-1-1',
    name: '1:1 (Escala Natural)',
    numerator: 1,
    denominator: 1,
    category: 'engineering',
    description: 'Medida idêntica à real (tamanho 100% natural).',
  },
  {
    id: 'eng-2-1',
    name: '2:1 (Ampliação 2x)',
    numerator: 2,
    denominator: 1,
    category: 'engineering',
    description: 'Ampliação para peças de relógio, parafusos de precisão e eletrônica.',
  },
  {
    id: 'eng-5-1',
    name: '5:1 (Ampliação 5x)',
    numerator: 5,
    denominator: 1,
    category: 'engineering',
    description: 'Desenho ampliado 5 vezes para detalhamento microscópico de engrenagens.',
  },

  // Cartografia
  {
    id: 'cart-1-10000',
    name: '1:10.000 (Mapa Urbano)',
    numerator: 1,
    denominator: 10000,
    category: 'cartography',
    description: '1 cm no mapa = 100 metros na cidade. Mapas de bairros e guias urbanos.',
  },
  {
    id: 'cart-1-50000',
    name: '1:50.000 (Carta Topográfica)',
    numerator: 1,
    denominator: 50000,
    category: 'cartography',
    description: '1 cm = 500 m. Padrão internacional de cartas do exército e trilhas.',
  },
];

export function convertLength(val: number, fromUnit: string, toUnit: string): number {
  const from = LENGTH_UNIT_TO_METERS[fromUnit]?.factor || 1;
  const to = LENGTH_UNIT_TO_METERS[toUnit]?.factor || 1;
  const inMeters = val * from;
  return inMeters / to;
}

export function formatScaleRatio(num: number, den: number): string {
  if (num === 1) return `1:${den}`;
  if (den === 1) return `${num}:1`;
  return `${num}:${den}`;
}

/**
 * Given Real measurement, calculate size on Drawing / Model
 * d = R * (numerator / denominator)
 */
export function calculateDrawingMeasure(
  realVal: number,
  realUnit: string,
  numerator: number,
  denominator: number,
  targetDrawingUnit: string = 'cm'
): ScaleCalculationResult {
  const realInMeters = realVal * (LENGTH_UNIT_TO_METERS[realUnit]?.factor || 1);
  const scaleFactor = numerator / denominator;
  const drawingInMeters = realInMeters * scaleFactor;
  const targetDrawingVal = drawingInMeters / (LENGTH_UNIT_TO_METERS[targetDrawingUnit]?.factor || 0.01);

  const ratioStr = formatScaleRatio(numerator, denominator);
  const proportionFormula = `d = R × (${numerator} / ${denominator})`;

  const pythonSnippet = `# Cálculo de Escala (Real -> Desenho) em Python:
real_val = ${realVal}  # em ${realUnit}
# 1. Converte para metros:
real_m = real_val * ${LENGTH_UNIT_TO_METERS[realUnit]?.factor}
# 2. Aplica o fator de escala (${ratioStr}):
desenho_m = real_m * (${numerator} / ${denominator})
# 3. Converte para ${targetDrawingUnit}:
desenho_final = desenho_m / ${LENGTH_UNIT_TO_METERS[targetDrawingUnit]?.factor}
print(f"Medida no papel: {desenho_final:.4f} ${targetDrawingUnit}")`;

  const explanation = `Um objeto de ${realVal} ${realUnit} na escala ${ratioStr} medirá exatamente ${targetDrawingVal.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} ${targetDrawingUnit} no papel ou maquete.`;

  return {
    realValue: realVal,
    realUnit,
    drawingValue: parseFloat(targetDrawingVal.toFixed(6)),
    drawingUnit: targetDrawingUnit,
    ratioStr,
    factor: scaleFactor,
    proportionFormula,
    pythonSnippet,
    explanation,
  };
}

/**
 * Given Drawing measurement, calculate size in Real Life
 * R = d / (numerator / denominator) = d * (denominator / numerator)
 */
export function calculateRealMeasure(
  drawingVal: number,
  drawingUnit: string,
  numerator: number,
  denominator: number,
  targetRealUnit: string = 'm'
): ScaleCalculationResult {
  const drawingInMeters = drawingVal * (LENGTH_UNIT_TO_METERS[drawingUnit]?.factor || 0.01);
  const scaleFactor = numerator / denominator;
  const realInMeters = drawingInMeters / scaleFactor;
  const targetRealVal = realInMeters / (LENGTH_UNIT_TO_METERS[targetRealUnit]?.factor || 1);

  const ratioStr = formatScaleRatio(numerator, denominator);
  const proportionFormula = `R = d × (${denominator} / ${numerator})`;

  const pythonSnippet = `# Cálculo de Escala (Desenho -> Real) em Python:
desenho_val = ${drawingVal}  # em ${drawingUnit}
# 1. Converte para metros:
desenho_m = desenho_val * ${LENGTH_UNIT_TO_METERS[drawingUnit]?.factor}
# 2. Reverte a escala (${ratioStr}):
real_m = desenho_m * (${denominator} / ${numerator})
# 3. Converte para ${targetRealUnit}:
real_final = real_m / ${LENGTH_UNIT_TO_METERS[targetRealUnit]?.factor}
print(f"Medida Real no terreno: {real_final:.4f} ${targetRealUnit}")`;

  const explanation = `Uma linha de ${drawingVal} ${drawingUnit} no desenho na escala ${ratioStr} corresponde a ${targetRealVal.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} ${targetRealUnit} na vida real.`;

  return {
    realValue: parseFloat(targetRealVal.toFixed(6)),
    realUnit: targetRealUnit,
    drawingValue: drawingVal,
    drawingUnit,
    ratioStr,
    factor: scaleFactor,
    proportionFormula,
    pythonSnippet,
    explanation,
  };
}

/**
 * Discover/Find custom scale based on both Real and Drawing measurements
 * Escala = d / R
 */
export function discoverScale(
  realVal: number,
  realUnit: string,
  drawingVal: number,
  drawingUnit: string
): ScaleCalculationResult & { calculatedNumerator: number; calculatedDenominator: number } {
  const realInMeters = realVal * (LENGTH_UNIT_TO_METERS[realUnit]?.factor || 1);
  const drawingInMeters = drawingVal * (LENGTH_UNIT_TO_METERS[drawingUnit]?.factor || 0.01);

  if (realInMeters <= 0 || drawingInMeters <= 0) {
    return {
      realValue: realVal,
      realUnit,
      drawingValue: drawingVal,
      drawingUnit,
      ratioStr: '1:1',
      factor: 1,
      proportionFormula: 'Escala indefinida para valores nulos',
      pythonSnippet: '# Escala indefinida',
      explanation: 'Informe valores maiores que zero para descobrir a escala.',
      calculatedNumerator: 1,
      calculatedDenominator: 1,
    };
  }

  const rawRatio = drawingInMeters / realInMeters;

  let calculatedNumerator = 1;
  let calculatedDenominator = 1;

  if (rawRatio <= 1) {
    // Redução (ex: 1:50)
    calculatedNumerator = 1;
    calculatedDenominator = Math.round((1 / rawRatio) * 100) / 100;
  } else {
    // Ampliação (ex: 2:1)
    calculatedNumerator = Math.round(rawRatio * 100) / 100;
    calculatedDenominator = 1;
  }

  const ratioStr = formatScaleRatio(calculatedNumerator, calculatedDenominator);
  const proportionFormula = `Escala = d / R = ${drawingInMeters}m / ${realInMeters}m = ${ratioStr}`;

  const pythonSnippet = `# Descobridor de Escala Automático em Python:
real_m = ${realVal} * ${LENGTH_UNIT_TO_METERS[realUnit]?.factor}
desenho_m = ${drawingVal} * ${LENGTH_UNIT_TO_METERS[drawingUnit]?.factor}

razao = desenho_m / real_m
if razao <= 1:
    denominador = round(1 / razao, 2)
    print(f"Escala de Redução: 1:{denominador}")
else:
    numerador = round(razao, 2)
    print(f"Escala de Ampliação: {numerador}:1")`;

  const explanation = `Com a medida real de ${realVal} ${realUnit} e medida no papel de ${drawingVal} ${drawingUnit}, a escala exata criada é ${ratioStr}.`;

  return {
    realValue: realVal,
    realUnit,
    drawingValue: drawingVal,
    drawingUnit,
    ratioStr,
    factor: rawRatio,
    proportionFormula,
    pythonSnippet,
    explanation,
    calculatedNumerator,
    calculatedDenominator,
  };
}

