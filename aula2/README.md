# 🌸 Calculadora Python Pink Edition 💕

> **Atividade desenvolvida durante a Imersão Alura** 🚀

Uma calculadora moderna, organizada e didática em tons de rosa, criada com o objetivo de fixar os fundamentos da programação em **Python** e demonstrar as quatro operações matemáticas básicas e funções científicas avançadas.

---

## 📖 Perguntas & Respostas sobre a Arquitetura do Projeto

### 1. Quais são os principais componentes do código gerado?

O código foi estruturado em módulos claros e complementares, seguindo as boas práticas de programação:

- **Módulo de Entrada e Tipagem (`input()` e `float()`):** Captura a digitação do usuário e converte os dados de texto (`string`) para números decimais (`float`), permitindo cálculos exatos com inteiros e números quebrados.
- **Estrutura de Decisão e Roteamento (`if`, `elif`, `else`):** O "cérebro" do programa, que analisa qual comando o usuário escolheu e direciona o fluxo de execução para a operação matemática correta.
- **Operadores Aritméticos e Módulo Matemático (`+`, `-`, `*`, `/`, `**`e`import math`):\*\* Executam o processamento numérico, tanto das 4 operações básicas quanto das funções científicas (seno, cosseno, tangente, raiz quadrada e logaritmos).
- **Funções Modulares (`def` e `return`):** Sub-rotinas organizadas e reutilizáveis (como `def somar(a, b):`) que recebem parâmetros, processam o cálculo isoladamente e devolvem o resultado com `return`.
- **Tratamento de Exceções e Segurança (`try / except` e validação de divisor zero):** Mecanismo de defesa que impede o encerramento abrupto do programa caso o usuário digite texto em vez de números (`ValueError`) ou tente dividir por zero (`ZeroDivisionError`).
- **Laço de Repetição Interativo (`while True`):** Mantém o programa ativo em loop contínuo, permitindo que o usuário realize vários cálculos consecutivos sem precisar reiniciar a aplicação.

---

### 2. Como a aplicação recebe os números e identifica a operação escolhida?

- **Recebimento dos Números:**
  O programa utiliza a função nativa `input()`, que pausa o terminal e aguarda a entrada do usuário pelo teclado. Por padrão, o `input()` retorna um dado do tipo texto (`str`). Para que o computador realize operações matemáticas (e não concatene os textos como `"5" + "5" = "55"`), o valor digitado é convertido explicitamente com `float(input())`.

  ```python
  num1 = float(input("Digite o primeiro número: "))
  num2 = float(input("Digite o segundo número: "))
  ```

- **Identificação da Operação Escolhida:**
  A aplicação solicita que o usuário selecione a operação desejada digitando o símbolo (`+`, `-`, `*`, `/`) ou o número correspondente no menu. Em seguida, a linguagem utiliza o operador de comparação de igualdade (`==`) dentro de uma estrutura condicional encadeada:

  ```python
  operacao = input("Digite a operação (+, -, *, /): ").strip()

  if operacao == "+":
      # Identificou que o usuário deseja somar
  elif operacao == "-":
      # Identificou que o usuário deseja subtrair
  elif operacao == "*":
      # Identificou que o usuário deseja multiplicar
  elif operacao == "/":
      # Identificou que o usuário deseja dividir
  else:
      # Nenhuma das opções válidas foi identificada
  ```

---

### 3. Como a lógica de programação é utilizada para realizar os cálculos e apresentar os resultados?

- **Processamento Lógico dos Cálculos:**
  Uma vez que a operação é identificada pela condicional, o Python aplica o operador aritmético correspondente entre as variáveis `num1` e `num2`.

  Na divisão, a lógica inclui uma **condicional de guarda preventiva**: como a matemática não define divisão por zero, o código avalia `if num2 == 0:` antes de calcular. Se for zero, emite um aviso seguro; caso contrário, executa `num1 / num2`.

  ```python
  if operacao == "/":
      if num2 == 0:
          print("⚠️ Erro matemático: Não é possível dividir por zero!")
      else:
          resultado = num1 / num2
  ```

- **Apresentação Formatada dos Resultados:**
  Para exibir o resultado de forma elegante e legível, o código utiliza **f-strings** (strings formatadas do Python iniciadas pela letra `f`). As f-strings permitem interpolar variáveis e expressões diretamente no corpo do texto entre chaves `{}`:

  ```python
  print(f"💖 Resultado: {num1} {operacao} {num2} = {resultado}")
  ```

---

## 📂 Estrutura dos Arquivos do Projeto

