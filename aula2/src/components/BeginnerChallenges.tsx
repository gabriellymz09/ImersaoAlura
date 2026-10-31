import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
  id: number;
  question: string;
  options: { label: string; correct: boolean; explanation: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Qual símbolo em Python é usado para realizar a multiplicação?',
    options: [
      {
        label: 'x ou X (letra x)',
        correct: false,
        explanation: 'No Python, a letra "x" é tratada como nome de variável, não como operador de multiplicação.',
      },
      {
        label: '* (asterisco)',
        correct: true,
        explanation: 'Correto! Em quase todas as linguagens de programação, o asterisco (*) é o operador oficial de multiplicação.',
      },
      {
        label: '· (ponto flutuante)',
        correct: false,
        explanation: 'O ponto no Python é usado para casas decimais (ex: 3.14) ou para acessar métodos de objetos.',
      },
    ],
  },
  {
    id: 2,
    question: 'Por que precisamos usar float(input()) em vez de apenas input()?',
    options: [
      {
        label: 'Porque o Python só aceita números se tiverem letras juntas.',
        correct: false,
        explanation: 'Incorreto. Na verdade queremos apenas números puros.',
      },
      {
        label: 'Porque o input() sempre lê dados como texto (str). Sem converter, "5" + "5" viraria "55"!',
        correct: true,
        explanation: 'Exato! O input() retorna texto (string). A função float() transforma o texto em um número decimal calculável.',
      },
      {
        label: 'Porque sem float() o computador desliga sozinho.',
        correct: false,
        explanation: 'O computador não desliga, mas causaria erro matemático de concatenação de strings.',
      },
    ],
  },
  {
    id: 3,
    question: 'O que o Python faz quando você executa um cálculo com divisão por zero (ex: 10 / 0)?',
    options: [
      {
        label: 'Dispara a exceção ZeroDivisionError e interrompe o programa se não estiver protegido.',
        correct: true,
        explanation: 'Perfeito! É por isso que colocamos uma condicional if num2 == 0 para proteger o usuário.',
      },
      {
        label: 'Retorna automaticamente o número zero (0).',
        correct: false,
        explanation: 'Não, matematicamente a divisão por zero é indefinida, logo o Python lança um erro.',
      },
      {
        label: 'Retorna a palavra "Infinito".',
        correct: false,
        explanation: 'No Python padrão, divisões inteiras/floats normais disparam erro, não a constante float("inf").',
      },
    ],
  },
  {
    id: 4,
    question: 'Qual palavra-chave é usada para criar uma função reutilizável em Python?',
    options: [
      {
        label: 'function somar():',
        correct: false,
        explanation: '"function" é usado no JavaScript. No Python usamos "def"!',
      },
      {
        label: 'def somar(a, b):',
        correct: true,
        explanation: 'Excelente! "def" vem de "define". É assim que declaramos funções limpas e modulares.',
      },
      {
        label: 'make somar():',
        correct: false,
        explanation: '"make" não é uma palavra-chave reservada do Python.',
      },
    ],
  },
  {
    id: 5,
    question: 'Em uma planta arquitetônica desenhada na escala 1:50, uma parede real de 5 metros medirá quantos centímetros no papel?',
    options: [
      {
        label: '10 cm',
        correct: true,
        explanation: 'Exato! 5 metros = 500 cm. Dividindo por 50 (denominador da escala), temos 500 / 50 = 10 cm no papel.',
      },
      {
        label: '25 cm',
        correct: false,
        explanation: 'Incorreto. 25 cm corresponderia a uma escala de 1:20.',
      },
      {
        label: '50 cm',
        correct: false,
        explanation: 'Incorreto. 50 cm corresponderia a uma escala de 1:10.',
      },
    ],
  },
  {
    id: 6,
    question: 'Qual operador em Python calcula o RESTO de uma divisão (muito usado no método Euclidiano da demonstração de contas)?',
    options: [
      {
        label: '% (operador módulo)',
        correct: true,
        explanation: 'Correto! O operador % calcula o resto exato da divisão inteira. Ex: 17 % 5 resulta em 2.',
      },
      {
        label: '// (divisão inteira)',
        correct: false,
        explanation: '// calcula o quociente inteiro (quantas vezes cabe), não o resto.',
      },
      {
        label: '# (cerquilha/hashtag)',
        correct: false,
        explanation: 'O símbolo # é usado para comentários no Python.',
      },
    ],
  },
];

