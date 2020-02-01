// Select Elements 
const list = document.getElementById("list");
const input = document.getElementById("todo_input");
const clear = document.querySelector(".clear");
const date = document.getElementById("date");
const btn = document.getElementById("btn");
const form = document.getElementById("todo_form");

// Classes names
const Check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line_through = "lineThrough";
//Variables
let listArray = [],
    id = 0;

//clear screen
clear.addEventListener("click", function() {

    window.location.reload();
});


// Show today Date

const today = new Date();
const options = {
    weekday: "long",
    month: "short",
    day: "numeric"
};

date.innerHTML = today.toLocaleDateString("en-US", options);

// Function add Todo

function addTodo(toDo, id, done, trash) {
    if (trash) {
        return;
    }
    const Done = done ? Check : uncheck;
    const line = done ? line_through : "";


    let item = `<li class="list-group-item pb-0 d-flex w-md-75 w-sm-100 ">
    <i class=" fa ${Done} text-success mr-2 " job="complete" id="${id}"></i>
    <p class="text text-capitalize ${line} ">${toDo}</p>
    <i class="fa fa-trash-o text-danger ml-auto  " job="delete" id="${id}"></i>
</li>`;



    let position = "beforeend";
    list.insertAdjacentHTML(position, item);
}


//add item to the list using enter key or add button

document.getElementById("btn").addEventListener("click", eventFunction);

document.getElementById("todo_input").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        eventFunction();
    }
});

//  if input is not empty
function eventFunction() {

    const toDo = input.value;
    if (toDo) {
        addTodo(toDo, id, false, false);

        listArray.push({
            name: toDo,
            id: id,
            done: false,
            trash: false
        });
        id++;
    } else // input is empty
    {
        if (toDo == "") {
            alert("you must write something");
        }
    }
    input.value = "";
}

// complete todo

function completeTodo(element) {
    element.classList.toggle(Check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(line_through);

    listArray[element.id].done = listArray[element.id].done ? false : true;

}

//remove todo

function removeTodo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    listArray[element.id].trash = true;
}
//  target the item or event on click

list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    if (elementJob == "complete") {
        completeTodo(element);
    } else if (elementJob == "delete") {
        removeTodo(element);
    }
});