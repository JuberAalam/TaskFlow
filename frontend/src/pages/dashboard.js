// Dashboard Page Logic
let currentPage = 1;
let currentFilters = {};

function showDashboard() {
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';

    initializeDashboard();
}

async function initializeDashboard() {
    const user = Auth.getUser();
    
    // Display user info
    document.getElementById('user-info').textContent = `👤 ${user.name} (${user.role})`;

    // Show stats section for admin
    if (Auth.isAdmin()) {
        document.getElementById('stats-section').style.display = 'block';
        loadStats();
    }

    // Load tasks
    loadTasks();

    // Setup event listeners
    setupDashboardListeners();
}

// Setup event listeners
function setupDashboardListeners() {
    // Logout
    document.getElementById('logout-btn').addEventListener('click', () => {
        Auth.logout();
    });

    // Create task form
    document.getElementById('createTaskForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const taskData = {
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-description').value,
            priority: document.getElementById('task-priority').value,
            status: document.getElementById('task-status').value,
            dueDate: document.getElementById('task-dueDate').value || undefined
        };

        try {
            await API.tasks.create(taskData);
            Toast.success('Task created successfully!');
            
            // Reset form
            e.target.reset();
            
            // Reload tasks
            loadTasks();
            
            // Reload stats if admin
            if (Auth.isAdmin()) {
                loadStats();
            }
        } catch (error) {
            Toast.error(error.message || 'Failed to create task');
        }
    });

    // Apply filters
    document.getElementById('apply-filters').addEventListener('click', () => {
        const status = document.getElementById('filter-status').value;
        const priority = document.getElementById('filter-priority').value;

        currentFilters = {};
        if (status) currentFilters.status = status;
        if (priority) currentFilters.priority = priority;

        currentPage = 1;
        loadTasks();
    });
}

// Load tasks
async function loadTasks(page = 1) {
    try {
        const params = {
            ...currentFilters,
            page,
            limit: 6
        };

        const response = await API.tasks.getAll(params);
        
        // Clear tasks list
        const tasksList = document.getElementById('tasks-list');
        tasksList.innerHTML = '';

        if (response.data.length === 0) {
            tasksList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #6b7280;">No tasks found. Create your first task!</p>';
            return;
        }

        // Render tasks
        response.data.forEach(task => {
            const taskCard = createTaskCard(task);
            tasksList.appendChild(taskCard);
        });

        // Render pagination
        renderPagination(response.page, response.pages);

    } catch (error) {
        Toast.error(error.message || 'Failed to load tasks');
    }
}

// Render pagination
function renderPagination(currentPage, totalPages) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    if (totalPages <= 1) return;

    // Previous button
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Previous';
        prevBtn.addEventListener('click', () => loadTasks(currentPage - 1));
        pagination.appendChild(prevBtn);
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = i === currentPage ? 'active' : '';
        pageBtn.addEventListener('click', () => loadTasks(i));
        pagination.appendChild(pageBtn);
    }

    // Next button
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next →';
        nextBtn.addEventListener('click', () => loadTasks(currentPage + 1));
        pagination.appendChild(nextBtn);
    }
}

// Load stats (admin only)
async function loadStats() {
    try {
        const response = await API.tasks.getStats();
        
        document.getElementById('total-tasks').textContent = response.data.total;

        // Reset counts
        document.getElementById('pending-tasks').textContent = '0';
        document.getElementById('in-progress-tasks').textContent = '0';
        document.getElementById('completed-tasks').textContent = '0';

        // Update counts from stats
        response.data.byStatus.forEach(stat => {
            if (stat._id === 'pending') {
                document.getElementById('pending-tasks').textContent = stat.count;
            } else if (stat._id === 'in-progress') {
                document.getElementById('in-progress-tasks').textContent = stat.count;
            } else if (stat._id === 'completed') {
                document.getElementById('completed-tasks').textContent = stat.count;
            }
        });
    } catch (error) {
        console.error('Failed to load stats:', error);
    }
}