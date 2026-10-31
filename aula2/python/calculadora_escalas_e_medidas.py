# ==========================================================
# 🌸 CALCULADORA DE ESCALAS, MEDIDAS E DEMONSTRAÇÃO DE CONTAS 🌸
# ==========================================================
# Script Python Didático completo com:
# 1. Criação e Cálculo de Escalas (1:50, 1:100, miniaturas e mapas)
# 2. Conversões e Alterações de Medidas (comprimento, massa, área, temperatura)
# 3. Função de Demonstração Passo a Passo de Contas Matemáticas
# ==========================================================

import math

# Dicionário de conversão de comprimentos para metros
FATORES_METROS = {
    "mm": 0.001,
    "cm": 0.01,
    "m": 1.0,
    "km": 1000.0,
    "in": 0.0254,
    "ft": 0.3048,
}

# ----------------------------------------------------------
# 1. MÓDULO DE ESCALAS (ARQUITETURA, CARTOGRAFIA E MODELISMO)
# ----------------------------------------------------------

def calcular_desenho(medida_real, unidade_real, numerador, denominador, unidade_desenho="cm"):
    """
    Calcula quanto uma medida real medirá no papel ou na maquete.
    Fórmula: d = R * (numerador / denominador)
    """
    fator_origem = FATORES_METROS.get(unidade_real.lower(), 1.0)
    fator_destino = FATORES_METROS.get(unidade_desenho.lower(), 0.01)
    
    # 1. Converter medida real para metros
    real_em_metros = medida_real * fator_origem
    
    # 2. Aplicar fator de escala
    fator_escala = numerador / denominador
    desenho_em_metros = real_em_metros * fator_escala
    
    # 3. Converter para a unidade do desenho
    desenho_final = desenho_em_metros / fator_destino
    return desenho_final

def calcular_real(medida_desenho, unidade_desenho, numerador, denominador, unidade_real="m"):
    """
    Calcula quanto uma medida desenhada no papel representa na vida real.
    Fórmula: R = d * (denominador / numerador)
    """
    fator_origem = FATORES_METROS.get(unidade_desenho.lower(), 0.01)
    fator_destino = FATORES_METROS.get(unidade_real.lower(), 1.0)
    
    desenho_em_metros = medida_desenho * fator_origem
    real_em_metros = desenho_em_metros * (denominador / numerador)
    real_final = real_em_metros / fator_destino
    return real_final

def descobrir_escala(medida_real, unidade_real, medida_desenho, unidade_desenho):
    """
    Descobre e cria a escala canônica a partir de uma medida real e do papel.
    Fórmula: Escala = Desenho / Real
    """
    real_m = medida_real * FATORES_METROS.get(unidade_real.lower(), 1.0)
    desenho_m = medida_desenho * FATORES_METROS.get(unidade_desenho.lower(), 0.01)
    
    if real_m <= 0 or desenho_m <= 0:
        return None
    
    razao = desenho_m / real_m
    if razao <= 1:
        # Redução
        denominador = round(1 / razao, 2)
        return (1, denominador, f"1:{denominador}")
    else:
        # Ampliação
        numerador = round(razao, 2)
        return (numerador, 1, f"{numerador}:1")


# ----------------------------------------------------------
# 2. MÓDULO DE ALTERAÇÕES DE MEDIDAS (CONVERSÃO DE UNIDADES)
# ----------------------------------------------------------

def converter_temperatura(valor, de_escala, para_escala):
    """Converte entre Celsius, Fahrenheit e Kelvin."""
    de = de_escala.upper()
    para = para_escala.upper()
    
    # Para Celsius
    if de == "C":
        celsius = valor
    elif de == "F":
        celsius = (valor - 32) * 5 / 9
    elif de == "K":
        celsius = valor - 273.15
    else:
        return valor
    
    # De Celsius para destino
    if para == "C":
        return celsius
    elif para == "F":
        return (celsius * 9 / 5) + 32
    elif para == "K":
        return celsius + 273.15
    return celsius

