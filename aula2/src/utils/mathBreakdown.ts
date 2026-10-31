import { MathBreakdownData, Operation, ScientificFunction } from '../types/calculator';
import { LENGTH_UNIT_TO_METERS } from './scales';

export function generateBreakdownForOperation(
  op: Operation,
  num1: number,
  num2: number
): MathBreakdownData {
  switch (op) {
    case '+': {
      const result = num1 + num2;
      const isInteger = Number.isInteger(num1) && Number.isInteger(num2);

      const steps = [
        {
          stepNumber: 1,
          title: 'Alinhamento dos Termos',
          description: 'Escrevemos os operandos alinhando as ordens posicionais (unidades sob unidades, dezenas sob dezenas, vírgula sob vírgula).',
          expression: `${num1} + ${num2}`,
        },
        {
          stepNumber: 2,
          title: 'Soma da Direita para a Esquerda',
          description: 'Somamos cada coluna individualmente da menor para a maior ordem posicional. Se a soma de uma coluna for 10 ou mais, reservamos o "vai um" (carry over) para a ordem seguinte.',
          expression: `Soma direta: ${num1} + ${num2} = ${result}`,
        },
        {
          stepNumber: 3,
          title: 'Finalização e Verificação',
          description: 'Obtemos a soma total. Pela propriedade comutativa da adição, a ordem dos fatores não altera a soma.',
          expression: `${num2} + ${num1} = ${result} (Comutatividade verificada)`,
        },
      ];

      return {
        title: 'Demonstração da Adição (Soma)',
        operationSymbol: '+',
        expression: `${num1} + ${num2}`,
        result,
        methodName: 'Algoritmo Tradicional Posicional da Adição',
        steps,
        visualBoard: {
          type: 'vertical-addition',
          rows: [
            `   ${num1.toLocaleString('pt-BR')}`,
            `+  ${num2.toLocaleString('pt-BR')}`,
            `───────`,
            `   ${result.toLocaleString('pt-BR')}`,
          ],
          notes: [
            'Propriedade Comutativa: a + b = b + a',
            'Elemento Neutro: a + 0 = a',
          ],
        },
        mathematicalProperties: [
          'Propriedade Comutativa: 5 + 3 é exatamente igual a 3 + 5.',
          'Propriedade Associativa: (a + b) + c = a + (b + c).',
          'Elemento Neutro: O zero (0) é o elemento neutro da adição.',
        ],
        pythonCode: `# Função de Soma Didática em Python:
def somar_com_passos(a, b):
    print(f"Parcela 1: {a}")
    print(f"Parcela 2: {b}")
    soma = a + b
    print(f"Resultado final: {soma}")
    return soma

resultado = somar_com_passos(${num1}, ${num2})`,
        realWorldCuriosity: 'A adição é a base fundamental de todas as outras operações aritméticas: a multiplicação é uma soma repetida e a exponenciação é uma multiplicação repetida!',
      };
    }

    case '-': {
      const result = num1 - num2;
      const steps = [
        {
          stepNumber: 1,
          title: 'Identificação de Minuendo e Subtraendo',
          description: `O minuendo é ${num1} (quantidade original) e o subtraendo é ${num2} (quantidade a retirar).`,
          expression: `Minuendo (${num1}) - Subtraendo (${num2})`,
        },
        {
          stepNumber: 2,
          title: 'Algoritmo da Subtração',
          description: 'Alinhamos as colunas. Se o dígito do minuendo for menor que o do subtraendo, aplicamos o "empresta um" (decomposição de uma unidade da casa imediatamente à esquerda em 10 da casa atual).',
          expression: `${num1} - ${num2} = ${result}`,
        },
        {
          stepNumber: 3,
          title: 'Prova Real (Verificação Inversa)',
          description: 'A operação inversa da subtração é a soma. Verificamos se: (Diferença + Subtraendo) é igual ao Minuendo.',
          expression: `${result} + ${num2} = ${result + num2} ${result + num2 === num1 ? '✔ (Correto!)' : ''}`,
        },
      ];

      return {
        title: 'Demonstração da Subtração',
        operationSymbol: '-',
        expression: `${num1} - ${num2}`,
        result,
        methodName: 'Algoritmo da Decomposição ("Empresta Um")',
        steps,
        visualBoard: {
          type: 'vertical-subtraction',
          rows: [
            `   ${num1.toLocaleString('pt-BR')}`,
            `-  ${num2.toLocaleString('pt-BR')}`,
            `───────`,
            `   ${result.toLocaleString('pt-BR')}`,
          ],
          notes: [`Prova Real: ${result} + ${num2} = ${num1}`],
        },
        mathematicalProperties: [
          'Não comutativa: a - b ≠ b - a (muda o sinal do resultado).',
          'Operação Inversa: A subtração desfaz exatamente o que a adição fez.',
        ],
        pythonCode: `# Subtração com Prova Real em Python:
def subtrair_com_prova(a, b):
    diferenca = a - b
    # Prova real:
    assert diferenca + b == a, "Erro na prova real"
    return diferenca

resultado = subtrair_com_prova(${num1}, ${num2})`,
        realWorldCuriosity: 'Historicamente, a notação do sinal de menos (-) surgiu no século XV com mercadores europeus que marcavam caixas de carga para indicar peso a menos!',
      };
    }

    case '*': {
      const result = num1 * num2;
      const steps = [
        {
          stepNumber: 1,
          title: 'Decomposição em Fatores',
          description: `Multiplicar ${num1} por ${num2} significa adicionar o número ${num1} a si mesmo ${num2} vezes (ou vice-versa).`,
          expression: `${num1} × ${num2}`,
        },
        {
          stepNumber: 2,
          title: 'Produtos Parciais (Propriedade Distributiva)',
          description: 'Multiplicamos cada dígito do multiplicador por todo o multiplicando, deslocando uma casa decimal para a esquerda a cada nova linha de produto parcial.',
          expression: `${num1} × ${num2} = ${result}`,
        },
        {
          stepNumber: 3,
          title: 'Soma dos Produtos Parciais',
          description: 'Somamos todos os produtos parciais obtidos para chegar ao produto total.',
          expression: `Total = ${result}`,
        },
      ];

      return {
        title: 'Demonstração da Multiplicação',
        operationSymbol: '×',
        expression: `${num1} × ${num2}`,
        result,
        methodName: 'Algoritmo Tradicional com Produtos Parciais',
        steps,
        visualBoard: {
          type: 'long-multiplication',
          rows: [
            `     ${num1.toLocaleString('pt-BR')}`,
            `  ×  ${num2.toLocaleString('pt-BR')}`,
            `  ────────`,
            `     ${result.toLocaleString('pt-BR')}`,
          ],
          notes: [
            'Propriedade Comutativa: Fator 1 × Fator 2 = Fator 2 × Fator 1',
            'Elemento Absorvente: x × 0 = 0',
          ],
        },
        mathematicalProperties: [
          'Propriedade Comutativa: a × b = b × a.',
          'Elemento Neutro: O número 1 (a × 1 = a).',
          'Elemento Nulo / Absorvente: Multiplicação por zero sempre resulta em zero.',
        ],
        pythonCode: `# Multiplicação e Decomposição em Python:
def multiplicar_explicado(fator1, fator2):
    produto = fator1 * fator2
    print(f"{fator1} multiplicado por {fator2} = {produto}")
    return produto

resultado = multiplicar_explicado(${num1}, ${num2})`,
        realWorldCuriosity: 'Os computadores não realizam multiplicação mágica: no nível do processador (ALU), eles realizam deslocamentos binários de bits (shifts) e somas sucessivas!',
      };
    }

    case '/': {
      if (num2 === 0) {
        return {
          title: '⚠️ Impossibilidade Matemática: Divisão por Zero',
          operationSymbol: '÷',
          expression: `${num1} ÷ 0`,
          result: 'Indefinido / Erro',
          methodName: 'Análise de Limites e Domínio Matemático',
          steps: [
            {
              stepNumber: 1,
              title: 'O Conceito de Divisão',
              description: 'A divisão responde à pergunta: "Por qual número devo multiplicar o divisor para obter o dividendo?"',
              expression: `${num1} ÷ 0 = x  ⇔  x × 0 = ${num1}`,
            },
            {
              stepNumber: 2,
              title: 'A Contradição Aritmética',
              description: `Qualquer número multiplicado por zero resulta em ZERO (x × 0 = 0). Portanto, nenhuma quantidade multiplicada por 0 pode resultar em ${num1}!`,
              expression: `Para qualquer x real: x × 0 = 0 ≠ ${num1}`,
            },
            {
              stepNumber: 3,
              title: 'Tratamento em Python',
              description: 'O interpretador Python detecta essa violação das leis da aritmética e dispara uma exceção nativa do tipo ZeroDivisionError.',
              expression: 'raise ZeroDivisionError("division by zero")',
            },
          ],
          visualBoard: {
            type: 'long-division',
            rows: [
              `   ${num1} │ 0`,
              `      └───`,
              `  ❌ IMPOSSÍVEL (ZeroDivisionError)`,
            ],
            notes: ['Não existe número real que multiplicado por 0 resulte no dividendo.'],
          },
          mathematicalProperties: [
            'Divisão por zero não é um número real.',
            'No cálculo diferencial, o limite de c/x quando x tende a 0 tende ao infinito, mas a operação pontual 1/0 permanece estritamente indefinida.',
          ],
          pythonCode: `try:\n    resultado = ${num1} / 0\nexcept ZeroDivisionError as err:\n    print("⚠️ Capturado com sucesso: Não é possível dividir por zero!")`,
          realWorldCuriosity: 'Em 1997, o cruzador de guerra USS Yorktown sofreu um colapso completo no seu sistema operacional de bordo porque um operador acidentalmente digitou zero num campo de divisão!',
        };
      }

      const result = num1 / num2;
      const quotient = Math.floor(num1 / num2);
      const remainder = num1 % num2;

      const steps = [
        {
          stepNumber: 1,
          title: 'Estrutura da Divisão Euclidiana',
          description: `Dividendo (D) = ${num1}, Divisor (d) = ${num2}. Queremos encontrar o Quociente (q) e o Resto (r).`,
          expression: `D = d × q + r`,
        },
        {
          stepNumber: 2,
          title: 'Método da Chave (Passo a Passo)',
          description: `Quantas vezes o divisor (${num2}) cabe inteiramente no dividendo (${num1})? Cabe ${quotient} vezes, com resto ${remainder}.`,
          expression: `${num1} = (${num2} × ${quotient}) + ${remainder}`,
        },
        {
          stepNumber: 3,
          title: 'Expansão Decimal',
          description: `Ao continuar a divisão após a vírgula, dividimos o resto restante, alcançando o valor real contínuo: ${result}.`,
          expression: `${num1} ÷ ${num2} = ${result}`,
        },
      ];

      return {
        title: 'Demonstração da Divisão',
        operationSymbol: '÷',
        expression: `${num1} ÷ ${num2}`,
        result,
        methodName: 'Algoritmo Euclidiano da Divisão (Método da Chave)',
        steps,
        visualBoard: {
          type: 'long-division',
          rows: [
            `   ${num1.toLocaleString('pt-BR')} │ ${num2.toLocaleString('pt-BR')}`,
            `      └────────────`,
            `       ${result.toLocaleString('pt-BR', { maximumFractionDigits: 6 })}`,
          ],
          notes: [
            `Quociente Inteiro: ${quotient}`,
            `Resto: ${remainder}`,
            `Verificação: (${num2} × ${quotient}) + ${remainder} = ${num1}`,
          ],
        },
        mathematicalProperties: [
          'Não comutativa: a / b ≠ b / a.',
          'Relação Fundamental: Dividendo = (Divisor × Quociente) + Resto.',
        ],
        pythonCode: `# Divisão Euclidiana e Float em Python:
dividendo = ${num1}
divisor = ${num2}

quociente_real = dividendo / divisor      # float (com decimais)
quociente_inteiro = dividendo // divisor  # operador // (divisão inteira)
resto = dividendo % divisor               # operador % (módulo)

print(f"Resultado Decimal: {quociente_real}")
print(f"Divisão Inteira: {quociente_inteiro} com Resto {resto}")`,
        realWorldCuriosity: 'Em Python, o operador // calcula o quociente inteiro (floor division) e o operador % calcula o resto exato da divisão!',
      };
    }

    case '^': {
      const result = Math.pow(num1, num2);
      const isSmallInt = Number.isInteger(num2) && num2 > 0 && num2 <= 10;
      const expansion = isSmallInt
        ? Array(num2).fill(String(num1)).join(' × ')
        : `${num1} elevado a ${num2}`;

      const steps = [
        {
          stepNumber: 1,
          title: 'Identificação de Base e Expoente',
          description: `A base é ${num1} e o expoente é ${num2}. O expoente determina quantas vezes multiplicamos a base por ela mesma.`,
          expression: `Base (${num1}) ^ Expoente (${num2})`,
        },
        {
          stepNumber: 2,
          title: 'Desenvolvimento Fatorial',
          description: `Multiplicação contínua da base: ${expansion}`,
          expression: `${num1}^${num2} = ${expansion}`,
        },
        {
          stepNumber: 3,
          title: 'Resultado Final',
          description: `Multiplicando todos os fatores acumulados, encontramos o valor de ${result}.`,
          expression: `Resultado = ${result}`,
        },
      ];

      return {
        title: 'Demonstração da Potenciação',
        operationSymbol: '^',
        expression: `${num1} ^ ${num2}`,
        result,
        methodName: 'Multiplicação Repetida de Fatores Iguais',
        steps,
        visualBoard: {
          type: 'power-expansion',
          rows: [
            `Base = ${num1}`,
            `Expoente = ${num2}`,
            `Desenvolvimento: ${expansion}`,
            `Total = ${result.toLocaleString('pt-BR')}`,
          ],
          notes: [
            'Regra: x^0 = 1 (para x ≠ 0)',
            'Regra: x^1 = x',
            'Regra: x^(-n) = 1 / (x^n)',
          ],
        },
        mathematicalProperties: [
          'Produto de potências de mesma base: a^m × a^n = a^(m+n)',
          'Potência de potência: (a^m)^n = a^(m×n)',
          'Em Python usamos o operador ** ou a função math.pow(base, exp).',
        ],
        pythonCode: `# Potenciação em Python:
base = ${num1}
expoente = ${num2}

# Operador oficial Python para potência é **
resultado = base ** expoente
print(f"{base} ** {expoente} = {resultado}")`,
        realWorldCuriosity: 'A notação exponencial foi criada por René Descartes em 1637 para evitar escrever repetidamente o mesmo número em equações algébricas!',
      };
    }

    default:
      return {
        title: 'Operação Numérica',
        operationSymbol: '=',
        expression: `${num1}`,
        result: num1,
        methodName: 'Valor Direto',
        steps: [
          {
            stepNumber: 1,
            title: 'Leitura Numérica',
            description: `Valor carregado no acumulador: ${num1}.`,
            expression: `${num1}`,
          },
        ],
        mathematicalProperties: [],
        pythonCode: `x = ${num1}`,
      };
  }
}