```text
├── python/                         # 🐍 Scripts Python prontos para execução
│   ├── calculadora_basica.py       # Versão inicial com input, float e if/elif/else
│   ├── calculadora_modular.py      # Versão modular com funções (def) e loop contínuo
│   ├── calculadora_cientifica.py   # Versão com o módulo 'math' (seno, cosseno, log, raiz)
│   ├── calculadora_rosa_gui.py     # Versão desktop visual com janela moderna em tons de rosa (Tkinter)
│   └── calculadora_escalas_e_medidas.py # Nova versão com escalas, conversor de grandezas e lousa de contas
├── src/                            # ⚛️ Código da interface web interativa em React + Tailwind CSS
│   ├── components/                 # Componentes: PinkCalculator, ScaleStudio, UnitConverter, MathBreakdownBoard
│   ├── types/                      # Tipagem TypeScript
│   └── utils/                      # Módulos matemáticos de escalas, unidades e decomposição de passos
├── index.html                      # Ponto de entrada da aplicação web
├── package.json                    # Dependências e scripts do projeto
├── tsconfig.json                   # Configuração do TypeScript
└── README.md                       # Documentação da atividade
```

---

## ✨ Novas Funcionalidades

### 📐 1. Estúdio de Criação e Cálculo de Escalas

- **Cálculo Bidirecional:**
  - **Real ➔ Desenho/Maquete:** Calcula o tamanho no papel em escala $1:N$ ou $N:1$.
  - **Desenho/Maquete ➔ Real:** Converte a medida da régua para o tamanho no mundo real.
  - **Criador de Escalas:** Informa a medida real e o espaço disponível e descobre automaticamente a escala canônica ideal!
- **Régua Gráfica Dinâmica (SVG Interativo):** Desenha a barra de escala gráfica com divisões decimais e padrão ABNT em tempo real.
- **Predefinições Abrangentes:** Arquitetura (1:20, 1:50, 1:100, 1:200, 1:500), Modelismo (1:43, 1:64 Hot Wheels, 1:87 H0), Engenharia (1:1, 2:1, 5:1) e Cartografia (1:10.000, 1:50.000), além de permitir salvar escalas personalizadas!

### 📏 2. Alteração de Medidas e Conversor Universal

- **8 Grandezas Físicas Completas:**
  - Comprimento (mm, cm, m, km, in, ft, yd, mi, nmi)
  - Massa & Peso (mg, g, kg, t, lb, oz, ct)
  - Área (m², cm², km², ha, alqueire paulista, acre, sq ft)
  - Volume & Capacidade (mL, L, m³, gal US, fl oz, xícara culinária, colher de sopa, colher de chá)
  - Temperatura (°C, °F, K com fórmulas de translação e escala)
  - Velocidade (km/h, m/s, mph, nós marítimos)
  - Tempo (ms, s, min, h, d, sem)
  - Armazenamento Digital (B, KB, MB, GB, TB)
- **Matriz de Equivalência Instantânea:** Veja simultaneamente o valor convertido em todas as outras unidades da mesma grandeza.
- **Integração:** Botão de envio direto do resultado para a calculadora rosa.

### 📝 3. Lousa de Demonstração de Contas Passo a Passo

- **Algoritmo Tradicional de Lousa:** Mostra a montagem vertical da conta com colunas alinhadas, "vai um" na adição, "empresta um" na subtração, produtos parciais na multiplicação e método da chave com quociente e resto na divisão Euclidiana.
- **Etapas Didáticas Numeradas:** Explica a razão matemática por trás de cada linha.
- **Código Python Equivalente:** Demonstra como reproduzir o raciocínio exato em script Python com comentários didáticos.
- **Exportação:** Botão para copiar a demonstração completa formatada em texto/Markdown.

---

## 🚀 Como Executar os Scripts no seu Computador

Com o Python instalado, abra o terminal na pasta do projeto e execute qualquer uma das versões:

```bash
# 1. Calculadora básica (linha de comando)
python python/calculadora_basica.py

# 2. Calculadora modular com menu interativo
python python/calculadora_modular.py

# 3. Calculadora científica com trigonometria e logaritmos
python python/calculadora_cientifica.py

# 4. Calculadora desktop com interface gráfica em tons de rosa
python python/calculadora_rosa_gui.py

# 5. Nova Calculadora de Escalas, Medidas e Demonstração de Contas
python python/calculadora_escalas_e_medidas.py
```

_Dica:_ Os arquivos também podem ser abertos no **VS Code** ou no **IDLE** do Python; basta pressionar a tecla **F5** para rodar diretamente!

---

## 🌐 Como Executar a Interface Web Interativa (React)

Caso queira rodar a versão web no navegador:

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor local
npm run dev
```

Acesse `http://localhost:3000` no seu navegador!

---
