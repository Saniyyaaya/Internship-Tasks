// Handle theme toggle
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    const currentTheme = document.body.classList.contains('dark-theme') ? '🌙' : '🌞';
    document.getElementById('theme-toggle').textContent = currentTheme;
});

// Simulate an in-memory user database
let users = [];
let tasks = []; // Array to hold tasks

// Handle user registration (sign up)
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;

    // Check if the email already exists
    if (users.find(user => user.email === email)) {
        alert('Email is already registered');
    } else {
        // Save user in the array
        users.push({ email, password });
        alert('Account created successfully');
        document.getElementById('login-page').style.display = 'block';
        document.getElementById('signup-page').style.display = 'none';
    }
});

// Handle user login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = users.find(user => user.email === email && user.password === password);
    
    if (user) {
        alert('Login successful');
        document.getElementById('task-manager').style.display = 'block';
        document.getElementById('login-page').style.display = 'none';
        document.getElementById('signup-page').style.display = 'none';
    } else {
        alert('Invalid email or password');
    }
});

// Handle logout
document.getElementById('logout-btn').addEventListener('click', function() {
    document.getElementById('task-manager').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
});

// Handle adding a task
document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const taskTitle = document.getElementById('task-title').value;
    const taskDescription = document.getElementById('task-description').value;
    const priority = document.getElementById('priority').value;

    if (taskTitle) {
        const task = {
            title: taskTitle,
            description: taskDescription,
            priority: priority,
            completed: false
        };

        tasks.push(task);
        displayTasks(); // Update task display
        document.getElementById('task-form').reset(); // Reset form fields
    }
});

// Display tasks
function displayTasks() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = ''; // Clear previous tasks

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        taskDiv.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Priority: ${task.priority}</p>
            <button onclick="markAsCompleted(${index})">Mark as Completed</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        tasksList.appendChild(taskDiv);
    });

    // Update task counts
    updateTaskCounts();
}

// Mark a task as completed
function markAsCompleted(index) {
    tasks[index].completed = true;
    displayTasks(); // Update task display
}

// Edit a task
function editTask(index) {
    const task = tasks[index];

    document.getElementById('task-title').value = task.title;
    document.getElementById('task-description').value = task.description;
    document.getElementById('priority').value = task.priority;

    // Delete the task after editing to avoid duplicates
    deleteTask(index);
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks(); // Update task display
}

// Update task counts (total and completed)
function updateTaskCounts() {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    document.getElementById('task-count').innerText = `Total Tasks: ${totalTasks}`;
    document.getElementById('completed-count').innerText = `Completed Tasks: ${completedTasks}`;
}
