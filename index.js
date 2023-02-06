const add_todo = document.getElementById("add_todo");
const todos = document.getElementById("todos");
const title = document.getElementById("title");
const Description = document.getElementById("Description");
const error = document.getElementById("error");
let html = ``;
document.body.style.fontFamily = "inter";
let Todos = JSON.parse(localStorage.getItem("todos"));

if (Todos === null)
    localStorage.setItem("todos", JSON.stringify([]));

if (Todos.length === 0 || localStorage.todos === null)
    todos.innerText = "No Items to display.";

else
    map();

function map() {
    Todos.map(todo => {
        return html += `<div class="col-sm-6 my-2">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${todo.title}</h5>
                    <p class="card-text">${todo.Description}</p>
                    <button id=${todo.sno} class="btn btn-primary">Delete</button>
                </div>
            </div>
            </div>`;
    });
    todos.innerHTML = html;
}

for (let index = 0; index < Todos.length; index++) {
    const element = Todos[index];
    let btn = document.getElementById(`${element.sno}`);
    btn.onclick = (e) => {
        const newTodos = Todos.filter(todo => {
            return todo.sno.toString() !== `${e.target.id}`;
        });
        localStorage.setItem("todos", JSON.stringify(newTodos));
        window.location.reload()
    }
}

add_todo.onclick = () => {
    const todoItem = { title: title.value, Description: Description.value };
    add_todoFn(todoItem);
    title.value = "";
    Description.value = "";
    Todos = JSON.parse(localStorage.getItem("todos"));
}

function add_todoFn(todoItem) {
    const { title, Description } = todoItem;
    if ((title || Description).length === 0)
        return error.innerText = "Tittle or Description can not be empty";

    let sno;
    Todos.length === 0 || Todos === null ? sno = 0 : sno = Todos[Todos.length - 1].sno + 1;
    const newTodo = { sno, title, Description };
    localStorage.setItem("todos", JSON.stringify([...Todos, newTodo]));
    window.location.reload();
}

document.body.children[3].remove()
document.body.children[4].remove()