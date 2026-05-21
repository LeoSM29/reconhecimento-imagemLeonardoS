// ============================================================
// DB helpers - simulates a db.json via localStorage
// ============================================================
const DB_KEYS = {
    users: 'users',
    todos: 'todos',
    currentUser: 'currentUser',
};

function dbGet(key) {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
}

function dbSet(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function initDB() {
    if (!localStorage.getItem(DB_KEYS.users)) dbSet(DB_KEYS.users, []);
    if (!localStorage.getItem(DB_KEYS.todos)) dbSet(DB_KEYS.todos, []);
}

// ============================================================
// Auth helpers
// ============================================================
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem(DB_KEYS.currentUser)) || null;
    } catch {
        return null;
    }
}

function setCurrentUser(user) {
    localStorage.setItem(DB_KEYS.currentUser, JSON.stringify(user));
}

function clearCurrentUser() {
    localStorage.removeItem(DB_KEYS.currentUser);
}

// ============================================================
// Screens
// ============================================================
const loginScreen = document.getElementById('login-screen');
const registerScreen = document.getElementById('register-screen');
const dashboardScreen = document.getElementById('dashboard-screen');

function showScreen(screen) {
    [loginScreen, registerScreen, dashboardScreen].forEach(s => s.classList.add('hidden-screen'));
    screen.classList.remove('hidden-screen');
}

// ============================================================
// Error helpers
// ============================================================
function showError(id, message) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = message;
    el.classList.add('visible');
}

function clearError(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = '';
    el.classList.remove('visible');
}

function clearFormErrors(prefix, fields) {
    fields.forEach(f => clearError(`${prefix}-${f}-error`));
    clearError(`${prefix}-global-error`);
}

// ============================================================
// Navigation links
// ============================================================
document.getElementById('go-to-register').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form').reset();
    clearFormErrors('login', ['email', 'password', 'global']);
    showScreen(registerScreen);
});

document.getElementById('go-to-login').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-form').reset();
    clearFormErrors('register', ['name', 'email', 'password', 'global']);
    showScreen(loginScreen);
});

// ============================================================
// Register
// ============================================================
document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    clearFormErrors('register', ['name', 'email', 'password', 'global']);

    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();

    let valid = true;

    if (!name) { showError('register-name-error', 'Informe seu nome.'); valid = false; }
    if (!email) { showError('register-email-error', 'Informe seu e-mail.'); valid = false; }
    if (!password) { showError('register-password-error', 'Crie uma senha.'); valid = false; }
    if (password && password.length < 6) { showError('register-password-error', 'A senha deve ter no mínimo 6 caracteres.'); valid = false; }

    if (!valid) return;

    const users = dbGet(DB_KEYS.users);
    if (users.find(u => u.email === email)) {
        showError('register-global-error', 'Este e-mail já está em uso.');
        return;
    }

    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    dbSet(DB_KEYS.users, users);

    document.getElementById('register-form').reset();
    clearFormErrors('register', ['name', 'email', 'password', 'global']);
    showScreen(loginScreen);
});

// ============================================================
// Login
// ============================================================
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    clearFormErrors('login', ['email', 'password', 'global']);

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    let valid = true;

    if (!email) { showError('login-email-error', 'Informe seu e-mail.'); valid = false; }
    if (!password) { showError('login-password-error', 'Informe sua senha.'); valid = false; }

    if (!valid) return;

    const users = dbGet(DB_KEYS.users);
    const user = users.find(u => u.email === email);

    if (!user) { showError('login-global-error', 'E-mail não cadastrado.'); return; }
    if (user.password !== password) { showError('login-global-error', 'Senha incorreta.'); return; }

    setCurrentUser({ id: user.id, name: user.name, email: user.email });
    document.getElementById('login-form').reset();
    loadDashboard();
});

// ============================================================
// Logout
// ============================================================
document.getElementById('logout-btn').addEventListener('click', () => {
    clearCurrentUser();
    showScreen(loginScreen);
});

// ============================================================
// Dashboard
// ============================================================
function loadDashboard() {
    const user = getCurrentUser();
    if (!user) { showScreen(loginScreen); return; }

    const nameParts = user.name.split(' ');
    const initials = nameParts.length >= 2
        ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
        : user.name.slice(0, 2).toUpperCase();

    document.getElementById('user-display-name').textContent = user.name;
    document.getElementById('user-avatar').textContent = initials;

    showScreen(dashboardScreen);
    renderTodos();
}