export function generateBreakdownForScientific(
  fn: ScientificFunction,
  num: number,
  angleUnit: 'DEG' | 'RAD' = 'DEG'
): MathBreakdownData {
  switch (fn) {
    case 'sqrt': {
      const result = Math.sqrt(num);
      return {
        title: 'Demonstração da Raiz Quadrada',
        operationSymbol: '√',
        expression: `√(${num})`,
        result: isNaN(result) ? 'Erro (Raiz de negativo)' : result,
        methodName: 'Fatoração e Radiciação (Operação Inversa do Quadrado)',
        steps: [
          {
            stepNumber: 1,
            title: 'Definição da Raiz Quadrada',
            description: `Procuramos um número não-negativo que, quando multiplicado por si mesmo (ao quadrado), resulta exatamente em ${num}.`,
            expression: `x × x = ${num}  ⇔  x² = ${num}`,
          },
          {
            stepNumber: 2,
            title: 'Cálculo Numérico',
            description: `O valor real encontrado é ${result.toFixed(6)}. Verificação: (${result.toFixed(6)})² ≈ ${num}.`,
            expression: `√(${num}) = ${result}`,
          },
        ],
        visualBoard: {
          type: 'power-expansion',
          rows: [
            `√(${num}) = ${result.toLocaleString('pt-BR', { maximumFractionDigits: 6 })}`,
            `Prova: (${result.toFixed(4)})² = ${num}`,
          ],
          notes: ['Em Python: import math -> math.sqrt(x) ou x ** 0.5'],
        },
        mathematicalProperties: [
          'No conjunto dos números reais (ℝ), a raiz quadrada só é definida para x ≥ 0.',
          'Propriedade: √(a × b) = √a × √b.',
        ],
        pythonCode: `import math\n\nx = ${num}\nresultado = math.sqrt(x)\n# Alternativa sem biblioteca:\nresultado2 = x ** 0.5\nprint(f"Raiz: {resultado}")`,
      };
    }

    case 'sin': {
      const rad = angleUnit === 'DEG' ? (num * Math.PI) / 180 : num;
      const result = Math.sin(rad);
      return {
        title: 'Demonstração do Seno Trigonométrico',
        operationSymbol: 'sen',
        expression: `sen(${num}${angleUnit === 'DEG' ? '°' : ' rad'})`,
        result: parseFloat(result.toFixed(6)),
        methodName: 'Projeção no Círculo Trigonométrico',
        steps: [
          {
            stepNumber: 1,
            title: 'Conversão Angular para Radianos',
            description: angleUnit === 'DEG'
              ? `Em matemática e computação, funções trigonométricas operam em radianos. Convertendo ${num}°: rad = (${num} × π) / 180 = ${rad.toFixed(6)} rad.`
              : `O ângulo já foi fornecido em radianos: ${num} rad.`,
            expression: `Ângulo em radianos = ${rad.toFixed(6)}`,
          },
          {
            stepNumber: 2,
            title: 'Significado Geométrico',
            description: 'No círculo trigonométrico de raio 1, o seno corresponde à coordenada vertical (eixo Y) do ponto na circunferência.',
            expression: `sen(${num}) = Coordenada Y = ${result.toFixed(6)}`,
          },
        ],
        mathematicalProperties: [
          'O valor do seno sempre oscila estritamente entre -1 e +1.',
          'sen²(θ) + cos²(θ) = 1 (Identidade Fundamental da Trigonometria).',
        ],
        pythonCode: `import math\n\ngraus = ${num}\n# Python exige converter graus para radianos:\nradianos = math.radians(graus)\nseno = math.sin(radianos)\nprint(f"sen({graus}°) = {seno:.6f}")`,
      };
    }

    default:
      return generateBreakdownForOperation('+', num, 0);
  }
}

