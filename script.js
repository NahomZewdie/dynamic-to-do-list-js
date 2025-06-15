// Ensure the script runs only after the entire HTML document has been loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary DOM elements for the To-Do List application.
    const addButton = document.getElementById('add-task-btn'); // The "Add Task" button
    const taskInput = document.getElementById('task-input');   // The input field for new tasks
    const taskList = document.getElementById('task-list');     // The unordered list where tasks will be displayed

    /**
     * Adds a new task to the to-do list, and optionally saves it to Local Storage.
     * This function is responsible for creating list items,
     * adding a remove button, and appending them to the task list.
     *
     * @param {string} taskText - The text content of the task to be added.
     * @param {boolean} [save=true] - A flag indicating whether to save the task to Local Storage.
     * Defaults to true for new user-entered tasks, false when loading from storage.
     */
    function addTask(taskText, save = true) {
        // If 'save' is true, it means this call is from user input, so check if the input is empty.
        // If 'save' is false, it means we are loading from storage, so no need to check for empty input.
        if (save && taskText === '') {
            // Prompt the user to enter a task if the input is empty.
            // Note: As per specific instruction, using alert(). In production,
            // a custom modal or inline feedback is generally preferred.
            alert('Please enter a task.');
            return; // Exit the function if no task text is provided.
        }

        // --- Task Creation ---
        // Create a new list item (<li>) element for the task.
        const listItem = document.createElement('li');
        // Set the text content of the list item to the user's task.
        listItem.textContent = taskText;

        // --- Remove Button Creation ---
        // Create a new button element that will be used to remove the task.
        const removeButton = document.createElement('button');
        // Set the text content of the remove button.
        removeButton.textContent = 'Remove';
        // Add a class name to the remove button for styling purposes (from styles.css).
        removeButton.classList.add('remove-btn');

        // Assign an onclick event handler to the remove button.
        // When this button is clicked, it removes the task from the DOM and Local Storage.
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the parent <li> (the task) from the <ul>.

            // --- Update Local Storage on Removal ---
            // Retrieve the current tasks from Local Storage.
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            // Filter out the task that was just removed from the array.
            // Note: This relies on task text being unique for accurate removal.
            const updatedTasks = storedTasks.filter(task => task !== taskText);
            // Save the updated tasks array back to Local Storage.
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        };

        // --- Appending Elements ---
        // Append the remove button to the list item.
        listItem.appendChild(removeButton);
        // Append the complete list item (with task text and remove button) to the task list.
        taskList.appendChild(listItem);

        // --- Save to Local Storage (if it's a new task) ---
        if (save) {
            // Retrieve the current tasks from Local Storage.
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            // Add the new task text to the array.
            storedTasks.push(taskText);
            // Save the updated tasks array back to Local Storage.
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            // Clear the input field only for newly added tasks from user input.
            taskInput.value = '';
        }
    }

    /**
     * Loads tasks from Local Storage and populates the task list on the page.
     */
    function loadTasks() {
        // Retrieve tasks from Local Storage. If nothing is found, default to an empty array.
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // For each stored task, add it to the DOM (without re-saving to Local Storage).
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // --- Attach Event Listeners ---
    // Add a click event listener to the "Add Task" button.
    // When the button is clicked, the addTask function will be executed with the current input value.
    addButton.addEventListener('click', () => addTask(taskInput.value.trim()));

    // Add a keypress event listener to the task input field.
    // This allows users to add tasks by pressing the 'Enter' key.
    taskInput.addEventListener('keypress', (event) => {
        // Check if the pressed key is 'Enter'.
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim()); // Call the addTask function.
        }
    });

    // Invoke the loadTasks function when the DOM content is fully loaded.
    // This ensures that any previously saved tasks are displayed when the page loads.
    loadTasks();
});
