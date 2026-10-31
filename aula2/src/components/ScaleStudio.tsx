import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Ruler,
  Compass,
  ArrowRightLeft,
  Sparkles,
  BookmarkPlus,
  Trash2,
  Copy,
  Check,
  Send,
  HelpCircle,
  Eye,
  Info
} from 'lucide-react';
import {
  ScalePreset,
  ScaleDirection,
  ScaleCalculationResult,
  PinkTheme
} from '../types/calculator';
import {
  DEFAULT_SCALE_PRESETS,
  LENGTH_UNIT_TO_METERS,
  calculateDrawingMeasure,
  calculateRealMeasure,
  discoverScale,
  formatScaleRatio
} from '../utils/scales';
import { playKeySound } from '../utils/audio';

interface ScaleStudioProps {
  theme?: PinkTheme;
  onSendToCalculator?: (val: string) => void;
  onOpenBreakdown?: (data: {
    title: string;
    expression: string;
    result: string | number;
    steps: Array<{ stepNumber: number; title: string; description: string; expression: string }>;
    pythonCode: string;
  }) => void;
}

export const ScaleStudio: React.FC<ScaleStudioProps> = ({
  theme = 'rose-gold',
  onSendToCalculator,
  onOpenBreakdown,
}) => {
  const [direction, setDirection] = useState<ScaleDirection>('real-to-drawing');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [presets, setPresets] = useState<ScalePreset[]>(DEFAULT_SCALE_PRESETS);

  // Active scale ratio
  const [numerator, setNumerator] = useState<number>(1);
  const [denominator, setDenominator] = useState<number>(50);

  // Inputs
  const [realInput, setRealInput] = useState<string>('5');
  const [realUnit, setRealUnit] = useState<string>('m');

  const [drawingInput, setDrawingInput] = useState<string>('10');
  const [drawingUnit, setDrawingUnit] = useState<string>('cm');

  // Custom scale creation modal / drawer
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customScaleName, setCustomScaleName] = useState<string>('');
  const [customNum, setCustomNum] = useState<string>('1');
  const [customDen, setCustomDen] = useState<string>('33');
  const [customDesc, setCustomDesc] = useState<string>('');

  const [copied, setCopied] = useState<boolean>(false);
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);

  // Handle Preset Selection
  const handleSelectPreset = (preset: ScalePreset) => {
    playKeySound('num', true);
    setNumerator(preset.numerator);
    setDenominator(preset.denominator);
  };

  // Perform Calculation
  const result: ScaleCalculationResult = useMemo(() => {
    const realNum = parseFloat(realInput) || 0;
    const drawingNum = parseFloat(drawingInput) || 0;

    if (direction === 'real-to-drawing') {
      return calculateDrawingMeasure(realNum, realUnit, numerator, denominator, drawingUnit);
    } else if (direction === 'drawing-to-real') {
      return calculateRealMeasure(drawingNum, drawingUnit, numerator, denominator, realUnit);
    } else {
      return discoverScale(realNum, realUnit, drawingNum, drawingUnit);
    }
  }, [direction, realInput, realUnit, drawingInput, drawingUnit, numerator, denominator]);

  // Save Custom Scale to Presets
  const handleSaveCustomScale = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Math.max(1, parseInt(customNum) || 1);
    const den = Math.max(1, parseInt(customDen) || 1);

    const newPreset: ScalePreset = {
      id: `custom-${Date.now()}`,
      name: customScaleName.trim() || `${num}:${den} (Personalizada)`,
      numerator: num,
      denominator: den,
      category: 'custom',
      description: customDesc.trim() || `Escala customizada criada pelo usuário: ${num}:${den}`,
    };

    setPresets((prev) => [newPreset, ...prev]);
    setNumerator(num);
    setDenominator(den);
    setShowCustomModal(false);
    setCustomScaleName('');
    playKeySound('equals', true);
  };

  const handleDeletePreset = (id: string) => {
    setPresets((prev) => prev.filter((p) => p.id !== id));
  };

  const handleCopyResult = () => {
    const textToCopy =
      direction === 'real-to-drawing'
        ? `${result.drawingValue} ${result.drawingUnit}`
        : direction === 'drawing-to-real'
        ? `${result.realValue} ${result.realUnit}`
        : result.ratioStr;

    navigator.clipboard.writeText(String(textToCopy));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToCalc = () => {
    if (!onSendToCalculator) return;
    const valToSend =
      direction === 'real-to-drawing'
        ? String(result.drawingValue)
        : direction === 'drawing-to-real'
        ? String(result.realValue)
        : String(denominator);

    onSendToCalculator(valToSend);
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 2000);
  };

  const handleViewBreakdown = () => {
    if (!onOpenBreakdown) return;

    if (direction === 'real-to-drawing') {
      onOpenBreakdown({
        title: `Demonstração de Escala: Real (${result.realValue}${result.realUnit}) ➔ Papel na Escala ${result.ratioStr}`,
        expression: `${result.realValue} ${result.realUnit} × (${numerator} / ${denominator})`,
        result: `${result.drawingValue} ${result.drawingUnit}`,
        steps: [
          {
            stepNumber: 1,
            title: 'Conversão da Medida Real para a Unidade Padrão (Metros)',
            description: `Convertemos ${result.realValue} ${result.realUnit} para metros multiplicando pelo fator da unidade (${LENGTH_UNIT_TO_METERS[realUnit]?.factor}):`,
            expression: `${result.realValue} ${result.realUnit} = ${(result.realValue * LENGTH_UNIT_TO_METERS[realUnit]?.factor).toFixed(4)} m`,
          },
          {
            stepNumber: 2,
            title: 'Montagem da Proporção (Regra de Três em Cruz)',
            description: `Pela definição de escala: Escala = (Medida no Desenho d) / (Medida Real R) = ${numerator}/${denominator}`,
            expression: `d / R = ${numerator} / ${denominator}  ⇒  d = R × (${numerator} / ${denominator})`,
          },
          {
            stepNumber: 3,
            title: 'Aplicação do Fator e Conversão para Unidade Final',
            description: `Multiplicamos a medida real pelo fator de escala e convertemos para ${result.drawingUnit}:`,
            expression: `Resultado Final = ${result.drawingValue} ${result.drawingUnit}`,
          },
        ],
        pythonCode: result.pythonSnippet,
      });
    } else if (direction === 'drawing-to-real') {
      onOpenBreakdown({
        title: `Demonstração de Escala: Papel (${result.drawingValue}${result.drawingUnit}) ➔ Vida Real na Escala ${result.ratioStr}`,
        expression: `${result.drawingValue} ${result.drawingUnit} × (${denominator} / ${numerator})`,
        result: `${result.realValue} ${result.realUnit}`,
        steps: [
          {
            stepNumber: 1,
            title: 'Identificação da Medida no Desenho',
            description: `Medida aferida no papel com régua ou escalímetro: ${result.drawingValue} ${result.drawingUnit}.`,
            expression: `d = ${result.drawingValue} ${result.drawingUnit}`,
          },
          {
            stepNumber: 2,
            title: 'Inversão da Razão de Escala',
            description: `Para voltar do desenho reduzido para o tamanho real, multiplicamos pelo denominador da escala (${denominator}):`,
            expression: `R = d × (${denominator} / ${numerator})`,
          },
          {
            stepNumber: 3,
            title: 'Resultado Real no Terreno / Objeto',
            description: `Convertendo para ${result.realUnit}:`,
            expression: `Medida Real R = ${result.realValue} ${result.realUnit}`,
          },
        ],
        pythonCode: result.pythonSnippet,
      });
    } else {
      onOpenBreakdown({
        title: `Criação e Descoberta de Escala Proporcional`,
        expression: `Escala = (${result.drawingValue} ${result.drawingUnit}) / (${result.realValue} ${result.realUnit})`,
        result: result.ratioStr,
        steps: [
          {
            stepNumber: 1,
            title: 'Equalização de Unidades para Metros',
            description: 'Para calcular uma razão adimensional (escala), ambas as medidas precisam estar na mesma unidade fundamental:',
            expression: `Desenho = ${(result.drawingValue * LENGTH_UNIT_TO_METERS[drawingUnit]?.factor).toFixed(4)} m | Real = ${(result.realValue * LENGTH_UNIT_TO_METERS[realUnit]?.factor).toFixed(4)} m`,
          },
          {
            stepNumber: 2,
            title: 'Divisão e Simplificação da Fração',
            description: 'Dividimos o desenho pelo real para encontrar o fator de redução/ampliação:',
            expression: `Razão = Desenho / Real = ${result.factor.toFixed(6)}`,
          },
          {
            stepNumber: 3,
            title: 'Escala Canônica Criada',
            description: 'Formatamos a fração canônica no padrão ABNT (1:N para redução ou N:1 para ampliação):',
            expression: `Escala Canônica = ${result.ratioStr}`,
          },
        ],
        pythonCode: result.pythonSnippet,
      });
    }
  };

  const filteredPresets = useMemo(() => {
    if (selectedCategory === 'all') return presets;
    return presets.filter((p) => p.category === selectedCategory);
  }, [presets, selectedCategory]);

  return (
    <div className="w-full space-y-6">
      {/* Top Banner & Mode Toggle */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/60 via-slate-900/90 to-rose-950/60 border border-pink-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-pink-500/30">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Estúdio de Escalas Arquitetônicas & Modelismo
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold border border-pink-500/30">
                Inovação
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              Calcule reduções 1:N, ampliações N:1, crie escalas personalizadas e veja a régua gráfica animada.
            </p>
          </div>
        </div>

        {/* Direction Switcher (3 Tabs) */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950/80 border border-pink-500/20 text-xs shrink-0">
          <button
            onClick={() => setDirection('real-to-drawing')}
            className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
              direction === 'real-to-drawing'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Real ➔ Desenho
          </button>
          <button
            onClick={() => setDirection('drawing-to-real')}
            className={`px-3 py-1.5 rounded-lg transition-all font-semibold ${
              direction === 'drawing-to-real'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Desenho ➔ Real
          </button>
          <button
            onClick={() => setDirection('find-scale')}
            className={`px-3 py-1.5 rounded-lg transition-all font-semibold flex items-center gap-1 ${
              direction === 'find-scale'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Criador / Descobrir</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Configuration & Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Active Scale Box */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-pink-500/25 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Proporção da Escala Selecionada
              </span>
              <button
                onClick={() => setShowCustomModal(true)}
                className="flex items-center gap-1 text-xs text-pink-300 hover:text-pink-100 bg-pink-950/40 hover:bg-pink-900/50 px-2.5 py-1 rounded-lg border border-pink-500/20 transition-colors"
              >
                <BookmarkPlus className="w-3.5 h-3.5 text-pink-400" />
                <span>Criar Escala Personalizada</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 p-3 rounded-xl bg-slate-950/80 border border-pink-500/20 flex items-center justify-center gap-3 font-mono text-xl font-extrabold text-white">
                <input
                  type="number"
                  min="1"
                  value={numerator}
                  onChange={(e) => setNumerator(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center bg-slate-900/90 border border-pink-500/30 rounded-lg py-1 text-pink-300 focus:outline-none focus:ring-1 focus:ring-pink-400"
                  title="Numerador (tamanho no papel/desenho)"
                />
                <span className="text-pink-400">:</span>
                <input
                  type="number"
                  min="1"
                  value={denominator}
                  onChange={(e) => setDenominator(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-24 text-center bg-slate-900/90 border border-pink-500/30 rounded-lg py-1 text-pink-300 focus:outline-none focus:ring-1 focus:ring-pink-400"
                  title="Denominador (tamanho na vida real)"
                />
              </div>

              <div className="text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-pink-300">
                  {numerator === 1 && denominator > 1
                    ? `Escala de Redução (${formatScaleRatio(numerator, denominator)})`
                    : numerator > 1 && denominator === 1
                    ? `Escala de Ampliação (${formatScaleRatio(numerator, denominator)})`
                    : `Escala (${formatScaleRatio(numerator, denominator)})`}
                </div>
                <div className="text-[11px] text-slate-400">
                  {numerator === 1
                    ? `1 unidade no desenho = ${denominator} unidades no mundo real.`
                    : `${numerator} unidades no desenho = 1 unidade real.`}
                </div>
              </div>
            </div>

            {/* Presets Quick Filters */}
            <div className="pt-2 border-t border-pink-500/15">
              <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-1 text-[11px]">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-pink-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setSelectedCategory('architecture')}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    selectedCategory === 'architecture'
                      ? 'bg-pink-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Arquitetura
                </button>
                <button
                  onClick={() => setSelectedCategory('modeling')}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    selectedCategory === 'modeling'
                      ? 'bg-pink-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Modelismo
                </button>
                <button
                  onClick={() => setSelectedCategory('engineering')}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    selectedCategory === 'engineering'
                      ? 'bg-pink-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Engenharia
                </button>
                <button
                  onClick={() => setSelectedCategory('cartography')}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    selectedCategory === 'cartography'
                      ? 'bg-pink-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Cartografia
                </button>
                <button
                  onClick={() => setSelectedCategory('custom')}
                  className={`px-2 py-0.5 rounded-md transition-colors ${
                    selectedCategory === 'custom'
                      ? 'bg-pink-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Minhas Escalas
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                {filteredPresets.map((preset) => {
                  const isCurrent =
                    preset.numerator === numerator && preset.denominator === denominator;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`text-left p-2 rounded-xl text-xs transition-all border group relative ${
                        isCurrent
                          ? 'bg-pink-600/30 border-pink-400 text-white font-semibold shadow-xs'
                          : 'bg-slate-950/60 border-pink-500/15 text-slate-300 hover:bg-slate-900 hover:border-pink-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-pink-300 font-bold">
                          {formatScaleRatio(preset.numerator, preset.denominator)}
                        </span>
                        {preset.category === 'custom' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePreset(preset.id);
                            }}
                            className="opacity-0 group-hover:opacity-100 text-rose-400 hover:text-rose-200 p-0.5"
                            title="Remover escala salva"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">{preset.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Input Fields depending on Direction */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-pink-500/25 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400 block">
              Entrada de Medidas para o Cálculo
            </span>

            {direction === 'real-to-drawing' && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 flex items-center justify-between">
                    <span>Medida no Mundo Real (Tamanho Físico Real):</span>
                    <span className="text-[11px] text-pink-400">Ex: 12m de um cômodo</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="any"
                      value={realInput}
                      onChange={(e) => setRealInput(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-pink-500/30 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Ex: 5"
                    />
                    <select
                      value={realUnit}
                      onChange={(e) => setRealUnit(e.target.value)}
                      className="px-3 py-2.5 rounded-xl bg-slate-950/90 border border-pink-500/30 text-pink-300 text-xs font-semibold focus:outline-none"
                    >
                      {Object.entries(LENGTH_UNIT_TO_METERS).map(([key, u]) => (
                        <option key={key} value={key}>
                          {u.name} ({u.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300">
                    Converter o Desenho/Papel para qual unidade:
                  </label>
                  <div className="flex items-center gap-2">
                    {['mm', 'cm', 'm', 'in'].map((u) => (
                      <button
                        key={u}
                        onClick={() => setDrawingUnit(u)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          drawingUnit === u
                            ? 'bg-pink-600 text-white border-pink-400 shadow-xs'
                            : 'bg-slate-950/60 text-slate-400 border-pink-500/15 hover:text-white'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {direction === 'drawing-to-real' && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 flex items-center justify-between">
                    <span>Medida no Papel / Desenho / Maquete:</span>
                    <span className="text-[11px] text-pink-400">Ex: 10 cm na régua</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="any"
                      value={drawingInput}
                      onChange={(e) => setDrawingInput(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-pink-500/30 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Ex: 10"
                    />
                    <select
                      value={drawingUnit}
                      onChange={(e) => setDrawingUnit(e.target.value)}
                      className="px-3 py-2.5 rounded-xl bg-slate-950/90 border border-pink-500/30 text-pink-300 text-xs font-semibold focus:outline-none"
                    >
                      {Object.entries(LENGTH_UNIT_TO_METERS).map(([key, u]) => (
                        <option key={key} value={key}>
                          {u.name} ({u.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300">
                    Converter Medida Real no Terreno para:
                  </label>
                  <div className="flex items-center gap-2">
                    {['m', 'km', 'cm', 'ft'].map((u) => (
                      <button
                        key={u}
                        onClick={() => setRealUnit(u)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          realUnit === u
                            ? 'bg-pink-600 text-white border-pink-400 shadow-xs'
                            : 'bg-slate-950/60 text-slate-400 border-pink-500/15 hover:text-white'
                        }`}
                      >
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {direction === 'find-scale' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Medida Real Existente:</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="any"
                      value={realInput}
                      onChange={(e) => setRealInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950/80 border border-pink-500/30 text-white font-mono text-xs focus:outline-none"
                      placeholder="Ex: 15"
                    />
                    <select
                      value={realUnit}
                      onChange={(e) => setRealUnit(e.target.value)}
                      className="px-2 py-2 rounded-xl bg-slate-950/90 border border-pink-500/30 text-pink-300 text-xs font-semibold"
                    >
                      <option value="m">m</option>
                      <option value="km">km</option>
                      <option value="cm">cm</option>
                      <option value="mm">mm</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-300">Espaço no Papel / Maquete:</label>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      step="any"
                      value={drawingInput}
                      onChange={(e) => setDrawingInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-950/80 border border-pink-500/30 text-white font-mono text-xs focus:outline-none"
                      placeholder="Ex: 30"
                    />
                    <select
                      value={drawingUnit}
                      onChange={(e) => setDrawingUnit(e.target.value)}
                      className="px-2 py-2 rounded-xl bg-slate-950/90 border border-pink-500/30 text-pink-300 text-xs font-semibold"
                    >
                      <option value="cm">cm</option>
                      <option value="mm">mm</option>
                      <option value="m">m</option>
                      <option value="in">in</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visual Ruler, Result Card & Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Output Card */}
          <div className="rounded-2xl p-5 bg-gradient-to-b from-[#25102a] to-[#160a1a] border border-pink-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Resultado Calculado
              </span>
              <button
                onClick={handleCopyResult}
                className="text-xs text-pink-300 hover:text-white flex items-center gap-1"
                title="Copiar resultado"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            {/* Huge Output Value */}
            <div className="p-4 rounded-xl bg-black/40 border border-pink-500/20 text-center space-y-1">
              <div className="text-xs text-pink-300/70 font-mono">
                {direction === 'real-to-drawing' && `No papel / maquete (${result.ratioStr}):`}
                {direction === 'drawing-to-real' && `Tamanho na vida real (${result.ratioStr}):`}
                {direction === 'find-scale' && `Escala exata criada:`}
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-pink-400 bg-clip-text">
                {direction === 'real-to-drawing' && `${result.drawingValue} ${result.drawingUnit}`}
                {direction === 'drawing-to-real' && `${result.realValue} ${result.realUnit}`}
                {direction === 'find-scale' && result.ratioStr}
              </div>
              <div className="text-[11px] text-slate-400 font-mono pt-1">
                {result.proportionFormula}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-pink-950/30 p-2.5 rounded-lg border border-pink-500/15">
              {result.explanation}
            </p>

            {/* Quick Actions Strip */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-pink-500/20">
              <button
                onClick={handleSendToCalc}
                disabled={!onSendToCalculator}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-pink-950/60 hover:bg-pink-900/60 border border-pink-500/30 text-xs font-semibold text-pink-200 transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-pink-400" />
                <span>{sentSuccess ? 'Enviado!' : 'Enviar para Calc'}</span>
              </button>

              <button
                onClick={handleViewBreakdown}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-xs font-bold text-white shadow-md shadow-pink-600/30 transition-all active:scale-95"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Demonstrar Conta</span>
              </button>
            </div>
          </div>

          {/* Interactive Dynamic SVG Visual Scale / Dynamic Ruler */}
          <div className="rounded-2xl p-4 bg-slate-900/80 border border-pink-500/25 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-pink-300 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-pink-400" />
                Régua Gráfica de Proporção Interativa
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Escala {result.ratioStr}</span>
            </div>

            {/* SVG Visual Ruler */}
            <div className="w-full bg-[#140818] rounded-xl p-3 border border-pink-500/20 overflow-hidden">
              <svg viewBox="0 0 300 65" className="w-full h-auto">
                {/* Ruler background */}
                <rect x="0" y="10" width="300" height="40" rx="4" fill="#25102b" stroke="#f472b6" strokeWidth="0.8" />
                
                {/* Scale divisions */}
                {Array.from({ length: 11 }).map((_, i) => {
                  const x = 10 + i * 28;
                  const isMajor = i % 5 === 0;
                  const isMid = i % 5 === 2 || i % 5 === 3;
                  const height = isMajor ? 18 : isMid ? 12 : 8;
                  const unitVal = (i * (denominator / 10)).toFixed(0);

                  return (
                    <g key={i}>
                      <line
                        x1={x}
                        y1={10}
                        x2={x}
                        y2={10 + height}
                        stroke={isMajor ? '#f472b6' : '#ec4899'}
                        strokeWidth={isMajor ? '1.5' : '0.8'}
                        strokeOpacity={isMajor ? '1' : '0.6'}
                      />
                      {isMajor && (
                        <text
                          x={x}
                          y={42}
                          fill="#fbcfe8"
                          fontSize="8"
                          fontFamily="monospace"
                          textAnchor="middle"
                          fontWeight="bold"
                        >
                          {i === 0 ? '0' : `${unitVal}${realUnit === 'km' ? 'km' : 'm'}`}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Alternating black/pink bar for architectural scale bar */}
                <rect x="10" y="24" width="70" height="4" fill="#ec4899" />
                <rect x="80" y="24" width="70" height="4" fill="#ffffff" />
                <rect x="150" y="24" width="70" height="4" fill="#ec4899" />
                <rect x="220" y="24" width="70" height="4" fill="#ffffff" />
              </svg>

              <div className="flex items-center justify-between text-[10px] text-pink-300/80 mt-1 font-mono">
                <span>0 m</span>
                <span>Barra Gráfica de Referência ABNT</span>
                <span>{((denominator / 10) * 10).toFixed(0)} {realUnit}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-slate-950/50 p-2 rounded-lg">
              <Info className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span>
                A régua gráfica preserva a proporção exata mesmo se a planta for fotocopiada ou ampliada digitalmente.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Creating Custom Scale */}
      <AnimatePresence>
        {showCustomModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl bg-slate-950 border border-pink-500/40 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-pink-500/20">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BookmarkPlus className="w-5 h-5 text-pink-400" />
                  Criar Nova Escala Personalizada
                </h3>
                <button
                  onClick={() => setShowCustomModal(false)}
                  className="text-slate-400 hover:text-white text-lg p-1"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveCustomScale} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-pink-300">
                    Nome / Identificação da Escala:
                  </label>
                  <input
                    type="text"
                    required
                    value={customScaleName}
                    onChange={(e) => setCustomScaleName(e.target.value)}
                    placeholder="Ex: Escala 1:33 Miniatura Especial"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-pink-500/30 text-white text-xs focus:outline-none focus:ring-1 focus:ring-pink-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-pink-300">
                      Numerador (Desenho):
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={customNum}
                      onChange={(e) => setCustomNum(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-pink-500/30 text-white text-xs font-mono focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-pink-300">
                      Denominador (Real):
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={customDen}
                      onChange={(e) => setCustomDen(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-pink-500/30 text-white text-xs font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-pink-300">
                    Descrição ou Finalidade (Opcional):
                  </label>
                  <input
                    type="text"
                    value={customDesc}
                    onChange={(e) => setCustomDesc(e.target.value)}
                    placeholder="Ex: Usada para peças impressas em 3D de aeromodelos"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-pink-500/30 text-white text-xs focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCustomModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-xs font-bold text-white shadow-md shadow-pink-600/30 transition-all"
                  >
                    Salvar e Ativar Escala
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

