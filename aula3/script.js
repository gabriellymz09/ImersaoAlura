/**
 * ====================================================================
 * APLICAÇÃO DE LISTA DE TAREFAS (TO-DO LIST) 🌸
 * ====================================================================
 * Este arquivo contém toda a lógica e interatividade do nosso projeto.
 * Ele foi estruturado em passos simples para facilitar o aprendizado:
 *
 * 1. SELEÇÃO DOS ELEMENTOS DO HTML (DOM)
 * 2. ESTADO DA APLICAÇÃO (Onde guardamos os dados)
 * 3. ARMAZENAMENTO LOCAL (Salvar e carregar no navegador - localStorage)
 * 4. FUNÇÕES PRINCIPAIS (Adicionar, Concluir, Remover, Filtrar)
 * 5. ATUALIZAÇÃO DA TELA (Renderização do HTML)
 * 6. OUVINTES DE EVENTOS (Reagir a cliques e envios)
 * ====================================================================
 */

// --------------------------------------------------------------------
// PASSO 1: SELECIONAR OS ELEMENTOS DO HTML
// Usamos o "document.getElementById" para pegar cada parte do HTML pelo seu ID
// --------------------------------------------------------------------
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const tasksCounter = document.getElementById('tasks-counter');
const clearCompletedBtn = document.getElementById('clear-completed-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const currentDateEl = document.getElementById('current-date');

// --------------------------------------------------------------------
// PASSO 2: ESTADO DA APLICAÇÃO
// O "estado" são as variáveis que guardam as informações do aplicativo:
// - `todos`: lista com todos os objetos de tarefas
// - `currentFilter`: filtro ativo no momento ('all', 'pending', 'completed')
// --------------------------------------------------------------------
let todos = [];
let currentFilter = 'all';

// --------------------------------------------------------------------
// PASSO 3: PERSISTÊNCIA COM LOCALSTORAGE
// O localStorage permite salvar dados no próprio navegador do usuário,
// assim as tarefas não somem quando a página for recarregada (F5).
// --------------------------------------------------------------------

/**
 * Salva a lista de tarefas atual no localStorage em formato de texto (JSON)
 */
function saveTodosToStorage() {
    localStorage.setItem('my_pink_todos', JSON.stringify(todos));
}

/**
 * Carrega as tarefas salvas anteriormente do localStorage
 */
function loadTodosFromStorage() {
    const saved = localStorage.getItem('my_pink_todos');
    if (saved) {
        todos = JSON.parse(saved);
    } else {
        // Tarefas de exemplo para demonstrar logo na primeira abertura
        todos = [
            { id: 1, text: 'Aprender como o HTML e CSS funcionam juntos 💻', completed: true },
            { id: 2, text: 'Entender a lógica do JavaScript 🧠', completed: false },
            { id: 3, text: 'Celebrar minhas primeiras linhas de código! 🌸', completed: false }
        ];
    }
}

// --------------------------------------------------------------------
// PASSO 4: FUNÇÕES PRINCIPAIS (Ações do Usuário)
// --------------------------------------------------------------------

/**
 * Adiciona uma nova tarefa à lista
 * @param {string} text - O texto digitado pelo usuário
 */
function addTodo(text) {
    const trimmedText = text.trim();
    if (!trimmedText) return; // Evita adicionar tarefas vazias

    // Criamos um novo objeto de tarefa
    const newTodo = {
        id: Date.now(),          // Usamos o timestamp atual como identificador único
        text: trimmedText,       // Texto da tarefa
        completed: false         // Começa como não concluída
    };

    // Adiciona a nova tarefa no início da lista
    todos.unshift(newTodo);

    // Salva no navegador e atualiza o que é visto na tela
    saveTodosToStorage();
    renderTodos();
}

/**
 * Alterna o status da tarefa entre concluída e pendente
 * @param {number} id - O ID da tarefa a ser alternada
 */
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });

    saveTodosToStorage();
    renderTodos();
}

