var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var completedTodos = 0;
    var allTodos = this.todos.length;

    this.todos.forEach(function(todo) {
      if (todo.completed) {
        completedTodos++;
      }
    });

    this.todos.forEach(function(todo) {
      todo.completed = (completedTodos == allTodos) ? false : true;
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput')
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoTextInput.value, changeTodoPositionInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleTodoPositionInput = document.getElementById('toggleTodoPositionInput');
    todoList.toggleCompleted(toggleTodoPositionInput.valueAsNumber);
    toggleTodoPositionInput.value = "";
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todoList.todos.forEach(function(todo, i) {
      var todoLi = document.createElement('li');
      var checkbox = (todo.completed) ? '(x) ' : '( ) ';

      todoLi.id = i;
      todoLi.textContent = checkbox + todo.todoText;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUL = document.querySelector('ul');

    todosUL.addEventListener('click', function(event) {
      var elementClicked = event.target;

      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();
