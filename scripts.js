// Request Notification Permission
if (Notification.permission !== "granted") {
    Notification.requestPermission();
}

// Function to check if password is saved in local storage
function checkPassword() {
    if (localStorage.getItem('passwordEntered')) {
        document.getElementById('genderPrompt').style.display = 'block';
    } else {
        document.getElementById('passwordPrompt').style.display = 'block';
    }
}

// Function to handle password input
function checkPasswordInput() {
    if (document.getElementById('passwordInput').value === '') {
        localStorage.setItem('passwordEntered', true);
        document.getElementById('passwordPrompt').style.display = 'none';
        document.getElementById('genderPrompt').style.display = 'block';
    }
}

// Skip password
function skipPassword() {
    localStorage.setItem('passwordEntered', true);
    document.getElementById('passwordPrompt').style.display = 'none';
    document.getElementById('genderPrompt').style.display = 'block';
}

// Set theme based on gender selection
function setTheme(gender) {
    document.body.style.backgroundColor = gender === 'male' ? '#003366' : '#ff66b2';
    document.querySelector('.container').style.backgroundColor = '#d6aadf';
    document.getElementById('genderPrompt').style.display = 'none';
    document.getElementById('resetButton').style.display = 'block';
}

// Add a task to the list
function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    const reminderTime = document.getElementById('reminderTime').value;

    if (!taskInput) return alert('Please enter a task.');

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `${taskInput} <button class="delete-btn" onclick="deleteTask(this)">Delete</button>`;
    
    if (reminderTime) {
        const reminderDate = new Date(reminderTime);
        const timeDifference = reminderDate - new Date();
        if (timeDifference > 0) {
            setTimeout(() => {
                showWebNotification(taskInput);
            }, timeDifference);
        }
    }
    document.getElementById('taskList').appendChild(taskItem);
    document.getElementById('taskInput').value = '';
    document.getElementById('reminderTime').value = '';
}

// Delete task
function deleteTask(button) {
    button.parentElement.remove();
}

// Reset site
function resetSite() {
    localStorage.removeItem('passwordEntered');
    document.getElementById('taskList').innerHTML = '';
    document.getElementById('taskInput').value = '';
    document.getElementById('reminderTime').value = '';
}

// Show Web Notification
function showWebNotification(task) {
    if (Notification.permission === "granted") {
        const notification = new Notification("To-Do Reminder", {
            body: `Reminder for task: ${task}`,
            icon: 'https://via.placeholder.com/48'
        });

        notification.onclick = function() {
            window.focus();
        };

        setTimeout(() => {
            notification.close();
        }, 5000);
    }
}
