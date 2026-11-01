/**
 * Suíte de Testes Automatizados para a Lista de Tarefas (aula3)
 * Executada com Node.js usando o módulo nativo node:test, node:assert e vm
 */
const { test, describe, beforeEach } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Mock do ambiente de Navegador (DOM & localStorage)
class LocalStorageMock {
    constructor() {
        this.store = {};
    }
    getItem(key) {
        return this.store[key] || null;
    }
    setItem(key, value) {
        this.store[key] = String(value);
    }
    removeItem(key) {
        delete this.store[key];
    }
    clear() {
        this.store = {};
    }
}

class DOMElementMock {
    constructor(tagName = 'div', id = '') {
        this.tagName = tagName;
        this.id = id;
        this._classes = new Set();
        this._innerHTML = '';
        const self = this;
        this.classList = {
            add: (cls) => self._classes.add(cls),
            remove: (cls) => self._classes.delete(cls),
            contains: (cls) => self._classes.has(cls)
        };
        this.textContent = '';
        this.value = '';
        this.children = [];
        this.eventListeners = {};
        this.dataset = {};
    }

    get className() {
        return Array.from(this._classes).join(' ');
    }

    set className(val) {
        this._classes = new Set(val.split(' ').filter(Boolean));
    }

    get innerHTML() {
        return this._innerHTML;
    }

    set innerHTML(val) {
        this._innerHTML = val;
        if (val === '') {
            this.children = [];
        }
    }

    appendChild(child) {
        this.children.push(child);
    }

    addEventListener(event, callback) {
        if (!this.eventListeners[event]) {
            this.eventListeners[event] = [];
        }
        this.eventListeners[event].push(callback);
    }

    dispatchEvent(event) {
        const list = this.eventListeners[event.type] || [];
        list.forEach(cb => cb(event));
    }

    focus() {}
}

function createTestEnvironment() {
    const localStorage = new LocalStorageMock();
    
    const elements = {
        'todo-form': new DOMElementMock('form', 'todo-form'),
        'todo-input': new DOMElementMock('input', 'todo-input'),
        'todo-list': new DOMElementMock('ul', 'todo-list'),
        'empty-state': new DOMElementMock('div', 'empty-state'),
        'tasks-counter': new DOMElementMock('div', 'tasks-counter'),
        'clear-completed-btn': new DOMElementMock('button', 'clear-completed-btn'),
        'current-date': new DOMElementMock('p', 'current-date'),
    };

    const filterBtns = [
        new DOMElementMock('button'),
        new DOMElementMock('button'),
        new DOMElementMock('button')
    ];
    filterBtns[0].dataset.filter = 'all';
    filterBtns[1].dataset.filter = 'pending';
    filterBtns[2].dataset.filter = 'completed';

    const documentMock = {
        getElementById: (id) => elements[id] || new DOMElementMock('div', id),
        querySelectorAll: (selector) => {
            if (selector === '.filter-btn') return filterBtns;
            return [];
        },
        createElement: (tag) => new DOMElementMock(tag)
    };

    const context = {
        console,
        Date,
        localStorage,
        document: documentMock,
        JSON
    };
    context.window = context;

    vm.createContext(context);

    // Carrega script.js no contexto
    const scriptPath = path.join(__dirname, 'script.js');
    const scriptCode = fs.readFileSync(scriptPath, 'utf-8');
    vm.runInContext(scriptCode, context);

    // Helpers para interagir com o escopo do script
    return {
        evalInContext: (code) => vm.runInContext(code, context),
        getTodos: () => vm.runInContext('todos', context),
        setTodos: (list) => {
            context._temp = list;
            vm.runInContext('todos = _temp;', context);
        },
        setFilter: (filter) => {
            context._tempFilter = filter;
            vm.runInContext('currentFilter = _tempFilter;', context);
        },
        localStorage,
        elements,
        filterBtns
    };
}

