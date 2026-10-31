import { UnitCategoryConfig, UnitCategoryType, UnitDefinition } from '../types/calculator';

export const UNIT_CATEGORIES: UnitCategoryConfig[] = [
  {
    id: 'length',
    name: 'Comprimento & Distância',
    iconName: 'Ruler',
    description: 'De micrômetros a quilômetros, polegadas e milhas.',
    baseUnit: 'm',
    units: [
      {
        id: 'km',
        name: 'Quilômetro',
        symbol: 'km',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
        description: '1.000 metros (usado em estradas e distâncias geográficas)',
      },
      {
        id: 'm',
        name: 'Metro',
        symbol: 'm',
        toBase: (v) => v,
        fromBase: (v) => v,
        description: 'Unidade padrão fundamental do SI',
      },
      {
        id: 'cm',
        name: 'Centímetro',
        symbol: 'cm',
        toBase: (v) => v * 0.01,
        fromBase: (v) => v / 0.01,
        description: '1/100 de metro (comum em réguas escolares)',
      },
      {
        id: 'mm',
        name: 'Milímetro',
        symbol: 'mm',
        toBase: (v) => v * 0.001,
        fromBase: (v) => v / 0.001,
        description: '1/1.000 de metro (precisão mecânica e arquitetura)',
      },
      {
        id: 'um',
        name: 'Micrômetro',
        symbol: 'µm',
        toBase: (v) => v * 1e-6,
        fromBase: (v) => v / 1e-6,
        description: 'Milionésimo do metro (células e biologia)',
      },
      {
        id: 'in',
        name: 'Polegada',
        symbol: 'in (")',
        toBase: (v) => v * 0.0254,
        fromBase: (v) => v / 0.0254,
        description: '1 polegada = 2,54 cm (telas de TV, celulares, tubulações)',
      },
      {
        id: 'ft',
        name: 'Pé',
        symbol: 'ft (\')',
        toBase: (v) => v * 0.3048,
        fromBase: (v) => v / 0.3048,
        description: '1 pé = 12 polegadas = 30,48 cm (altitude na aviação)',
      },
      {
        id: 'yd',
        name: 'Jarda',
        symbol: 'yd',
        toBase: (v) => v * 0.9144,
        fromBase: (v) => v / 0.9144,
        description: '1 jarda = 3 pés = 0,9144 m (campos de futebol americano)',
      },
      {
        id: 'mi',
        name: 'Milha Terrestre',
        symbol: 'mi',
        toBase: (v) => v * 1609.344,
        fromBase: (v) => v / 1609.344,
        description: '1 milha = 1,6093 km (estradas nos EUA e Reino Unido)',
      },
      {
        id: 'nmi',
        name: 'Milha Náutica',
        symbol: 'nmi',
        toBase: (v) => v * 1852,
        fromBase: (v) => v / 1852,
        description: '1 milha náutica = 1.852 metros (navegação aérea e marítima)',
      },
    ],
  },
  {
    id: 'mass',
    name: 'Massa & Peso',
    iconName: 'Scale',
    description: 'Quilos, gramas, toneladas, libras e onças.',
    baseUnit: 'g',
    units: [
      {
        id: 't',
        name: 'Tonelada',
        symbol: 't',
        toBase: (v) => v * 1000000,
        fromBase: (v) => v / 1000000,
        description: '1.000 kg (cargas de caminhões e navios)',
      },
      {
        id: 'kg',
        name: 'Quilograma',
        symbol: 'kg',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
        description: 'Unidade base prática do SI',
      },
      {
        id: 'g',
        name: 'Grama',
        symbol: 'g',
        toBase: (v) => v,
        fromBase: (v) => v,
        description: '1/1.000 de kg (culinária e laboratório)',
      },
      {
        id: 'mg',
        name: 'Miligrama',
        symbol: 'mg',
        toBase: (v) => v * 0.001,
        fromBase: (v) => v / 0.001,
        description: '1/1.000 de grama (dosagem de medicamentos)',
      },
      {
        id: 'lb',
        name: 'Libra',
        symbol: 'lb',
        toBase: (v) => v * 453.59237,
        fromBase: (v) => v / 453.59237,
        description: '1 libra = 453,59 g (pesagem nos EUA)',
      },
      {
        id: 'oz',
        name: 'Onça (Avoirdupois)',
        symbol: 'oz',
        toBase: (v) => v * 28.349523,
        fromBase: (v) => v / 28.349523,
        description: '1 onça = 28,35 g',
      },
      {
        id: 'ct',
        name: 'Quilate',
        symbol: 'ct',
        toBase: (v) => v * 0.2,
        fromBase: (v) => v / 0.2,
        description: '1 quilate = 200 mg (gemas e diamantes)',
      },
    ],
  },
  {
    id: 'area',
    name: 'Área & Superfície',
    iconName: 'Square',
    description: 'Metros quadrados, hectares, alqueires e acres.',
    baseUnit: 'm²',
    units: [
      {
        id: 'm2',
        name: 'Metro Quadrado',
        symbol: 'm²',
        toBase: (v) => v,
        fromBase: (v) => v,
        description: 'Área de um quadrado de 1m x 1m',
      },
      {
        id: 'cm2',
        name: 'Centímetro Quadrado',
        symbol: 'cm²',
        toBase: (v) => v * 0.0001,
        fromBase: (v) => v / 0.0001,
        description: '1 m² = 10.000 cm²',
      },
      {
        id: 'km2',
        name: 'Quilômetro Quadrado',
        symbol: 'km²',
        toBase: (v) => v * 1000000,
        fromBase: (v) => v / 1000000,
        description: '1 km² = 1.000.000 m² (extensão de cidades e países)',
      },
      {
        id: 'ha',
        name: 'Hectare',
        symbol: 'ha',
        toBase: (v) => v * 10000,
        fromBase: (v) => v / 10000,
        description: '1 hectare = 10.000 m² (fazendas e propriedades rurais)',
      },
      {
        id: 'alq-sp',
        name: 'Alqueire Paulista',
        symbol: 'alq',
        toBase: (v) => v * 24200,
        fromBase: (v) => v / 24200,
        description: '1 alqueire paulista = 24.200 m² = 2,42 ha',
      },
      {
        id: 'ac',
        name: 'Acre',
        symbol: 'ac',
        toBase: (v) => v * 4046.856,
        fromBase: (v) => v / 4046.856,
        description: '1 acre = 4.046,86 m² (padrão anglo-saxão)',
      },
      {
        id: 'ft2',
        name: 'Pé Quadrado',
        symbol: 'sq ft',
        toBase: (v) => v * 0.092903,
        fromBase: (v) => v / 0.092903,
        description: '1 sq ft = 0,0929 m² (mercado imobiliário internacional)',
      },
    ],
  },
  {
    id: 'volume',
    name: 'Volume & Capacidade',
    iconName: 'Droplet',
    description: 'Litros, mililitros, metros cúbicos, galões e xícaras.',
    baseUnit: 'L',
    units: [
      {
        id: 'l',
        name: 'Litro',
        symbol: 'L',
        toBase: (v) => v,
        fromBase: (v) => v,
        description: '1 L = 1 decímetro cúbico (dm³)',
      },
      {
        id: 'ml',
        name: 'Mililitro',
        symbol: 'mL',
        toBase: (v) => v * 0.001,
        fromBase: (v) => v / 0.001,
        description: '1 mL = 1 cm³ = 1 cc',
      },
      {
        id: 'm3',
        name: 'Metro Cúbico',
        symbol: 'm³',
        toBase: (v) => v * 1000,
        fromBase: (v) => v / 1000,
        description: '1 m³ = 1.000 Litros (caixas d\'água e piscinas)',
      },
      {
        id: 'gal-us',
        name: 'Galão Americano',
        symbol: 'gal (US)',
        toBase: (v) => v * 3.78541,
        fromBase: (v) => v / 3.78541,
        description: '1 galão líquido US = 3,7854 Litros',
      },
      {
        id: 'cup',
        name: 'Xícara Culinária',
        symbol: 'xícara',
        toBase: (v) => v * 0.24,
        fromBase: (v) => v / 0.24,
        description: 'Padrão culinário métrico = 240 mL',
      },
      {
        id: 'tbsp',
        name: 'Colher de Sopa',
        symbol: 'c. sopa',
        toBase: (v) => v * 0.015,
        fromBase: (v) => v / 0.015,
        description: '1 colher de sopa = 15 mL',
      },
      {
        id: 'tsp',
        name: 'Colher de Chá',
        symbol: 'c. chá',
        toBase: (v) => v * 0.005,
        fromBase: (v) => v / 0.005,
        description: '1 colher de chá = 5 mL',
      },
      {
        id: 'floz',
        name: 'Onça Fluida US',
        symbol: 'fl oz',
        toBase: (v) => v * 0.0295735,
        fromBase: (v) => v / 0.0295735,
        description: '1 fl oz = 29,57 mL',
      },
    ],
  },
  {
    id: 'temperature',
    name: 'Temperatura',
    iconName: 'Thermometer',
    description: 'Celsius (°C), Fahrenheit (°F) e Kelvin (K).',
    baseUnit: '°C',
    units: [
      {
        id: 'c',
        name: 'Graus Celsius',
        symbol: '°C',
        toBase: (v) => v,
        fromBase: (v) => v,
        description: 'Ponto de fusão do gelo = 0°C, ebulição da água = 100°C',
      },
      {
        id: 'f',
        name: 'Graus Fahrenheit',
        symbol: '°F',
        toBase: (v) => ((v - 32) * 5) / 9,
        fromBase: (v) => (v * 9) / 5 + 32,
        description: 'Água congela em 32°F e ferve em 212°F',
      },
      {
        id: 'k',
        name: 'Kelvin (Zero Absoluto)',
        symbol: 'K',
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
        description: '0 K = -273,15°C (cessa todo o movimento atômico)',
      },
    ],
  },
  {
    id: 'speed',
    name: 'Velocidade',
    iconName: 'Gauge',
    description: 'km/h, m/s, mph e nós marítimos.',
    baseUnit: 'm/s',
    units: [
      {
        id: 'kmh',
        name: 'Quilômetros por Hora',
        symbol: 'km/h',
        toBase: (v) => v / 3.6,
        fromBase: (v) => v * 3.6,
        description: 'Padrão nos velocímetros do Brasil e Europa',
      },
      {
        id: 'ms',
        name: 'Metros por Segundo',
        symbol: 'm/s',
        toBase: (v) => v,
        fromBase: (v) => v,
        description: 'Unidade oficial do Sistema Internacional (SI)',
      },
      {
        id: 'mph',
        name: 'Milhas por Hora',
        symbol: 'mph',
        toBase: (v) => v * 0.44704,
        fromBase: (v) => v / 0.44704,
        description: '1 mph = 1,609 km/h (velocidade nos EUA e Reino Unido)',
      },
      {
        id: 'knot',
        name: 'Nó (Náutico)',
        symbol: 'knots',
        toBase: (v) => (v * 1852) / 3600,
        fromBase: (v) => (v * 3600) / 1852,
        description: '1 nó = 1 milha náutica por hora = 1,852 km/h',
      },
    ],
  },
  {
    id: 'time',
    name: 'Tempo & Duração',
    iconName: 'Clock',
    description: 'Segundos, minutos, horas, dias e semanas.',
    baseUnit: 's',
    units: [
      {
        id: 'ms',
        name: 'Milissegundo',
        symbol: 'ms',
        toBase: (v) => v * 0.001,
        fromBase: (v) => v / 0.001,
        description: '1/1.000 de segundo (latência de internet e computação)',
      },
      {
        id: 's',
        name: 'Segundo',
        symbol: 's',
        toBase: (v) => v,
        fromBase: (v) => v,
        description: 'Unidade fundamental de tempo do SI',
      },
      {
        id: 'min',
        name: 'Minuto',
        symbol: 'min',
        toBase: (v) => v * 60,
        fromBase: (v) => v / 60,
        description: '1 min = 60 segundos',
      },
      {
        id: 'h',
        name: 'Hora',
        symbol: 'h',
        toBase: (v) => v * 3600,
        fromBase: (v) => v / 3600,
        description: '1 hora = 60 minutos = 3.600 segundos',
      },
      {
        id: 'd',
        name: 'Dia',
        symbol: 'd',
        toBase: (v) => v * 86400,
        fromBase: (v) => v / 86400,
        description: '1 dia solar médio = 24 horas = 86.400 segundos',
      },
      {
        id: 'sem',
        name: 'Semana',
        symbol: 'sem',
        toBase: (v) => v * 604800,
        fromBase: (v) => v / 604800,
        description: '1 semana = 7 dias = 168 horas',
      },
    ],
  },
  {
    id: 'digital',
    name: 'Armazenamento Digital',
    iconName: 'HardDrive',
    description: 'Bytes, Kilobytes, Megabytes, Gigabytes e Terabytes.',
    baseUnit: 'B',
    units: [
      {
        id: 'b',
        name: 'Byte',
        symbol: 'B',
        toBase: (v) => v,
        fromBase: (v) => v,
        description: '8 bits (armazena 1 caractere de texto ASCII)',
      },
      {
        id: 'kb',
        name: 'Kilobyte',
        symbol: 'KB',
        toBase: (v) => v * 1024,
        fromBase: (v) => v / 1024,
        description: '1 KB = 1.024 Bytes',
      },
      {
        id: 'mb',
        name: 'Megabyte',
        symbol: 'MB',
        toBase: (v) => v * Math.pow(1024, 2),
        fromBase: (v) => v / Math.pow(1024, 2),
        description: '1 MB = 1.024 KB (tamanho médio de uma foto ou música MP3)',
      },
      {
        id: 'gb',
        name: 'Gigabyte',
        symbol: 'GB',
        toBase: (v) => v * Math.pow(1024, 3),
        fromBase: (v) => v / Math.pow(1024, 3),
        description: '1 GB = 1.024 MB (capacidade de pendrives e memória RAM)',
      },
      {
        id: 'tb',
        name: 'Terabyte',
        symbol: 'TB',
        toBase: (v) => v * Math.pow(1024, 4),
        fromBase: (v) => v / Math.pow(1024, 4),
        description: '1 TB = 1.024 GB (discos rígidos HD e SSDs modernos)',
      },
    ],
  },
];

