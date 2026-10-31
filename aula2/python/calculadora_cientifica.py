# ==========================================================
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
        print("\nEscolha a operação desejada:")
        print("  1. Seno (sen(x) em graus)")
        print("  2. Cosseno (cos(x) em graus)")
        print("  3. Tangente (tan(x) em graus)")
        print("  4. Logaritmo Natural ln(x)")
        print("  5. Logaritmo Base 10 log10(x)")
        print("  6. Raiz Quadrada √(x)")
        print("  7. Potência (x^y)")
        print("  8. Sair")
        
        opcao = input("\nOpção (1 a 8): ").strip()
        if opcao == "8":
            print("\n✨ Bons estudos científicos em Python! 💕")
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