export const BeginnerChallenges: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleFinish = () => {
    setSubmitted(true);
    // Check if all correct
    let allCorrect = true;
    QUESTIONS.forEach((q) => {
      const selected = selectedAnswers[q.id];
      if (selected === undefined || !q.options[selected].correct) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#f472b6', '#ec4899', '#f43f5e', '#ffffff', '#fb7185'],
        });
      } catch {
        // Fallback
      }
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isComplete = answeredCount === QUESTIONS.length;

  const correctCount = QUESTIONS.reduce((acc, q) => {
    const sel = selectedAnswers[q.id];
    if (sel !== undefined && q.options[sel].correct) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <div className="bg-slate-900/90 border border-pink-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-pink-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-500/30">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Desafios Práticos de Fixação
            </h2>
            <p className="text-xs text-slate-400">
              Teste seus conhecimentos sobre o código da calculadora Python
            </p>
          </div>
        </div>

        {submitted && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-pink-200 bg-pink-900/40 hover:bg-pink-800/60 border border-pink-500/30 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Tentar Novamente</span>
          </button>
        )}
      </div>

      {/* Progress & Score */}
      <div className="flex items-center justify-between text-xs text-slate-300">
        <span>
          Respondidas: <strong className="text-pink-400">{answeredCount}</strong> de {QUESTIONS.length}
        </span>
        {submitted && (
          <span className="font-semibold text-pink-300">
            Pontuação: {correctCount} / {QUESTIONS.length}{' '}
            {correctCount === QUESTIONS.length ? '🎉 Perfeito!' : '💪 Bom esforço!'}
          </span>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => {
          const selectedIdx = selectedAnswers[q.id];
          const hasSelected = selectedIdx !== undefined;

          return (
            <div
              key={q.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-pink-500/20 space-y-3"
            >
              <div className="flex items-start gap-2.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-semibold text-white leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2 pl-7">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = selectedIdx === optIdx;
                  let btnStyle = 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-pink-500/40';

                  if (isThisSelected) {
                    btnStyle = 'bg-pink-950/70 border-pink-500 text-pink-100 font-medium';
                  }

                  if (submitted) {
                    if (opt.correct) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-medium';
                    } else if (isThisSelected && !opt.correct) {
                      btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={submitted}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{opt.label}</span>
                      {submitted && opt.correct && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {submitted && isThisSelected && !opt.correct && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submit */}
              {submitted && hasSelected && (
                <div className="mt-2 pl-7 text-xs text-slate-400 italic bg-pink-950/20 p-2.5 rounded-lg border border-pink-500/10">
                  {q.options[selectedIdx].explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit / Reset Action */}
      {!submitted ? (
        <button
          onClick={handleFinish}
          disabled={!isComplete}
          className={`w-full py-3 rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 ${
            isComplete
              ? 'bg-gradient-to-r from-pink-600 via-rose-500 to-pink-500 text-white hover:from-pink-500 hover:to-rose-400 shadow-pink-600/30'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Verificar Respostas</span>
        </button>
      ) : (
        <div className="p-4 rounded-xl bg-pink-950/40 border border-pink-500/30 text-center space-y-2">
          <p className="text-sm font-bold text-pink-200">
            {correctCount === QUESTIONS.length
              ? '🌟 Parabéns! Você já domina os fundamentos da Calculadora em Python!'
              : '👍 Muito bom! Revise as explicações acima e tente novamente para gabaritar!'}
          </p>
        </div>
      )}
    </div>
  );
};
