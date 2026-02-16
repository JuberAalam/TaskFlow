// Task Card Component
function createTaskCard(task) {
    const card = document.createElement('div');
    card.className = 'task-card';
    card.dataset.taskId = task._id;

    const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date';
    const createdDate = new Date(task.createdAt).toLocaleDateString();

    card.innerHTML = `
        <div class="task-header">
            <h3 class="task-title">${escapeHtml(task.title)}</h3>
            <span class="priority-badge priority-${task.priority}">${task.priority}</span>
        </div>
        <p class="task-description">${escapeHtml(task.description)}</p>
        <div class="task-meta">
            <span class="status-badge status-${task.status}">${task.status.replace('-', ' ')}</span>
            <span class="task-date">📅 ${dueDate}</span>
        </div>
        <div class="task-meta">
            <span class="task-date">Created: ${createdDate}</span>
        </div>
        <div class="task-actions">
            <button class="btn btn-small btn-secondary update-task-btn">Update</button>
            <button class="btn btn-small btn-danger delete-task-btn">Delete</button>
        </div>
    `;

    // Add event listeners
    const updateBtn = card.querySelector('.update-task-btn');
    const deleteBtn = card.querySelector('.delete-task-btn');

    updateBtn.addEventListener('click', () => updateTask(task));
    deleteBtn.addEventListener('click', () => deleteTask(task._id));

    return card;
}

// Update task function
async function updateTask(task) {
    const newStatus = prompt(
        `Update task status for "${task.title}":\n\nCurrent: ${task.status}\n\nEnter new status (pending/in-progress/completed):`,
        task.status
    );

    if (!newStatus) return;

    const validStatuses = ['pending', 'in-progress', 'completed'];
    if (!validStatuses.includes(newStatus)) {
        Toast.error('Invalid status. Use: pending, in-progress, or completed');
        return;
    }

    try {
        await API.tasks.update(task._id, { status: newStatus });
        Toast.success('Task updated successfully!');
        loadTasks(); // Reload tasks
    } catch (error) {
        Toast.error(error.message || 'Failed to update task');
    }
}

// Delete task function
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        await API.tasks.delete(taskId);
        Toast.success('Task deleted successfully!');
        loadTasks(); // Reload tasks
    } catch (error) {
        Toast.error(error.message || 'Failed to delete task');
    }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}