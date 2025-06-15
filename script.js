// Ensure the script runs only after the entire HTML document has been loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Select the necessary DOM elements for the To-Do List application.
    const addButton = document.getElementById('add-task-btn'); // The "Add Task" button
    const taskInput = document.getElementById('task-input');   // The input field for new tasks
    const taskList = document.getElementById('task-list');     // The unordered list where tasks will be displayed

    /**
     * Adds a new task to the to-do list.
     * This function is responsible for creating list items,
     * adding a remove button, and appending them to the task list.
     */
    function addTask() {
        // Retrieve and trim the value from the task input field.
        const taskText = taskInput.value.trim();

        // Check if the input field is empty.
        if (taskText === '') {
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
        removeButton.className = 'remove-btn';

        // Assign an onclick event handler to the remove button.
        // When this button is clicked, its parent <li> element will be removed from the DOM.
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the parent <li> (the task) from the <ul>.
        };

        // --- Appending Elements ---
        // Append the remove button to the list item.
        listItem.appendChild(removeButton);
        // Append the complete list item (with task text and remove button) to the task list.
        taskList.appendChild(listItem);

        // --- Clear Input Field ---
        // Clear the task input field after successfully adding the task.
        taskInput.value = '';
    }

    // --- Attach Event Listeners ---
    // Add a click event listener to the "Add Task" button.
    // When the button is clicked, the addTask function will be executed.
    addButton.addEventListener('click', addTask);

    // Add a keypress event listener to the task input field.
    // This allows users to add tasks by pressing the 'Enter' key.
    taskInput.addEventListener('keypress', (event) => {
        // Check if the pressed key is 'Enter'.
        if (event.key === 'Enter') {
            addTask(); // Call the addTask function.
        }
    });

    // Note: The instruction "Invoke the addTask function on DOMContentLoaded"
    // appears to be a carry-over from a previous task (fetching data).
    // For a To-Do list, addTask should typically only run when a user
    // explicitly triggers it (e.g., by clicking the button or pressing Enter),
    // not automatically on page load, as it would create an empty task or
    // trigger an alert upon initial page loading. Therefore, it is omitted here.
});
