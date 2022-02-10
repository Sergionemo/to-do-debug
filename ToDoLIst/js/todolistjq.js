import { Todo } from '../js/Todo.js';

let todolist = [];
let todo;

$(() => {
    stampaTodo();
    let button = $(".todo button");
    //console.log(button);
    button.on("click", function () {
        let titolo = $("#titolo");
        let testo = $("#testo");
        todo = new Todo(titolo.val(), testo.val()); 

        //console.log(todo);

        todolist.push(todo);
        localStorage.setItem('listaTodo', JSON.stringify(todolist));
        stampaTodo();
        titolo.val("");
        testo.val("");
    })
})

let stampaTodo = () => {
    let lista = $('.lista ul');
    lista.html('');

    let localLista = localStorage.getItem('listaTodo');
    if (localLista !== null) {
        todolist = JSON.parse(localLista);
    }
    //console.log(todo);

    let i = 0;
    $.each( todolist,function (index, item) {
        //console.log(item);
        let li = `<li class="list-group-item">${item.titolo} - ${item.testo} <span id="${i}" class="rimuovi btn btn-sm btn-danger float-end">X</span> `;    
        lista.append(li);
        i++;
        let rimuovi = $(".rimuovi");
        
        
    })
    $("li").on("click", ".rimuovi", function () {
        let indice = $(this.parentElement).index();
        todolist.splice(indice, 1);
        localStorage.setItem('listaTodo', JSON.stringify(todolist));
        stampaTodo();
    })
}