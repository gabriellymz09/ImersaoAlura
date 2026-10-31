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
│   └── calculadora_rosa_gui.py     # Versão desktop visual com janela moderna em tons de rosa (Tkinter)
├── src/                            # ⚛️ Código da interface web interativa em React + Tailwind CSS
├── index.html                      # Ponto de entrada da aplicação web
├── package.json                    # Dependências e scripts do projeto
├── tsconfig.json                   # Configuração do TypeScript
└── README.md                       # Documentação da atividade
```

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
