import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Ruler,
  Scale,
  Square,
  Droplet,
  Thermometer,
  Gauge,
  Clock,
  HardDrive,
  ArrowRightLeft,
  Copy,
  Check,
  Send,
  Eye,
  Sparkles,
  Info
} from 'lucide-react';
import { UnitCategoryType, PinkTheme } from '../types/calculator';
import {
  UNIT_CATEGORIES,
  getCategoryById,
  convertUnits,
  getAllConversionsForCategory
} from '../utils/units';
import { playKeySound } from '../utils/audio';

interface UnitConverterProps {
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

export const UnitConverter: React.FC<UnitConverterProps> = ({
  theme = 'rose-gold',
  onSendToCalculator,
  onOpenBreakdown,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<UnitCategoryType>('length');
  const [inputValue, setInputValue] = useState<string>('10');
  const [fromUnitId, setFromUnitId] = useState<string>('m');
  const [toUnitId, setToUnitId] = useState<string>('cm');

  const [copied, setCopied] = useState<boolean>(false);
  const [sentSuccess, setSentSuccess] = useState<boolean>(false);

  const currentCategory = useMemo(() => getCategoryById(selectedCategory), [selectedCategory]);

  // When changing category, set sensible defaults
  const handleCategoryChange = (catId: UnitCategoryType) => {
    setSelectedCategory(catId);
    const cat = getCategoryById(catId);
    setFromUnitId(cat.units[0].id);
    setToUnitId(cat.units[1]?.id || cat.units[0].id);
  };

  // Swap From / To units
  const handleSwapUnits = () => {
    playKeySound('op', true);
    setFromUnitId(toUnitId);
    setToUnitId(fromUnitId);
  };

  const parsedVal = parseFloat(inputValue) || 0;

  // Primary conversion calculation
  const conversion = useMemo(() => {
    return convertUnits(parsedVal, selectedCategory, fromUnitId, toUnitId);
  }, [parsedVal, selectedCategory, fromUnitId, toUnitId]);

  // Instant 1-to-many matrix
  const allConversions = useMemo(() => {
    return getAllConversionsForCategory(parsedVal, selectedCategory, fromUnitId);
  }, [parsedVal, selectedCategory, fromUnitId]);

  const fromUnitObj = currentCategory.units.find((u) => u.id === fromUnitId) || currentCategory.units[0];
  const toUnitObj = currentCategory.units.find((u) => u.id === toUnitId) || currentCategory.units[1];

  const handleCopy = () => {
    navigator.clipboard.writeText(String(conversion.result));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToCalc = () => {
    if (!onSendToCalculator) return;
    onSendToCalculator(String(conversion.result));
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 2000);
  };

  const handleOpenBreakdown = () => {
    if (!onOpenBreakdown) return;

    onOpenBreakdown({
      title: `Demonstração de Alteração de Medida: ${currentCategory.name}`,
      expression: `${parsedVal} ${fromUnitObj.symbol} ➔ ${toUnitObj.symbol}`,
      result: `${conversion.formattedResult} ${toUnitObj.symbol}`,
      steps: [
        {
          stepNumber: 1,
          title: 'Identificação da Grandeza e Unidade de Origem',
          description: `Valor inicial a converter: ${parsedVal} ${fromUnitObj.name} (${fromUnitObj.symbol}). Grandeza: ${currentCategory.name}.`,
          expression: `Origem: ${parsedVal} ${fromUnitObj.symbol}`,
        },
        {
          stepNumber: 2,
          title: 'Conversão para a Unidade Fundamental (Base SI)',
          description: `No sistema métrico e computacional, convertemos primeiro para a unidade base (${currentCategory.baseUnit}):`,
          expression: `Valor Base = ${fromUnitObj.toBase(parsedVal).toFixed(6)} ${currentCategory.baseUnit}`,
        },
        {
          stepNumber: 3,
          title: 'Aplicação da Taxa para a Unidade de Destino',
          description: `Aplicamos o fator inverso para a unidade final ${toUnitObj.name} (${toUnitObj.symbol}):`,
          expression: conversion.formulaDescription,
        },
      ],
      pythonCode: conversion.pythonSnippet,
    });
  };

  // Map category icons
  const renderCategoryIcon = (id: UnitCategoryType) => {
    switch (id) {
      case 'length':
        return <Ruler className="w-4 h-4" />;
      case 'mass':
        return <Scale className="w-4 h-4" />;
      case 'area':
        return <Square className="w-4 h-4" />;
      case 'volume':
        return <Droplet className="w-4 h-4" />;
      case 'temperature':
        return <Thermometer className="w-4 h-4" />;
      case 'speed':
        return <Gauge className="w-4 h-4" />;
      case 'time':
        return <Clock className="w-4 h-4" />;
      case 'digital':
        return <HardDrive className="w-4 h-4" />;
      default:
        return <Ruler className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Category Pills Header */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 border border-pink-500/25 overflow-x-auto shadow-md">
        {UNIT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-pink-400'}>
                {renderCategoryIcon(cat.id)}
              </span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Direct Converter (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/70 border border-pink-500/25 space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-pink-500/15">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Conversor de {currentCategory.name}
              </span>
              <span className="text-[11px] text-slate-400">
                Unidade Base: <code className="text-pink-300 font-bold">{currentCategory.baseUnit}</code>
              </span>
            </div>

            {/* Input Value & Source Unit */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">De (Valor e Unidade Origem):</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="any"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-950/90 border border-pink-500/30 text-white font-mono text-base font-bold focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="0"
                />
                <select
                  value={fromUnitId}
                  onChange={(e) => setFromUnitId(e.target.value)}
                  className="w-48 px-3 py-3 rounded-xl bg-slate-950/90 border border-pink-500/30 text-pink-300 text-xs font-semibold focus:outline-none"
                >
                  {currentCategory.units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap Button Divider */}
            <div className="flex items-center justify-center my-1">
              <button
                onClick={handleSwapUnits}
                title="Inverter unidades (Origem ⇄ Destino)"
                className="p-2 rounded-xl bg-pink-950/50 hover:bg-pink-900/60 border border-pink-500/30 text-pink-300 hover:text-white transition-all active:scale-95 flex items-center gap-1.5 text-xs font-medium"
              >
                <ArrowRightLeft className="w-4 h-4 text-pink-400" />
                <span>Inverter Unidades</span>
              </button>
            </div>

            {/* Target Unit */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Para (Unidade Destino):</label>
              <select
                value={toUnitId}
                onChange={(e) => setToUnitId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950/90 border border-pink-500/30 text-pink-200 text-xs font-semibold focus:outline-none"
              >
                {currentCategory.units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.symbol}) — {u.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Formula Card */}
            <div className="p-3 rounded-xl bg-pink-950/30 border border-pink-500/15 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 space-y-0.5">
                <span className="font-semibold text-pink-300 block">Fórmula de Conversão:</span>
                <span className="font-mono text-[11px] text-pink-200">{conversion.formulaDescription}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Large Converted Output & Actions (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl p-5 bg-gradient-to-b from-[#25102a] to-[#160a1a] border border-pink-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" /> Medida Alterada
              </span>
              <button
                onClick={handleCopy}
                className="text-xs text-pink-300 hover:text-white flex items-center gap-1"
                title="Copiar resultado"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copiado!' : 'Copiar'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-pink-500/20 text-center space-y-1">
              <div className="text-xs text-pink-300/70 font-mono">
                {parsedVal} {fromUnitObj.symbol} equivale a:
              </div>
              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-transparent bg-gradient-to-r from-pink-300 via-rose-200 to-pink-400 bg-clip-text">
                {conversion.formattedResult} <span className="text-xl sm:text-2xl text-pink-400">{toUnitObj.symbol}</span>
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                {toUnitObj.name}
              </div>
            </div>

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
                onClick={handleOpenBreakdown}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-xs font-bold text-white shadow-md shadow-pink-600/30 transition-all active:scale-95"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Demonstrar Conta</span>
              </button>
            </div>
          </div>

          {/* Instant 1-to-Many Multi-Unit Matrix */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-pink-500/25 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-pink-300">
              <span>Equivalências Rápidas Simultâneas</span>
              <span className="text-[10px] text-slate-400">Todas as unidades</span>
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {allConversions.map((conv) => {
                const isTarget = conv.unit.id === toUnitId;
                return (
                  <div
                    key={conv.unit.id}
                    onClick={() => setToUnitId(conv.unit.id)}
                    className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-all ${
                      isTarget
                        ? 'bg-pink-600/30 border border-pink-400 text-white font-semibold'
                        : 'bg-slate-950/50 hover:bg-slate-950 border border-pink-500/10 text-slate-300'
                    }`}
                  >
                    <span className="text-slate-400">
                      {conv.unit.name} ({conv.unit.symbol})
                    </span>
                    <span className="font-mono font-bold text-pink-300">
                      {conv.formatted} {conv.unit.symbol}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