// ============================================================
// Todo form
// ============================================================
document.getElementById('todo-form').addEventListener('submit', (e) => {
    e.preventDefault();
    clearError('todo-title-error');

    const title = document.getElementById('todo-title').value.trim();
    const type = document.getElementById('todo-type').value;
    const description = document.getElementById('todo-description').value.trim();

    if (!title) {
        showError('todo-title-error', 'O título da tarefa é obrigatório.');
        return;
    }

    const user = getCurrentUser();
    if (!user) return;

    const todos = dbGet(DB_KEYS.todos);
    todos.push({
        id: Date.now().toString(),
        userId: user.email,
        title,
        type,
        description,
        done: false,
    });
    dbSet(DB_KEYS.todos, todos);

    document.getElementById('todo-form').reset();
    renderTodos();
});

// ============================================================
// Toggle done
// ============================================================
function toggleTodo(id) {
    const todos = dbGet(DB_KEYS.todos);
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) return;
    todos[index].done = !todos[index].done;
    dbSet(DB_KEYS.todos, todos);
    renderTodos();
}

// ============================================================
// Delete todo
// ============================================================
function deleteTodo(id) {
    let todos = dbGet(DB_KEYS.todos);
    todos = todos.filter(t => t.id !== id);
    dbSet(DB_KEYS.todos, todos);
    renderTodos();
}

// ============================================================
// Badge config
// ============================================================
const TYPE_CONFIG = {
    work:     { label: 'Trabalho', badgeClass: 'badge-work' },
    personal: { label: 'Pessoal',  badgeClass: 'badge-personal' },
    study:    { label: 'Estudos',  badgeClass: 'badge-study' },
};

function buildBadge(type) {
    const config = TYPE_CONFIG[type] || { label: type, badgeClass: '' };
    return `<span class="badge ${config.badgeClass}">${config.label}</span>`;
}

// ============================================================
// Render todos
// ============================================================
function renderTodos() {
    const user = getCurrentUser();
    if (!user) return;

    const allTodos = dbGet(DB_KEYS.todos);
    const userTodos = allTodos.filter(t => t.userId === user.email);

    const pending = userTodos.filter(t => !t.done);
    const done = userTodos.filter(t => t.done);
    const sorted = [...pending, ...done];

    const container = document.getElementById('todo-list');
    const counter = document.getElementById('task-counter');

    counter.textContent = `${pending.length} pendente${pending.length !== 1 ? 's' : ''} · ${done.length} concluída${done.length !== 1 ? 's' : ''}`;

    if (sorted.length === 0) {
        container.innerHTML = `
            <div class="glass-card empty-state">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <p>Nenhuma tarefa cadastrada ainda.</p>
                <span>Adicione sua primeira tarefa acima.</span>
            </div>
        `;
        return;
    }

    container.innerHTML = sorted.map(todo => {
        const doneClass = todo.done ? 'task-done' : '';
        const btnLabel = todo.done ? 'Reabrir' : 'Concluir';
        const btnClass = todo.done ? 'btn-danger' : 'btn-success';
        const descHtml = todo.description
            ? `<p class="task-description">${escapeHtml(todo.description)}</p>`
            : '';

        return `
            <div class="glass-card task-card ${doneClass}" id="task-${todo.id}" role="listitem">
                <div class="task-inner">
                    <div class="task-content">
                        <div class="task-meta">
                            <h3 class="task-title">${escapeHtml(todo.title)}</h3>
                            ${buildBadge(todo.type)}
                        </div>
                        ${descHtml}
                    </div>
                    <div class="task-actions">
                        <button
                            onclick="toggleTodo('${todo.id}')"
                            class="${btnClass}"
                            aria-label="${btnLabel} tarefa: ${escapeHtml(todo.title)}"
                        >${btnLabel}</button>
                        <button
                            onclick="deleteTodo('${todo.id}')"
                            class="btn-icon"
                            title="Remover tarefa"
                            aria-label="Remover tarefa: ${escapeHtml(todo.title)}"
                        >
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

// ============================================================
// Boot
// ============================================================
initDB();

const savedUser = getCurrentUser();
if (savedUser) {
    loadDashboard();
} else {
    showScreen(loginScreen);
}
