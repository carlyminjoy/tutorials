var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    view.displayTodos();
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
    view.displayTodos();
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    view.displayTodos();
  },
  toggleAll: function() {
    var completedTodos = 0;
    var allTodos = this.todos.length;

    for (var i = 0; i < allTodos; i++) {
      if (this.todos[i].completed) {
        completedTodos++;
      }
    }

    if (completedTodos === allTodos) {
      for (var i = 0; i < allTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (var i = 0; i < allTodos; i++) {
        this.todos[i].completed = true;
      }
    }

    view.displayTodos();
  }
};

var handlers = {
  displayTodos: function() {
    todoList.displayTodos();
  },
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
  },
  changeTodo: function() {
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput')
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoTextInput.value, changeTodoPositionInput.value = "";
  },
  deleteTodo: function() {
    var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = "";
  },
  toggleCompleted: function() {
    var toggleTodoPositionInput = document.getElementById('toggleTodoPositionInput');
    todoList.toggleCompleted(toggleTodoPositionInput.valueAsNumber);
    toggleTodoPositionInput.value = "";
  },
  toggleAll: function() {
    todoList.toggleAll();
  }
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var checkbox = (todo.completed) ? '(x) ' : '( ) ';

      todoLi.textContent = checkbox + todo.todoText;
      todosUl.appendChild(todoLi);
    }
  }
};