describe('Testes da Aplicação To-Do List (aula3)', () => {
    let env;

    beforeEach(() => {
        env = createTestEnvironment();
    });

    test('1. Deve carregar com 3 tarefas padrão e data preenchida', () => {
        const todos = env.getTodos();
        assert.strictEqual(todos.length, 3, 'Deveria carregar 3 tarefas iniciais padrão');
        assert.ok(env.elements['current-date'].textContent.length > 0, 'Data atual deve ser preenchida');
    });

    test('2. Deve adicionar uma nova tarefa válida', () => {
        const totalInicial = env.getTodos().length;
        env.evalInContext("addTodo('Estudar JavaScript moderno')");

        const todos = env.getTodos();
        assert.strictEqual(todos.length, totalInicial + 1, 'Deve incrementar o número de tarefas');
        assert.strictEqual(todos[0].text, 'Estudar JavaScript moderno', 'A nova tarefa deve estar no início');
        assert.strictEqual(todos[0].completed, false, 'Nova tarefa deve iniciar como pendente');
    });

    test('3. Não deve adicionar tarefas vazias ou com apenas espaços', () => {
        const totalAntes = env.getTodos().length;
        env.evalInContext("addTodo('   ')");
        env.evalInContext("addTodo('')");
        assert.strictEqual(env.getTodos().length, totalAntes, 'Total de tarefas não deve mudar');
    });

    test('4. Deve alternar status de conclusão (toggleTodo)', () => {
        env.evalInContext("addTodo('Testar funcionalidade de toggle')");
        const id = env.getTodos()[0].id;
        assert.strictEqual(env.getTodos()[0].completed, false);

        // Marca como concluída
        env.evalInContext(`toggleTodo(${id})`);
        let tarefa = env.getTodos().find(t => t.id === id);
        assert.strictEqual(tarefa.completed, true, 'Tarefa deve estar como concluída');

        // Alterna de volta para pendente
        env.evalInContext(`toggleTodo(${id})`);
        tarefa = env.getTodos().find(t => t.id === id);
        assert.strictEqual(tarefa.completed, false, 'Tarefa deve voltar a ser pendente');
    });

    test('5. Renderização visual: Tarefas concluídas devem ter classe "completed" e etiqueta status-badge', () => {
        env.setTodos([
            { id: 101, text: 'Tarefa Pendente', completed: false },
            { id: 102, text: 'Tarefa Concluída', completed: true }
        ]);

        env.evalInContext('renderTodos()');

        const todoList = env.elements['todo-list'];
        assert.strictEqual(todoList.children.length, 2, 'Deveria renderizar 2 itens');

        const itemPendente = todoList.children[0];
        const itemConcluido = todoList.children[1];

        // Item pendente não deve ter classe completed e nem status-badge
        assert.ok(!itemPendente.className.includes('completed'), 'Item pendente não deve ter classe completed');
        assert.ok(!itemPendente.innerHTML.includes('status-badge'), 'Item pendente não deve conter a etiqueta status-badge');

        // Item concluído DEVE ter classe completed e a etiqueta status-badge
        assert.ok(itemConcluido.className.includes('completed'), 'Item concluído deve conter classe completed');
        assert.ok(itemConcluido.innerHTML.includes('status-badge'), 'Item concluído deve conter a etiqueta status-badge');
        assert.ok(itemConcluido.innerHTML.includes('Concluída'), 'Etiqueta deve conter o texto Concluída');
    });

    test('6. Deve remover uma tarefa por ID (deleteTodo)', () => {
        env.evalInContext("addTodo('Tarefa a ser deletada')");
        const id = env.getTodos()[0].id;
        const totalAntes = env.getTodos().length;

        env.evalInContext(`deleteTodo(${id})`);

        assert.strictEqual(env.getTodos().length, totalAntes - 1, 'Total de tarefas deve diminuir');
        assert.strictEqual(env.getTodos().find(t => t.id === id), undefined, 'Tarefa não deve mais existir');
    });

    test('7. Deve limpar todas as tarefas concluídas (clearCompleted)', () => {
        env.setTodos([
            { id: 1, text: 'Pendente 1', completed: false },
            { id: 2, text: 'Concluída 1', completed: true },
            { id: 3, text: 'Pendente 2', completed: false },
            { id: 4, text: 'Concluída 2', completed: true }
        ]);

        env.evalInContext('clearCompleted()');

        const restantes = env.getTodos();
        assert.strictEqual(restantes.length, 2, 'Restam apenas as 2 pendentes');
        assert.ok(restantes.every(t => !t.completed), 'Todas as tarefas restantes devem ser pendentes');
    });

    test('8. Deve filtrar tarefas corretamente (all, pending, completed)', () => {
        env.setTodos([
            { id: 1, text: 'Tarefa 1', completed: false },
            { id: 2, text: 'Tarefa 2', completed: true },
            { id: 3, text: 'Tarefa 3', completed: false }
        ]);

        const todoList = env.elements['todo-list'];

        // Filtro: all
        env.setFilter('all');
        env.evalInContext('renderTodos()');
        assert.strictEqual(todoList.children.length, 3, 'Filtro all deve listar 3 tarefas');

        // Filtro: pending
        env.setFilter('pending');
        env.evalInContext('renderTodos()');
        assert.strictEqual(todoList.children.length, 2, 'Filtro pending deve listar 2 tarefas');

        // Filtro: completed
        env.setFilter('completed');
        env.evalInContext('renderTodos()');
        assert.strictEqual(todoList.children.length, 1, 'Filtro completed deve listar 1 tarefa');
    });

    test('9. Deve persistir e recuperar dados no localStorage', () => {
        env.setTodos([{ id: 999, text: 'Persistente', completed: false }]);
        env.evalInContext('saveTodosToStorage()');

        const dadosNoStorage = JSON.parse(env.localStorage.getItem('my_pink_todos'));
        assert.strictEqual(dadosNoStorage.length, 1);
        assert.strictEqual(dadosNoStorage[0].text, 'Persistente');

        // Limpa lista em memória e recarrega do storage
        env.setTodos([]);
        env.evalInContext('loadTodosFromStorage()');
        assert.strictEqual(env.getTodos().length, 1);
        assert.strictEqual(env.getTodos()[0].text, 'Persistente');
    });

    test('10. Formulário: Submissão via evento submit deve adicionar tarefa e limpar o input', () => {
        const form = env.elements['todo-form'];
        const input = env.elements['todo-input'];

        input.value = 'Nova tarefa pelo formulário';
        const initialCount = env.getTodos().length;

        // Dispara o evento de submit
        form.dispatchEvent({ type: 'submit', preventDefault: () => {} });

        assert.strictEqual(env.getTodos().length, initialCount + 1);
        assert.strictEqual(env.getTodos()[0].text, 'Nova tarefa pelo formulário');
        assert.strictEqual(input.value, '', 'Input deve ser limpo após adicionar');
    });

    test('11. Contador de tarefas: Deve atualizar corretamente o status', () => {
        env.setTodos([
            { id: 1, text: 'Pendente', completed: false },
            { id: 2, text: 'Concluída', completed: true }
        ]);
        env.evalInContext('renderTodos()');
        assert.strictEqual(env.elements['tasks-counter'].textContent, '1 pendente');

        // Ambas concluídas
        env.setTodos([
            { id: 1, text: 'Pendente', completed: true },
            { id: 2, text: 'Concluída', completed: true }
        ]);
        env.evalInContext('renderTodos()');
        assert.strictEqual(env.elements['tasks-counter'].textContent, '🎉 Tudo pronto!');

        // Nenhuma tarefa
        env.setTodos([]);
        env.evalInContext('renderTodos()');
        assert.strictEqual(env.elements['tasks-counter'].textContent, 'Nenhuma tarefa');
    });

    test('12. Segurança: Deve escapar caracteres HTML para prevenir injeção (XSS)', () => {
        const escapado = env.evalInContext("escapeHtml('<img src=x onerror=alert(1)>')");
        assert.strictEqual(escapado.includes('<script>'), false);
        assert.ok(!escapado.includes('<img'));
    });
});