/**
 * Remove uma tarefa da lista pelo seu ID
 * @param {number} id - O ID da tarefa a ser removida
 */
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);

    saveTodosToStorage();
    renderTodos();
}

/**
 * Remove todas as tarefas que estão marcadas como concluídas
 */
function clearCompleted() {
    todos = todos.filter(todo => !todo.completed);

    saveTodosToStorage();
    renderTodos();
}

// Tornamos as funções acessíveis globalmente no navegador para o onclick
window.toggleTodo = toggleTodo;
window.deleteTodo = deleteTodo;

// --------------------------------------------------------------------
// PASSO 5: RENDERIZAR NA TELA (Construir o HTML visual)
// --------------------------------------------------------------------

/**
 * Desenha as tarefas na tela de acordo com o filtro selecionado
 */
function renderTodos() {
    // 1. Filtra as tarefas dependendo do filtro selecionado
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'pending') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true; // Se for 'all', traz todas
    });

    // 2. Limpa a lista atual para recriar
    todoList.innerHTML = '';

    // 3. Mostra ou esconde o aviso de lista vazia
    if (filteredTodos.length === 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
    }

    // 4. Cria o elemento HTML de cada tarefa
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <div class="todo-content" onclick="toggleTodo(${todo.id})" title="Clique para ${todo.completed ? 'reabrir' : 'concluir'} esta tarefa">
                <span class="custom-checkbox">
                    <i class="ph ph-check-bold"></i>
                </span>
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                ${todo.completed ? '<span class="status-badge"><i class="ph ph-check-circle"></i> Concluída</span>' : ''}
            </div>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})" title="Remover tarefa">
                <i class="ph ph-trash"></i>
            </button>
        `;

        todoList.appendChild(li);
    });

    // 5. Atualiza o contador de tarefas
    updateTasksCounter();
}

/**
 * Atualiza o texto do contador de tarefas restantes
 */
function updateTasksCounter() {
    const pendingCount = todos.filter(t => !t.completed).length;
    const totalCount = todos.length;

    if (totalCount === 0) {
        tasksCounter.textContent = 'Nenhuma tarefa';
    } else if (pendingCount === 0) {
        tasksCounter.textContent = '🎉 Tudo pronto!';
    } else {
        tasksCounter.textContent = `${pendingCount} pendente${pendingCount > 1 ? 's' : ''}`;
    }
}

/**
 * Função utilitária para evitar injeção de HTML malicioso (Segurança Básica)
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Exibe a data de hoje formatada em português no cabeçalho
 */
function displayCurrentDate() {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const today = new Date().toLocaleDateString('pt-BR', options);
    
    // Deixar a primeira letra em maiúscula
    const formattedDate = today.charAt(0).toUpperCase() + today.slice(1);
    currentDateEl.textContent = formattedDate;
}

// --------------------------------------------------------------------
// PASSO 6: OUVINTES DE EVENTOS (Interatividade)
// --------------------------------------------------------------------

// Evento de envio do formulário (quando o usuário clica em "Adicionar" ou aperta Enter)
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o recarregamento padrão da página

    addTodo(todoInput.value);
    todoInput.value = ''; // Limpa o campo de digitação
    todoInput.focus();   // Devolve o foco para o campo
});

// Evento do botão "Limpar concluídas"
clearCompletedBtn.addEventListener('click', () => {
    clearCompleted();
});

// Eventos de clique nas abas de filtro ('Todas', 'Pendentes', 'Concluídas')
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove a classe 'active' de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Adiciona a classe 'active' no botão que foi clicado
        button.classList.add('active');

        // Atualiza a variável de filtro e redesenha a lista
        currentFilter = button.dataset.filter;
        renderTodos();
    });
});

// --------------------------------------------------------------------
// INICIALIZAÇÃO DA APLICAÇÃO
// Executado assim que a página é carregada
// --------------------------------------------------------------------
displayCurrentDate();
loadTodosFromStorage();
renderTodos();
