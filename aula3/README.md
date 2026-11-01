# 🌸 Minha Lista de Tarefas (To-Do List)

---

## 🎨 Design e Identidade Visual

- **Tema:** Tons de rosa (Rose / Pink Pastel & Vibrant Accent).
- **Estilo:** Visual contemporâneo com cantos arredondados, sombras suaves (_soft shadows_), tipografia limpa (**Poppins** via Google Fonts) e ícones minimalistas (**Phosphor Icons**).
- **Diferenciação Visual Inteligente:** Tarefas pendentes possuem barra lateral em rosa vibrante e texto nítido; ao serem concluídas, recebem uma etiqueta (_badge_) estilizada `✓ Concluída`, texto riscado com espessura rosa, estilo em itálico e atenuação suave de fundo e opacidade.
- **Responsivo:** Funciona perfeitamente tanto no computador quanto em telas de celular.

---

## 📂 Como o Projeto Está Organizado?

Para facilitar seu aprendizado, separamos o projeto no modelo clássico da web (**HTML, CSS e JavaScript**):

```
aula3/
│
├── index.html    # A estrutura (esqueleto da página)
├── style.css     # O visual (cores, espaçamentos, fontes e animações)
├── script.js     # O comportamento (lógica, cliques, adicionar e remover itens)
└── README.md     # Este guia explicativo
```

### 1. `index.html` (A Estrutura)

O HTML é a base da aplicação. Nele definimos:

- O cabeçalho com o título e a data de hoje.
- O formulário com o campo de texto `<input>` e o botão de adicionar.
- A barra de filtros (_Todas_, _Pendentes_, _Concluídas_) e o contador.
- A lista `<ul>` onde as tarefas serão inseridas dinamicamente pelo JavaScript.

### 2. `style.css` (O Design)

No topo do arquivo CSS, você encontrará a seção `:root` com todas as **variáveis de cores**. Você pode alterar os códigos hexadecimais (ex: `#ec4899`) para mudar as cores da aplicação facilmente!

Principais conceitos utilizados:

- **Flexbox**: para alinhar os elementos lado a lado ou em coluna.
- **Transições (`transition`)**: para dar suavidade ao passar o mouse ou clicar em botões.
- **Scrollbar personalizada**: barra de rolagem estilizada em tons de rosa.

### 3. `script.js` (A Interatividade)

O JavaScript é o "cérebro" da aplicação. O código está dividido didaticamente em 6 partes:

1. **Seleção de Elementos (DOM):** Como capturar os botões e campos do HTML.
2. **Estado (State):** Um Array de objetos onde guardamos as tarefas (`[{ id, text, completed }]`).
3. **Persistência (`localStorage`):** Salva as tarefas no navegador para que elas não se percam ao atualizar a página (F5).
4. **Funções Principais:** `addTodo()`, `toggleTodo()`, `deleteTodo()`, `clearCompleted()`.
5. **Renderização (`renderTodos`):** Função que desenha o HTML de cada tarefa na tela.
6. **Ouvintes de Eventos (`addEventListener`):** Ouve cliques e o envio do formulário.

### 4. `tests.js` (Testes Automatizados)

Uma suíte completa de testes unitários e de integração utilizando o executor nativo do Node.js (`node:test` e `node:assert`) para assegurar que todas as funcionalidades e a renderização continuem funcionando com qualidade profissional.

---

## 🧪 Como Executar os Testes Automatizados

Abra o terminal (PowerShell ou Prompt de Comando) na pasta `aula3` e execute:

```bash
node tests.js
```

Você verá a validação em tempo real de cada uma das 12 funcionalidades da aplicação.

---
