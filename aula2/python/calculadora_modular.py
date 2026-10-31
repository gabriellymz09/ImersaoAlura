# ==========================================================
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
        print("\nSelecione uma opção:")
        print("  1. Somar (+)")
        print("  2. Subtrair (-)")
        print("  3. Multiplicação (*)")
        print("  4. Divisão (/)")
        print("  5. Sair do Programa")
        
        opcao = input("\nDigite o número da opção (1 a 5): ").strip()
        
        if opcao == "5":
            print("\n✨ Até a próxima! Bons estudos em Python! 💕")
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
                
            print(f"\n💖 CÁLCULO: {num1} {simbolo} {num2} = {res}")
            
        except ValueError:
            print("❌ Erro de Entrada: Por favor, digite apenas números válidos!")
        except ZeroDivisionError as erro:
            print(f"⚠️ {erro}")
            
        print("-" * 45)

# Ponto de entrada padrão em Python:
if __name__ == "__main__":
    executar_calculadora()
