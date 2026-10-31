# ==========================================================
# 🌸 CALCULADORA BÁSICA EM PYTHON - PINK EDITION 🌸
# ==========================================================
# Realiza as quatro operações matemáticas fundamentais:
# 1. Soma (+)        2. Subtração (-)
# 3. Multiplicação (*)  4. Divisão (/)
# ==========================================================

print("✨ Bem-vinda à Calculadora Python Pink! ✨")
print("------------------------------------------")

# 1. ENTRADA DE DADOS:
# input() lê o que o usuário digita no teclado.
# float() converte o texto para número decimal (ex: 10 ou 5.5).
num1 = float(input("Digite o primeiro número: "))

print("\nEscolha a operação matemática:")
print(" +  para Somar")
print(" -  para Subtrair")
print(" *  para Multiplicar")
print(" /  para Dividir")
operacao = input("Digite a operação desejada (+, -, *, /): ")

num2 = float(input("\nDigite o segundo número: "))

# 2. PROCESSAMENTO E TOMADA DE DECISÃO (if / elif / else):
print("\n------------------------------------------")

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