export function getCategoryById(catId: UnitCategoryType): UnitCategoryConfig {
  return UNIT_CATEGORIES.find((c) => c.id === catId) || UNIT_CATEGORIES[0];
}

export function convertUnits(
  val: number,
  catId: UnitCategoryType,
  fromUnitId: string,
  toUnitId: string
): {
  result: number;
  formattedResult: string;
  formulaDescription: string;
  pythonSnippet: string;
} {
  const cat = getCategoryById(catId);
  const fromUnit = cat.units.find((u) => u.id === fromUnitId) || cat.units[0];
  const toUnit = cat.units.find((u) => u.id === toUnitId) || cat.units[1];

  const baseVal = fromUnit.toBase(val);
  const converted = toUnit.fromBase(baseVal);

  const cleanNum = parseFloat(converted.toFixed(6));
  const formattedResult = cleanNum.toLocaleString('pt-BR', { maximumFractionDigits: 6 });

  let formulaDescription = '';
  let pythonSnippet = '';

  if (catId === 'temperature') {
    if (fromUnitId === 'c' && toUnitId === 'f') {
      formulaDescription = `( ${val}°C × 9/5 ) + 32 = ${formattedResult}°F`;
      pythonSnippet = `temp_c = ${val}\ntemp_f = (temp_c * 9/5) + 32\nprint(f"{temp_f:.2f}°F")`;
    } else if (fromUnitId === 'f' && toUnitId === 'c') {
      formulaDescription = `( ${val}°F - 32 ) × 5/9 = ${formattedResult}°C`;
      pythonSnippet = `temp_f = ${val}\ntemp_c = (temp_f - 32) * 5/9\nprint(f"{temp_c:.2f}°C")`;
    } else if (fromUnitId === 'c' && toUnitId === 'k') {
      formulaDescription = `${val}°C + 273.15 = ${formattedResult} K`;
      pythonSnippet = `temp_c = ${val}\ntemp_k = temp_c + 273.15\nprint(f"{temp_k:.2f} K")`;
    } else if (fromUnitId === 'k' && toUnitId === 'c') {
      formulaDescription = `${val} K - 273.15 = ${formattedResult}°C`;
      pythonSnippet = `temp_k = ${val}\ntemp_c = temp_k - 273.15\nprint(f"{temp_c:.2f}°C")`;
    } else {
      formulaDescription = `Conversão direta de temperatura entre ${fromUnit.name} e ${toUnit.name}`;
      pythonSnippet = `# Conversão de temperatura:\nvalor_base = ${baseVal.toFixed(4)}\nresultado = ${converted.toFixed(4)}`;
    }
  } else {
    // Multiplicative factor
    const ratio = toUnit.fromBase(fromUnit.toBase(1));
    formulaDescription = `${val} ${fromUnit.symbol} × ${ratio.toLocaleString('pt-BR', { maximumFractionDigits: 8 })} = ${formattedResult} ${toUnit.symbol}`;
    pythonSnippet = `# Conversão de ${cat.name} em Python:\nvalor_origem = ${val}  # em ${fromUnit.symbol}\n# 1. Converte para unidade base (${cat.baseUnit}):\nvalor_base = ${baseVal.toFixed(6)}\n# 2. Converte para unidade destino (${toUnit.symbol}):\nresultado = ${converted.toFixed(6)}\nprint(f"Resultado: {resultado:.4f} ${toUnit.symbol}")`;
  }

  return {
    result: cleanNum,
    formattedResult,
    formulaDescription,
    pythonSnippet,
  };
}

export function getAllConversionsForCategory(
  val: number,
  catId: UnitCategoryType,
  fromUnitId: string
): Array<{
  unit: UnitDefinition;
  value: number;
  formatted: string;
}> {
  const cat = getCategoryById(catId);
  const fromUnit = cat.units.find((u) => u.id === fromUnitId) || cat.units[0];
  const baseVal = fromUnit.toBase(val);

  return cat.units.map((targetUnit) => {
    const converted = targetUnit.fromBase(baseVal);
    const cleanNum = parseFloat(converted.toFixed(6));
    return {
      unit: targetUnit,
      value: cleanNum,
      formatted: cleanNum.toLocaleString('pt-BR', { maximumFractionDigits: 6 }),
    };
  });
}
