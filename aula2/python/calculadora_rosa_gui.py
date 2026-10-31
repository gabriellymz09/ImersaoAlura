# ==========================================================
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
