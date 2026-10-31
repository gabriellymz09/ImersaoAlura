export interface PythonScript {
  id: string;
  title: string;
  filename: string;
  description: string;
  level: string;
  code: string;
}

export const PYTHON_SCRIPTS: PythonScript[] = [
  {
    id: 'simples',
    title: '1. Calculadora Básica (Iniciante)',
    filename: 'calculadora_basica.py',
    description: 'Código direto e limpo usando variáveis, input(), conversão float e condicionais if/elif/else. Perfeito para a primeira aula de Python.',
    level: 'Iniciante',
    code: `# ==========================================================
# 🌸 CALCULADORA BÁSICA EM PYTHON - PINK EDITION 🌸
# ==========================================================
# Este programa realiza as quatro operações matemáticas básicas:
# 1. Soma (+)
# 2. Subtração (-)
# 3. Multiplicação (*)
# 4. Divisão (/)
# ==========================================================

print("✨ Bem-vinda à Calculadora Python Pink! ✨")
print("------------------------------------------")

# 1. ENTRADA DE DADOS:
# input() lê o texto digitado pelo usuário.
# float() converte o texto para número decimal (ex: 5.5).
num1 = float(input("Digite o primeiro número: "))

print("\\nEscolha a operação desejada:")
print(" +  para Somar")
print(" -  para Subtrair")
print(" *  para Multiplicar")
print(" /  para Dividir")
operacao = input("Digite a operação (+, -, *, /): ")

num2 = float(input("\\nDigite o segundo número: "))

# 2. PROCESSAMENTO E TOMADA DE DECISÃO (if / elif / else):
print("\\n------------------------------------------")
if operacao == "+":
    resultado = num1 + num2
    print(f"💖 Resultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"💖 Resultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"💖 Resultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    # Regra matemática: Não existe divisão por zero!
    if num2 == 0:
        print("⚠️ Erro matemático: Não é possível dividir por zero!")
    else:
        resultado = num1 / num2
        print(f"💖 Resultado: {num1} / {num2} = {resultado}")

else:
    print("❌ Operação inválida! Por favor, escolha +, -, * ou /.")

print("------------------------------------------")
print("Obrigado por usar a Calculadora Python! 💕")
`,
  },
  {
    id: 'modular',
    title: '2. Calculadora Modular com Funções e Loop (Recomendado)',
    filename: 'calculadora_modular.py',
    description: 'Código estruturado em boas práticas: funções reutilizáveis (def), tratamento de erros com try/except e loop contínuo while True.',
    level: 'Intermediário',
    code: `# ==========================================================
# 🌸 CALCULADORA MODULAR EM PYTHON COM FUNÇÕES 🌸
# ==========================================================
# Organizada em funções independentes e um menu interativo contínuo.
# ==========================================================

# 1. DEFINIÇÃO DAS FUNÇÕES MATEMÁTICAS:
def somar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a subtração entre a e b."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto de a e b."""
    return a * b

def dividir(a, b):
    """Retorna a divisão entre a e b, com proteção contra divisão por zero."""
    if b == 0:
        raise ZeroDivisionError("Divisão por zero não é permitida!")
    return a / b

# 2. FUNÇÃO PRINCIPAL DO PROGRAMA:
def executar_calculadora():
    print("=" * 45)
    print("   🌸 CALCULADORA MODULAR PYTHON PINK 🌸")
    print("=" * 45)
    
    # Loop 'while True' mantém a calculadora aberta até o usuário decidir sair
    while True:
        print("\\nSelecione uma opção:")
        print("  1. Somar (+)")
        print("  2. Subtrair (-)")
        print("  3. Multiplicar (*)")
        print("  4. Dividir (/)")
        print("  5. Sair do Programa")
        
        opcao = input("\\nDigite o número da opção (1 a 5): ").strip()
        
        if opcao == "5":
            print("\\n✨ Até a próxima! Bons estudos em Python! 💕")
            break
            
        if opcao not in ["1", "2", "3", "4"]:
            print("❌ Opção inválida. Digite um valor entre 1 e 5.")
            continue
            
        # Tratamento de erros com 'try / except'
        # Evita que o programa feche se alguém digitar letras em vez de números
        try:
            num1 = float(input("Digite o 1º número: "))
            num2 = float(input("Digite o 2º número: "))
            
            if opcao == "1":
                res = somar(num1, num2)
                simbolo = "+"
            elif opcao == "2":
                res = subtrair(num1, num2)
                simbolo = "-"
            elif opcao == "3":
                res = multiplicar(num1, num2)
                simbolo = "*"
            elif opcao == "4":
                res = dividir(num1, num2)
                simbolo = "/"
                
            print(f"\\n💖 CÁLCULO: {num1} {simbolo} {num2} = {res}")
            
        except ValueError:
            print("❌ Erro de Entrada: Por favor, digite apenas números válidos!")
        except ZeroDivisionError as erro:
            print(f"⚠️ {erro}")
            
        print("-" * 45)

# Ponto de entrada padrão em Python:
if __name__ == "__main__":
    executar_calculadora()
`,
  },
  {
    id: 'cientifica',
    title: '3. Calculadora Científica (import math)',
    filename: 'calculadora_cientifica.py',
    description: 'Funções avançadas com o módulo math: seno, cosseno, tangente, logaritmo natural (ln), log10, raiz quadrada e potência.',
    level: 'Científica & Avançada',
    code: `# ==========================================================
# 🌸 CALCULADORA CIENTÍFICA EM PYTHON - PINK EDITION 🌸
# ==========================================================
# Utiliza o módulo padrão 'math' do Python para cálculos
# de trigonometria (seno, cosseno), logaritmos e exponenciação.
# ==========================================================

import math

def seno(graus):
    """Calcula o seno recebendo o ângulo em graus."""
    radianos = math.radians(graus)
    return math.sin(radianos)

def cosseno(graus):
    """Calcula o cosseno recebendo o ângulo em graus."""
    radianos = math.radians(graus)
    return math.cos(radianos)

def tangente(graus):
    """Calcula a tangente de um ângulo em graus."""
    radianos = math.radians(graus)
    return math.tan(radianos)

def logaritmo_natural(x):
    """Calcula o logaritmo natural (ln(x)). Exige x > 0."""
    if x <= 0:
        raise ValueError("O logaritmo só é definido para números maiores que zero!")
    return math.log(x)

def logaritmo_base10(x):
    """Calcula o logaritmo na base 10 (log10(x))."""
    if x <= 0:
        raise ValueError("O logaritmo só é definido para números maiores que zero!")
    return math.log10(x)

def raiz_quadrada(x):
    """Calcula a raiz quadrada de um número não-negativo."""
    if x < 0:
        raise ValueError("Não existe raiz quadrada real de número negativo!")
    return math.sqrt(x)

def potencia(base, expoente):
    """Calcula a base elevada ao expoente (base ** expoente)."""
    return math.pow(base, expoente)

def menu_cientifico():
    print("=" * 50)
    print("   🌸 CALCULADORA CIENTÍFICA PYTHON PINK 🌸")
    print("=" * 50)
    print("Constantes disponíveis: π = {:.6f}, e = {:.6f}".format(math.pi, math.e))
    
    while True:
        print("\\nEscolha a operação desejada:")
        print("  1. Seno (sen(x) em graus)")
        print("  2. Cosseno (cos(x) em graus)")
        print("  3. Tangente (tan(x) em graus)")
        print("  4. Logaritmo Natural ln(x)")
        print("  5. Logaritmo Base 10 log10(x)")
        print("  6. Raiz Quadrada √(x)")
        print("  7. Potência (x^y)")
        print("  8. Sair")
        
        opcao = input("\\nOpção (1 a 8): ").strip()
        if opcao == "8":
            print("\\n✨ Bons estudos científicos em Python! 💕")
            break
            
        try:
            if opcao == "1":
                ang = float(input("Digite o ângulo em graus (ex: 30, 45, 90): "))
                res = seno(ang)
                print(f"💖 sen({ang}°) = {res:.6f}")
                
            elif opcao == "2":
                ang = float(input("Digite o ângulo em graus (ex: 0, 60, 90): "))
                res = cosseno(ang)
                print(f"💖 cos({ang}°) = {res:.6f}")
                
            elif opcao == "3":
                ang = float(input("Digite o ângulo em graus (ex: 45): "))
                res = tangente(ang)
                print(f"💖 tan({ang}°) = {res:.6f}")
                
            elif opcao == "4":
                val = float(input("Digite o valor positivo para ln(x): "))
                res = logaritmo_natural(val)
                print(f"💖 ln({val}) = {res:.6f}")
                
            elif opcao == "5":
                val = float(input("Digite o valor positivo para log10(x): "))
                res = logaritmo_base10(val)
                print(f"💖 log10({val}) = {res:.6f}")
                
            elif opcao == "6":
                val = float(input("Digite o número para √(x): "))
                res = raiz_quadrada(val)
                print(f"💖 √({val}) = {res:.6f}")
                
            elif opcao == "7":
                base = float(input("Digite a base: "))
                exp = float(input("Digite o expoente: "))
                res = potencia(base, exp)
                print(f"💖 {base} ^ {exp} = {res}")
                
            else:
                print("❌ Opção inválida. Escolha de 1 a 8.")
                
        except ValueError as err:
            print(f"⚠️ Erro matemático ou de formato: {err}")
            
        print("-" * 50)

if __name__ == "__main__":
    menu_cientifico()
`,
  },
  {
    id: 'gui',
    title: '4. Calculadora Desktop Visual em Tons de Rosa (Tkinter)',
    filename: 'calculadora_rosa_gui.py',
    description: 'Interface gráfica moderna de verdade! Usa a biblioteca padrão Tkinter com paleta pink, botões arredondados e display digital. Não precisa instalar nada extra!',
    level: 'Avançado & Visual',
    code: `# ==========================================================
# 🌸 CALCULADORA DESKTOP EM TONS DE ROSA (PYTHON TKINTER) 🌸
# ==========================================================
# Para rodar este arquivo no seu computador:
# 1. Instale o Python (python.org)
# 2. Salve este arquivo como: calculadora_rosa_gui.py
# 3. Dê dois cliques ou execute no terminal: python calculadora_rosa_gui.py
# ==========================================================

import tkinter as tk
from tkinter import font as tkfont

class CalculadoraRosa(tk.Tk):
    def __init__(self):
        super().__init__()
        
        self.title("Calculadora Pink Edition 💕")
        self.geometry("340x480")
        self.resizable(False, False)
        
        # Paleta de Cores Rosa Moderna
        self.BG_COR = "#2A1828"          # Fundo escuro tom ameixa/vinho elegante
        self.DISPLAY_BG = "#3F243B"      # Fundo do display
        self.BTN_NUM_BG = "#FDF2F8"      # Rosa bem clarinho / blush para números
        self.BTN_NUM_FG = "#831843"      # Texto rosa escuro legível
        self.BTN_OP_BG = "#F472B6"       # Rosa vibrante para operações (+ - * /)
        self.BTN_OP_FG = "#FFFFFF"       # Texto branco contrastante
        self.BTN_EQ_BG = "#EC4899"       # Pink neon destaque para o botão de igual (=)
        self.BTN_EQ_FG = "#FFFFFF"
        self.BTN_CLEAR_BG = "#FBCFE8"    # Rosa suave para limpar
        self.BTN_CLEAR_FG = "#9D174D"
        
        self.configure(bg=self.BG_COR)
        
        self.expressao = ""
        self.criar_widgets()
        
    def criar_widgets(self):
        # Frame do Display
        display_frame = tk.Frame(self, bg=self.DISPLAY_BG, padx=15, pady=15)
        display_frame.pack(fill="x", padx=15, pady=15)
        
        # Label secundária de expressão
        self.lbl_expressao = tk.Label(
            display_frame,
            text="",
            font=("Segoe UI", 11),
            fg="#F9A8D4",
            bg=self.DISPLAY_BG,
            anchor="e"
        )
        self.lbl_expressao.pack(fill="x")
        
        # Label principal do resultado
        self.lbl_display = tk.Label(
            display_frame,
            text="0",
            font=("Segoe UI", 28, "bold"),
            fg="#FFFFFF",
            bg=self.DISPLAY_BG,
            anchor="e"
        )
        self.lbl_display.pack(fill="x")
        
        # Grid de Botões
        grid_frame = tk.Frame(self, bg=self.BG_COR)
        grid_frame.pack(fill="both", expand=True, padx=15, pady=5)
        
        botoes = [
            ("C", self.limpar, self.BTN_CLEAR_BG, self.BTN_CLEAR_FG),
            ("±", self.inverter_sinal, self.BTN_CLEAR_BG, self.BTN_CLEAR_FG),
            ("⌫", self.apagar_ultimo, self.BTN_CLEAR_BG, self.BTN_CLEAR_FG),
            ("÷", lambda: self.adicionar_operador("/"), self.BTN_OP_BG, self.BTN_OP_FG),
            
            ("7", lambda: self.adicionar_caractere("7"), self.BTN_NUM_BG, self.BTN_NUM_FG),
            ("8", lambda: self.adicionar_caractere("8"), self.BTN_NUM_BG, self.BTN_NUM_FG),
            ("9", lambda: self.adicionar_caractere("9"), self.BTN_NUM_BG, self.BTN_NUM_FG),
            ("×", lambda: self.adicionar_operador("*"), self.BTN_OP_BG, self.BTN_OP_FG),
            
            ("4", lambda: self.adicionar_caractere("4"), self.BTN_NUM_BG, self.BTN_NUM_FG),
            ("5", lambda: self.adicionar_caractere("5"), self.BTN_NUM_BG, self.BTN_NUM_FG),
            ("6", lambda: self.adicionar_caractere("6"), self.BTN_NUM_BG, self.BTN_NUM_FG),
            ("-", lambda: self.adicionar_operador("-"), self.BTN_OP_BG, self.BTN_OP_FG),
            
            ("1", lambda: self.adicionar_caractere("1"), self.BTN_NUM_BG, self.BTN_NUM_FG),
            ("2", lambda: self.adicionar_caractere("2"), self.BTN_NUM_BG, self.BTN_NUM_FG),
            ("3", lambda: self.adicionar_caractere("3"), self.BTN_NUM_BG, self.BTN_NUM_FG),
            ("+", lambda: self.adicionar_operador("+"), self.BTN_OP_BG, self.BTN_OP_FG),
            
            ("0", lambda: self.adicionar_caractere("0"), self.BTN_NUM_BG, self.BTN_NUM_FG),
            (".", lambda: self.adicionar_caractere("."), self.BTN_NUM_BG, self.BTN_NUM_FG),
            ("=", self.calcular, self.BTN_EQ_BG, self.BTN_EQ_FG),
        ]
        
        # Configurar proporção de colunas e linhas
        for c in range(4):
            grid_frame.columnconfigure(c, weight=1)
        for r in range(5):
            grid_frame.rowconfigure(r, weight=1)
            
        r = 0
        c = 0
        for texto, comando, bg_cor, fg_cor in botoes:
            if texto == "=":
                btn = tk.Button(
                    grid_frame, text=texto, font=("Segoe UI", 16, "bold"),
                    bg=bg_cor, fg=fg_cor, activebackground="#DB2777",
                    activeforeground="#FFFFFF", relief="flat", bd=0,
                    command=comando, cursor="hand2"
                )
                btn.grid(row=r, column=c, columnspan=2, sticky="nsew", padx=3, pady=3)
                c += 2
            else:
                btn = tk.Button(
                    grid_frame, text=texto, font=("Segoe UI", 14, "bold"),
                    bg=bg_cor, fg=fg_cor, activebackground="#FBCFE8",
                    activeforeground=fg_cor, relief="flat", bd=0,
                    command=comando, cursor="hand2"
                )
                btn.grid(row=r, column=c, sticky="nsew", padx=3, pady=3)
                c += 1
                if c > 3:
                    c = 0
                    r += 1

    def adicionar_caractere(self, char):
        if self.expressao == "0" and char != ".":
            self.expressao = char
        else:
            self.expressao += str(char)
        self.atualizar_display()
        
    def adicionar_operador(self, op):
        if not self.expressao:
            return
        if self.expressao[-1] in "+-*/":
            self.expressao = self.expressao[:-1] + op
        else:
            self.expressao += op
        self.atualizar_display()
        
    def limpar(self):
        self.expressao = ""
        self.lbl_expressao.config(text="")
        self.lbl_display.config(text="0")
        
    def apagar_ultimo(self):
        self.expressao = self.expressao[:-1]
        self.atualizar_display()
        
    def inverter_sinal(self):
        if not self.expressao:
            return
        try:
            val = float(eval(self.expressao))
            val = -val
            self.expressao = str(int(val)) if val.is_integer() else str(val)
            self.atualizar_display()
        except:
            self.expressao = "Erro"
            self.atualizar_display()
            
    def calcular(self):
        if not self.expressao:
            return
        try:
            # Proteção contra divisão por zero explícita
            if "/0" in self.expressao:
                self.lbl_display.config(text="Erro: Div por 0")
                self.expressao = ""
                return
                
            resultado = eval(self.expressao)
            # Formatar para número inteiro se não tiver casas decimais
            if isinstance(resultado, float) and resultado.is_integer():
                resultado = int(resultado)
                
            self.lbl_expressao.config(text=f"{self.expressao} =")
            self.lbl_display.config(text=str(resultado))
            self.expressao = str(resultado)
        except Exception:
            self.lbl_display.config(text="Erro de Sintaxe")
            self.expressao = ""
            
    def atualizar_display(self):
        texto = self.expressao if self.expressao else "0"
        self.lbl_display.config(text=texto)

if __name__ == "__main__":
    app = CalculadoraRosa()
    app.mainloop()
`,
  },
];

export function downloadPythonScript(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/x-python;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
