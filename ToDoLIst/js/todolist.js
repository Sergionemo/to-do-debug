import { Todo } from '../js/Todo.js';

let todolist = [];

document.addEventListener('DOMContentLoaded', function () {
    stampaTodo();
    let button = document.querySelector('.todo button');
    button.addEventListener('click', function () {
        let titolo = document.querySelector('#titolo');
        let testo = document.querySelector('#testo');
        let todo = new Todo(titolo.value, testo.value);
        todolist.push(todo);
        localStorage.setItem('listaTodo', JSON.stringify(todolist));
        stampaTodo();
    });
});

let stampaTodo = () => {
    let lista = document.querySelector('.lista ul');
    lista.innerHTML = '';

    let localLista = localStorage.getItem('listaTodo');
    if (localLista !== null) {
        todolist = JSON.parse(localLista);
    }

    todolist.forEach((todo) => {
        let li = document.createElement('li');
        let i = 0;
        li.className = 'list-group-item';
        li.innerHTML = todo.titolo + ' - ' + todo.testo;
        li.innerHTML += '<span id="rimuovi" class="btn btn-sm btn-danger float-end">X</span>';
        lista.appendChild(li);
        let rimuovi = $('#rimuovi');

        rimuovi.on('click', "#rimuovi", function () {
            indice = todolist.indexOf(todo);
            todolist.splice(indice, 1);
            console.log(todolist.indexOf(todo));
            localStorage.setItem('listaTodo', JSON.stringify(todolist));
            stampaTodo();
        })
    });
}