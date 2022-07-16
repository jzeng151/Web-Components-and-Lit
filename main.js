const template = document.createElement('template');
template.innerHTML = `
  <style>
    div {
      text-align: center;
    }
    section > div {
      display: block;
      border: 1px solid;
      color: green;
      margin-top: 2%;
      margin-left: 25%;
      width: 50%;
      height: 120px;
    }
    p {
      padding-top: 4%;
    }
    .remove-todo {
      border: 1px solid;
      margin-left: 50%;
      float: right;
    }
  </style>
  <div id="todo">
    <input type="text" id="todo-input" placeholder="Enter new todo" />
    <button type="button" id="addTask">Add Task</button>
    <section id="todo-list">
    </section>
  </div>
`

export class Todo extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    const shadow = this.shadowRoot;
    shadow.appendChild(template.content.cloneNode(true));
  }

  addTask(element) {
    const shadow = element.shadowRoot;
    const newTodo = shadow.querySelector('#todo-input').value;

    const todoCard = document.createElement('div');
    
    const btn = document.createElement('button');
    btn.setAttribute('class', 'remove-todo');
    const text = document.createTextNode('X');
    btn.addEventListener('click', () => this.deleteTask(todoCard))
    btn.appendChild(text);
    todoCard.appendChild(btn);
    
    const todoText = document.createElement('p');
    todoText.innerHTML = newTodo;
    todoCard.appendChild(todoText);

    const todoList = shadow.querySelector('#todo-list');
    todoList.appendChild(todoCard);
  }

  deleteTask(element) {
    element.remove();
  }

  // lifecycle method that executes when component is rendered
  connectedCallback() {
    this.shadowRoot.querySelector('#addTask').addEventListener('click', () => this.addTask(this));
  }
  
  // lifecycle method that executes when component is unloaded
  disconnectedCallback() {
    this.shadowRoot.querySelector('#addTask').removeEventListener();
  }
}

customElements.define('todo-list', Todo);