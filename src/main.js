import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/task-input-component.js';
import TaskTableComponent from './view/task-sections-component.js';
import TasksListComponent from './view/task-column-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.task-input');
const boardContainer = document.querySelector('.task-sections');

const taskBoards = [
    { name: "Бэклог", class: "backlog" },
    { name: "В процессе", class: "in-progress" },
    { name: "Готово", class: "done" },
    { name: "Корзина", class: "trash" }
];

// render главной формы
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new FormAddTaskComponent(), formContainer);

// render доски с задачами
taskBoards.forEach(board => {    
    render(new TaskTableComponent(board.name, board.class), boardContainer);
});

// render ul в каждую доску
const tableContainers = document.querySelectorAll('.task-column');

tableContainers.forEach(column => {
    if (column.classList.contains("trash")) {
        const h3Element = column.querySelector("h3");
        const formElement = column.querySelector("form");

        render(new TasksListComponent(), column, RenderPosition.BEFOREEND);
        const ulElement = column.querySelector('.task-list');

        column.insertBefore(ulElement, formElement);
    } else {
        render(new TasksListComponent(), column, RenderPosition.BEFOREEND);
    }
});

// render li в каждую ul
const listsContainers = document.querySelectorAll('.task-list');

listsContainers.forEach(taskList => {
    const taskColumn = taskList.closest('.task-column');

    if (taskColumn) {
        const taskClass = taskColumn.classList[1]; 
        
        const taskCount = Math.floor(Math.random() * 4) + 1;
        
        for (let i = 0; i < taskCount; i++) {
            render(new TaskComponent(`Задача ${i+1}`, taskClass), taskList, RenderPosition.BEFOREEND);
        }
    }
});