def converter_comprimento(valor, de_unidade, para_unidade):
    """Converte distâncias entre mm, cm, m, km, polegadas e pés."""
    de_fator = FATORES_METROS.get(de_unidade.lower(), 1.0)
    para_fator = FATORES_METROS.get(para_unidade.lower(), 1.0)
    
    metros = valor * de_fator
    return metros / para_fator


# ----------------------------------------------------------
# 3. MÓDULO DE DEMONSTRAÇÃO DIDÁTICA DE CONTAS (PASSO A PASSO)
# ----------------------------------------------------------

def demonstrar_conta(operacao, a, b=None):
    """
    Imprime na tela a decomposição e o raciocínio completo da conta.
    """
    print("\n" + "="*50)
    print("📝 LOUSA DE DEMONSTRAÇÃO MATEMÁTICA PASSO A PASSO")
    print("="*50)
    
    if operacao == "+":
        resultado = a + b
        print(f"Conta: {a} + {b} = {resultado}")
        print("\nEtapas do Algoritmo Tradicional:")
        print(f"1. Alinhamos as ordens posicionais (unidades, dezenas e centenas).")
        print(f"2. Somamos coluna por coluna da direita para a esquerda.")
        print(f"3. Verificação comutativa: {b} + {a} = {resultado} ✔")
        print("\nVisualização Vertical:")
        print(f"   {a:10.2f}")
        print(f"+  {b:10.2f}")
        print(f"   {'-'*10}")
        print(f"   {resultado:10.2f}")
        
    elif operacao == "-":
        resultado = a - b
        print(f"Conta: {a} - {b} = {resultado}")
        print("\nEtapas do Algoritmo Tradicional:")
        print(f"1. Minuendo ({a}) menos o Subtraendo ({b}).")
        print(f"2. Decomposição de ordens (técnica do 'empresta um').")
        print(f"3. Prova Real: Diferença ({resultado}) + Subtraendo ({b}) = {resultado + b} ✔")
        print("\nVisualização Vertical:")
        print(f"   {a:10.2f}")
        print(f"-  {b:10.2f}")
        print(f"   {'-'*10}")
        print(f"   {resultado:10.2f}")
        
    elif operacao == "*":
        resultado = a * b
        print(f"Conta: {a} × {b} = {resultado}")
        print("\nEtapas do Algoritmo:")
        print(f"1. Multiplicamos {a} por {b} por adição repetida ou produtos parciais.")
        print(f"2. Propriedade Comutativa: {b} × {a} = {resultado} ✔")
        print(f"3. Elemento neutro da multiplicação: x * 1 = x.")
        print("\nVisualização Vertical:")
        print(f"   {a:10.2f}")
        print(f"×  {b:10.2f}")
        print(f"   {'-'*10}")
        print(f"   {resultado:10.2f}")
        
    elif operacao == "/":
        if b == 0:
            print(f"Conta: {a} ÷ 0")
            print("⚠️ ERRO MATEMÁTICO: Divisão por zero é estritamente indefinida!")
            print("Nenhum número multiplicado por 0 pode resultar no dividendo.")
            return
        resultado = a / b
        quociente_int = int(a // b)
        resto = a % b
        print(f"Conta: {a} ÷ {b} = {resultado}")
        print(f"\nDivisão Euclidiana (Método da Chave):")
        print(f"Dividendo = (Divisor × Quociente) + Resto")
        print(f"{a} = ({b} × {quociente_int}) + {resto}")
        print(f"Resultado com casas decimais: {resultado:.4f}")
        
    elif operacao == "^":
        resultado = a ** b
        print(f"Potenciação: {a} ^ {b} = {resultado}")
        print(f"Base: {a} | Expoente: {b}")
        print(f"Significa multiplicar o número {a} por si mesmo {b} vezes.")
        
    print("="*50 + "\n")


# ----------------------------------------------------------
# MENU INTERATIVO PARA EXECUÇÃO NO TERMINAL
# ----------------------------------------------------------

def menu():
    while True:
        print("\n🌸 ========================================= 🌸")
        print("  CALCULADORA PINK: ESCALAS, MEDIDAS E PASSOS  ")
        print("🌸 ========================================= 🌸")
        print("1. Calcular Medida no Papel (Real -> Desenho em Escala)")
        print("2. Calcular Medida Real (Desenho -> Realidade)")
        print("3. Criar / Descobrir Escala Proporcional")
        print("4. Alteração de Medidas (Comprimento e Temperatura)")
        print("5. Demonstração Passo a Passo de Conta (+, -, *, /, ^)")
        print("0. Sair")
        print("---------------------------------------------")
        
        opcao = input("Escolha uma opção (0-5): ").strip()
        
        if opcao == "0":
            print("Obrigado por usar a Calculadora Python Pink! 💕")
            break
            
        elif opcao == "1":
            try:
                r = float(input("Digite a medida real (ex: 12): "))
                u_r = input("Unidade real (m, cm, km, mm): ").strip() or "m"
                den = float(input("Denominador da escala (ex: 50 para 1:50): "))
                u_d = input("Unidade destino no papel (cm, mm): ").strip() or "cm"
                
                resp = calcular_desenho(r, u_r, 1, den, u_d)
                print(f"\n💖 Na escala 1:{int(den)}, {r} {u_r} medirá {resp:.2f} {u_d} no desenho!")
            except ValueError:
                print("⚠️ Entrada inválida! Digite apenas números.")
                
        elif opcao == "2":
            try:
                d = float(input("Digite a medida no papel (ex: 10): "))
                u_d = input("Unidade no papel (cm, mm): ").strip() or "cm"
                den = float(input("Denominador da escala (ex: 100 para 1:100): "))
                u_r = input("Unidade desejada na vida real (m, km): ").strip() or "m"
                
                resp = calcular_real(d, u_d, 1, den, u_r)
                print(f"\n💖 Na escala 1:{int(den)}, {d} {u_d} no papel representa {resp:.2f} {u_r} na vida real!")
            except ValueError:
                print("⚠️ Entrada inválida!")
                
        elif opcao == "3":
            try:
                r = float(input("Medida real existente (ex: 15): "))
                u_r = input("Unidade real (m, km): ").strip() or "m"
                d = float(input("Espaço disponível no papel (ex: 30): "))
                u_d = input("Unidade no papel (cm, mm): ").strip() or "cm"
                
                res = descobrir_escala(r, u_r, d, u_d)
                if res:
                    print(f"\n✨ Escala criada e recomendada: {res[2]}")
            except ValueError:
                print("⚠️ Entrada inválida!")
                
        elif opcao == "4":
            print("\nGrandezas disponíveis:")
            print("1. Comprimento (ex: m para cm, km para m)")
            print("2. Temperatura (C, F, K)")
            sub = input("Escolha (1 ou 2): ").strip()
            if sub == "1":
                v = float(input("Valor: "))
                de = input("De (mm, cm, m, km, in, ft): ").strip()
                para = input("Para (mm, cm, m, km, in, ft): ").strip()
                res = converter_comprimento(v, de, para)
                print(f"💖 {v} {de} = {res:.4f} {para}")
            elif sub == "2":
                v = float(input("Temperatura: "))
                de = input("De (C, F, K): ").strip()
                para = input("Para (C, F, K): ").strip()
                res = converter_temperatura(v, de, para)
                print(f"💖 {v}°{de} = {res:.2f}°{para}")
                
        elif opcao == "5":
            try:
                op = input("Operação (+, -, *, /, ^): ").strip()
                a = float(input("Primeiro número: "))
                b = float(input("Segundo número: "))
                demonstrar_conta(op, a, b)
            except ValueError:
                print("⚠️ Entrada inválida!")

if __name__ == "__main__":
    menu()

