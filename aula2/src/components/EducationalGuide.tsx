import React, { useState } from 'react';
import {
  BookOpen,
  Code2,
  AlertTriangle,
  HelpCircle,
  Cpu,
  ChevronDown,
  Layers,
  Terminal,
  Monitor,
  Atom,
  GitBranch,
  Ruler,
  Scale
} from 'lucide-react';

interface GuideSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  explanation: React.ReactNode;
  codeSnippet: string;
  tip: string;
}

export const EducationalGuide: React.FC = () => {
  const [openSectionId, setOpenSectionId] = useState<string>('input');

  const toggleSection = (id: string) => {
    setOpenSectionId(openSectionId === id ? '' : id);
  };

  const sections: GuideSection[] = [
    {
      id: 'input',
      icon: <Terminal className="w-5 h-5 text-pink-400" />,
      title: '1. Entrada de Dados e Conversão de Tipos',
      subtitle: 'Entendendo input(), str e float()',
      explanation: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            Quando você usa o comando <code className="text-pink-300 bg-pink-950/40 px-1 rounded">input()</code>, o Python sempre recebe a resposta como <strong>Texto (String)</strong>.
          </p>
          <p>
            Se tentarmos somar dois textos, o Python junta eles em vez de calcular: por exemplo, <code className="text-pink-300">"5" + "5"</code> resulta em <code className="text-pink-300">"55"</code>!
          </p>
          <p>
            Por isso, embrulhamos o comando dentro de <code className="text-pink-300 bg-pink-950/40 px-1 rounded">float()</code>, que converte o texto digitado em um número decimal (ponto flutuante), permitindo calcular tanto números inteiros (<code className="text-pink-300">10</code>) quanto decimais (<code className="text-pink-300">7.5</code>).
          </p>
        </div>
      ),
      codeSnippet: `# Exemplo correto no seu programa:
num1 = float(input("Digite o primeiro número: "))

# Se o usuário digitar '10.5', num1 guardará o valor numérico 10.5`,
      tip: 'Dica de ouro: Em Python usamos ponto (.) para números decimais, como 10.5, e não vírgula (,)!',
    },
    {
      id: 'operadores',
      icon: <Cpu className="w-5 h-5 text-pink-400" />,
      title: '2. As 4 Operações Matemáticas Básicas',
      subtitle: 'Símbolos oficiais do Python para cálculos',
      explanation: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            O Python possui operadores aritméticos nativos muito rápidos e intuitivos:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
            <li><strong>Soma (<code className="text-pink-300 font-bold">+</code>):</strong> adiciona dois valores. Ex: <code className="text-pink-300">15 + 5 = 20.0</code></li>
            <li><strong>Subtração (<code className="text-pink-300 font-bold">-</code>):</strong> subtrai o segundo do primeiro. Ex: <code className="text-pink-300">15 - 5 = 10.0</code></li>
            <li><strong>Multiplicação (<code className="text-pink-300 font-bold">*</code>):</strong> em programação usamos o asterisco (*). Ex: <code className="text-pink-300">4 * 5 = 20.0</code></li>
            <li><strong>Divisão (<code className="text-pink-300 font-bold">/</code>):</strong> a barra inclinada realiza a divisão e sempre devolve um número float. Ex: <code className="text-pink-300">10 / 2 = 5.0</code></li>
          </ul>
        </div>
      ),
      codeSnippet: `soma = 10 + 2       # 12
subtracao = 10 - 2  # 8
multi = 10 * 2      # 20
divisao = 10 / 2    # 5.0`,
      tip: 'A divisão com uma barra (/) sempre retorna um float no Python 3, mesmo que a divisão seja exata!',
    },
    {
      id: 'condicionais',
      icon: <Code2 className="w-5 h-5 text-pink-400" />,
      title: '3. Tomada de Decisão: if, elif e else',
      subtitle: 'Como o computador decide qual operação fazer',
      explanation: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            O computador lê o que o usuário escolheu e compara usando o operador de igualdade <code className="text-pink-300 bg-pink-950/40 px-1 rounded">==</code> (dois sinais de igual juntos significam &quot;é igual a?&quot;).
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
            <li><code className="text-pink-300 font-bold">if</code>: &quot;SE&quot; a condição for verdadeira, executa o bloco.</li>
            <li><code className="text-pink-300 font-bold">elif</code>: Abreviação de &quot;ELSE IF&quot; (&quot;senão se&quot;). Testa a próxima opção caso a anterior seja falsa.</li>
            <li><code className="text-pink-300 font-bold">else</code>: &quot;SENÃO&quot;. Se nenhuma das opções anteriores for verdadeira, executa este bloco padrão (ex: alerta de operação inválida).</li>
          </ul>
          <p className="mt-1">
            <strong>Indentação (espaçamento):</strong> O Python exige 4 espaços antes de cada linha dentro do if/elif. É assim que ele sabe onde começa e termina cada bloco!
          </p>
        </div>
      ),
      codeSnippet: `if operacao == "+":
    resultado = num1 + num2
elif operacao == "-":
    resultado = num1 - num2
elif operacao == "*":
    resultado = num1 * num2
elif operacao == "/":
    resultado = num1 / num2
else:
    print("Operação inválida!")`,
      tip: 'Nunca esqueça dos dois-pontos (:) ao final de cada linha de if, elif e else!',
    },
    {
      id: 'zero',
      icon: <AlertTriangle className="w-5 h-5 text-rose-400" />,
      title: '4. O Perigo da Divisão por Zero',
      subtitle: 'ZeroDivisionError e tratamento de erros',
      explanation: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            Na matemática pura, dividir qualquer número por zero é uma indeterminação impossível.
          </p>
          <p>
            Se você pedir para o Python fazer <code className="text-pink-300">10 / 0</code> sem nenhum cuidado, o programa travará na hora com o erro fatal: <code className="text-rose-400 font-mono">ZeroDivisionError: division by zero</code>.
          </p>
          <p>
            Bons programadores sempre colocam uma checagem preventiva: se o segundo número for zero, exibimos uma mensagem amigável em vez de deixar o programa quebrar!
          </p>
        </div>
      ),
      codeSnippet: `# Maneira simples com if:
if num2 == 0:
    print("⚠️ Erro: Não é possível dividir por zero!")
else:
    resultado = num1 / num2
    print("Resultado:", resultado)`,
      tip: 'Em programas avançados, também usamos "try / except ZeroDivisionError" para capturar erros automaticamente!',
    },
    {
      id: 'funcoes',
      icon: <Layers className="w-5 h-5 text-pink-400" />,
      title: '5. Organizando com Funções (def)',
      subtitle: 'Criando blocos reutilizáveis e código limpo',
      explanation: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            À medida que seus programas crescem, colocar todo o código em uma sequência única fica confuso.
          </p>
          <p>
            Com a palavra <code className="text-pink-300 bg-pink-950/40 px-1 rounded">def</code>, você cria suas próprias <strong>funções</strong> (pequenas fábricas). Elas recebem parâmetros (entradas) e entregam uma resposta com o comando <code className="text-pink-300 bg-pink-950/40 px-1 rounded">return</code>.
          </p>
        </div>
      ),
      codeSnippet: `def somar(a, b):
    """Recebe dois números e devolve a soma."""
    return a + b

# Para usar a função no código:
total = somar(15, 25) # total guardará o valor 40`,
      tip: 'Funções tornam o código mais fácil de testar, ler e reaproveitar em qualquer parte do sistema!',
    },
    {
      id: 'cientifica',
      icon: <Atom className="w-5 h-5 text-pink-400" />,
      title: '6. Funções Científicas: import math',
      subtitle: 'Seno, Cosseno, Logaritmo e Raízes no Python',
      explanation: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            O Python vem com uma biblioteca embutida espetacular chamada <code className="text-pink-300 bg-pink-950/40 px-1 rounded">math</code>. Para usá-la, basta escrever <code className="text-pink-300 font-bold">import math</code> no topo do arquivo.
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
            <li>
              <strong>Trigonometria (<code className="text-pink-300">math.sin</code>, <code className="text-pink-300">math.cos</code>, <code className="text-pink-300">math.tan</code>):</strong> No Python, as funções trigonométricas esperam o ângulo em <em>radianos</em>. Para calcular o seno de um ângulo em graus (ex: 30°), convertemos primeiro usando <code className="text-pink-300">math.radians(30)</code>!
            </li>
            <li>
              <strong>Logaritmo Natural (<code className="text-pink-300">math.log(x)</code>):</strong> Calcula o logaritmo na base de Euler (ln). Exige que <code className="text-pink-300">x &gt; 0</code>.
            </li>
            <li>
              <strong>Logaritmo Base 10 (<code className="text-pink-300">math.log10(x)</code>):</strong> O logaritmo tradicional na base 10 (ex: <code className="text-pink-300">math.log10(100) = 2.0</code>).
            </li>
            <li>
              <strong>Raiz Quadrada (<code className="text-pink-300">math.sqrt(x)</code>):</strong> Calcula a raiz quadrada (ex: <code className="text-pink-300">math.sqrt(64) = 8.0</code>).
            </li>
            <li>
              <strong>Constantes (<code className="text-pink-300">math.pi</code> e <code className="text-pink-300">math.e</code>):</strong> Valores de alta precisão para π (3.14159...) e e (2.71828...).
            </li>
          </ul>
        </div>
      ),
      codeSnippet: `import math

# Seno de 30 graus:
rad = math.radians(30)
print(math.sin(rad)) # 0.49999999999999994 (aprox 0.5)

# Logaritmo na base 10:
print(math.log10(1000)) # 3.0

# Raiz quadrada:
print(math.sqrt(49)) # 7.0`,
      tip: 'Se você tentar calcular math.log(-5) ou math.sqrt(-4), o Python dispara um ValueError: math domain error, pois esses cálculos não são números reais!',
    },
    {
      id: 'desktop',
      icon: <Monitor className="w-5 h-5 text-pink-400" />,
      title: '7. Como Rodar no seu Computador (Passo a Passo)',
      subtitle: 'Do arquivo .py ao programa funcionando no seu PC',
      explanation: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            Para rodar estes scripts no seu próprio computador (Windows, Mac ou Linux):
          </p>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-300 pl-1">
            <li><strong>Instale o Python:</strong> Acesse <a href="https://python.org" target="_blank" rel="noreferrer" className="text-pink-400 underline">python.org</a> e baixe a versão recomendada (marque a opção &quot;Add python.exe to PATH&quot; no instalador).</li>
            <li><strong>Baixe o script:</strong> Clique no botão <em>&quot;Baixar Scripts .py&quot;</em> no topo desta página.</li>
            <li><strong>Abra e execute:</strong>
              <div className="ml-5 mt-1 p-2 rounded bg-slate-950/60 font-mono text-[11px] text-pink-200">
                # No Terminal ou Prompt de Comando:<br/>
                python calculadora_basica.py<br/><br/>
                # Para abrir a calculadora visual rosa:<br/>
                python calculadora_rosa_gui.py
              </div>
            </li>
          </ol>
        </div>
      ),
      codeSnippet: `# Dica: Você também pode abrir o arquivo no VS Code
# ou no aplicativo IDLE que vem instalado com o Python
# e simplesmente pressionar F5 para executar!`,
      tip: 'A biblioteca Tkinter já vem embutida no Python por padrão no Windows e Mac, você não precisa instalar nada extra!',
    },
    {
      id: 'escalas',
      icon: <Ruler className="w-5 h-5 text-pink-400" />,
      title: '8. Como Funcionam as Escalas no Python (Regra de Três)',
      subtitle: 'Entendendo a proporção d / R = 1 / N',
      explanation: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            Uma <strong>Escala</strong> é uma relação de proporção matemática direta entre a medida representada no papel (<code className="text-pink-300">d</code>) e a medida real no mundo físico (<code className="text-pink-300">R</code>).
          </p>
          <p>
            Na escala clássica de arquitetura <code className="text-pink-300">1:50</code>, 1 centímetro no desenho equivale a 50 centímetros (0,5 metros) na vida real.
          </p>
          <p>
            Para programar isso em Python, primeiro convertemos ambas as medidas para a mesma unidade (metros), aplicamos o fator de divisão e depois convertemos para a unidade desejada!
          </p>
        </div>
      ),
      codeSnippet: `def calcular_desenho(medida_real_metros, escala_denominador):
    # d = R / N
    medida_desenho_metros = medida_real_metros / escala_denominador
    return medida_desenho_metros * 100  # retorna em centímetros

# Uma parede de 5 metros na escala 1:50 mede:
print(calcular_desenho(5.0, 50))  # 10.0 cm`,
      tip: 'Sempre converta as medidas para a mesma unidade base antes de dividir pelo denominador da escala!',
    },
    {
      id: 'medidas',
      icon: <Scale className="w-5 h-5 text-pink-400" />,
      title: '9. Alteração e Conversão de Medidas e Grandezas',
      subtitle: 'Análise dimensional e fatores multiplicativos',
      explanation: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            No Sistema Internacional (SI), cada grandeza física possui uma unidade padrão (metro para comprimento, grama para massa, segundo para tempo).
          </p>
          <p>
            Para converter com precisão no Python, usamos uma <strong>tabela de fatores base</strong>: primeiro transformamos a unidade de origem para a base, e em seguida da base para o destino. Isso permite converter qualquer combinação sem precisar de dezenas de fórmulas isoladas!
          </p>
        </div>
      ),
      codeSnippet: `FATORES = {"mm": 0.001, "cm": 0.01, "m": 1.0, "km": 1000.0}

def converter_comprimento(valor, de_unidade, para_unidade):
    base_metros = valor * FATORES[de_unidade]
    return base_metros / FATORES[para_unidade]

print(converter_comprimento(15, "km", "m"))  # 15000.0 m`,
      tip: 'Para temperaturas (°C, °F, K), lembre-se de que além da multiplicação existe uma soma de deslocamento (offset) na fórmula!',
    },
    {
      id: 'demonstracao',
      icon: <Layers className="w-5 h-5 text-pink-400" />,
      title: '10. Demonstração de Contas e Divisão Euclidiana',
      subtitle: 'Quociente inteiro, resto (%) e prova real',
      explanation: (
        <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
          <p>
            Em matemática pedagógica, uma conta não é apenas o número final: é uma sequência lógica de passos (algoritmo).
          </p>
          <p>
            O Python nos fornece operadores especiais para decompor divisões:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
            <li><code className="text-pink-300 font-bold">/</code>: divisão contínua float com casas decimais.</li>
            <li><code className="text-pink-300 font-bold">//</code>: quociente inteiro (floor division).</li>
            <li><code className="text-pink-300 font-bold">%</code>: resto da divisão (operador módulo).</li>
          </ul>
        </div>
      ),
      codeSnippet: `dividendo = 17
divisor = 5

quociente = dividendo // divisor  # 3
resto = dividendo % divisor       # 2

# Prova real Euclidiana: D = (d * q) + r
assert dividendo == (divisor * quociente) + resto
print(f"{dividendo} = ({divisor} * {quociente}) + {resto}")`,
      tip: 'O operador de resto (%) é muito usado na programação para testar números pares (x % 2 == 0) e criar ciclos repetitivos!',
    },
    {
      id: 'github',
      icon: <GitBranch className="w-5 h-5 text-pink-400" />,
      title: '11. Como Colocar este Projeto no seu GitHub (Passo a Passo)',
      subtitle: 'Sim, basta subir os arquivos! Veja as melhores práticas',
      explanation: (
        <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
          <p>
            <strong>Sim!</strong> Se você baixou o ZIP, você pode colocar os arquivos no GitHub de duas formas muito simples:
          </p>
          <div className="p-3 rounded-lg bg-pink-950/40 border border-pink-500/20 space-y-1.5">
            <h4 className="font-bold text-pink-200">Método 1: Pelo site do GitHub (Sem precisar digitar comandos)</h4>
            <ol className="list-decimal list-inside space-y-1 pl-1 text-slate-300">
              <li>Extraia o arquivo <code>.zip</code> em uma pasta no seu computador.</li>
              <li>Acesse <a href="https://github.com" target="_blank" rel="noreferrer" className="text-pink-400 underline">github.com</a>, entre na sua conta e clique no botão verde <strong>&quot;New&quot;</strong> para criar um repositório (ex: <code>calculadora-python-pink</code>).</li>
              <li>Clique no link <strong>&quot;uploading an existing file&quot;</strong>.</li>
              <li>Arraste todos os arquivos da pasta para dentro da página e clique em <strong>&quot;Commit changes&quot;</strong>!</li>
            </ol>
          </div>
          <div className="p-3 rounded-lg bg-slate-950/80 border border-pink-500/15 space-y-1.5">
            <h4 className="font-bold text-pink-200">Método 2: Pelo Terminal com Git</h4>
            <p className="text-slate-400">
              Se você tem o Git instalado, basta abrir o terminal dentro da pasta extraída e rodar os comandos abaixo.
            </p>
          </div>
          <p className="text-pink-300/90 font-medium">
            ⚠️ <strong>Dica importante para iniciantes:</strong> Nunca envie a pasta <code>node_modules</code> para o GitHub! Ela contém centenas de megabytes de bibliotecas que são reinstaladas automaticamente com <code>npm install</code>. O arquivo <code>.gitignore</code> já cuida disso para você.
          </p>
        </div>
      ),
      codeSnippet: `# Comandos no Terminal para enviar ao GitHub:
git init
git add .
git commit -m "feat: Minha Calculadora Python Pink"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/calculadora-python-pink.git
git push -u origin main`,
      tip: 'O arquivo README.md que preparamos já deixará o seu perfil do GitHub com uma apresentação linda e profissional!',
    },
  ];

  return (
    <div className="bg-slate-900/90 border border-pink-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-pink-500/20">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-500/30">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-white tracking-tight">
            Guia Didático: Entendendo Cada Linha do Código
          </h2>
          <p className="text-xs text-slate-400">
            Conceitos fundamentais explicados de forma simples e direta para quem está começando
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {sections.map((section) => {
          const isOpen = openSectionId === section.id;

          return (
            <div
              key={section.id}
              className={`rounded-xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-slate-950/80 border-pink-500/40 shadow-md shadow-pink-500/10'
                  : 'bg-slate-950/40 border-pink-500/15 hover:border-pink-500/30'
              }`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-4 text-left flex items-center justify-between gap-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-pink-500/15 shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {section.title}
                    </h3>
                    <p className="text-xs text-pink-300/70">{section.subtitle}</p>
                  </div>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-pink-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 space-y-3 border-t border-pink-500/10">
                  {section.explanation}

                  {/* Code snippet example */}
                  <div className="rounded-lg bg-slate-950 border border-pink-500/20 p-3 font-mono text-xs text-pink-200 overflow-x-auto">
                    <pre>{section.codeSnippet}</pre>
                  </div>

                  {/* Tip box */}
                  <div className="p-2.5 rounded-lg bg-pink-950/40 border border-pink-500/25 flex items-start gap-2 text-xs text-pink-200">
                    <span className="text-pink-400 font-bold shrink-0">💡</span>
                    <span>{section.tip}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
