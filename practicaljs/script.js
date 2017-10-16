var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  // changeTodo: function(position, todoText) {
  //   this.todos[position].todoText = todoText;
  // },
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
  // changeTodo: function() {
  //   var changeTodoTextInput = document.getElementById('changeTodoTextInput');
  //   var changeTodoPositionInput = document.getElementById('changeTodoPositionInput')
  //   todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
  //   changeTodoTextInput.value, changeTodoPositionInput.value = "";
  //   view.displayTodos();
  // },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }
};

var view = {
  displayTodos: function(filter) {
    var todosUl = document.querySelector('ul');
    var showTodos;

    showTodos = todoList.todos.filter(function(todo) {
      if (filter === 'active') {
        return (!todo.completed);
      } else if (filter === 'completed') {
        return (todo.completed);
      } else {
        return todo;
      }
    });

    todosUl.innerHTML = '';

    showTodos.forEach(function(todo, i) {
      var todoLi = document.createElement('li');
      var buttons = document.createElement('p');

      todoLi.className = (todo.completed) ? 'completed' : 'notCompleted';
      todoLi.id = i;

      todoLi.textContent = todo.todoText;
      buttons.appendChild(this.createDeleteButton());
      // if (!todo.completed) {
      //   buttons.appendChild(this.createEditButton());
      // }
      todoLi.appendChild(buttons);
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement('button');
    deleteButton.textContent = "X";
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  // createEditButton: function() {
  //   var editButton = document.createElement('button');
  //   editButton.textContent = "Edit";
  //   editButton.className = 'editButton';
  //   return editButton;
  // },
  setUpEventListeners: function() {
    var todosUL = document.querySelector('ul');

    todosUL.addEventListener('click', function(event) {
      var elementClicked = event.target;

      if (elementClicked.className === 'deleteButton') {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.parentNode.id));
      }

      // if (elementClicked.className === 'editButton') {
      //   handlers.changeTodo(parseInt(elementClicked.parentNode.parentNode.id));
      // }

      if (elementClicked.className === 'completed' ||
          elementClicked.className === 'notCompleted') {
        handlers.toggleCompleted(parseInt(elementClicked.id));
      }
    });
  }
};

view.setUpEventListeners();
