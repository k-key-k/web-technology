import TaskTableComponent from "../view/task-sections-component.js";
import TasksListComponent from "../view/task-column-component.js";
import TaskComponent from "../view/task-component.js";
import ClearTrashButtonComponent from "../view/clear-trash-button-component.js";
import NoTaskComponent from "../view/no-tasks-component.js";
import { nameBoards } from "../const.js";
import { render } from "../framework/render.js";

export default class TasksBoardPresenter {    
    #boardContainer = null;
    #tasksModel = null;        
    #boardTasks = [];

    constructor ({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.tasks];        

        nameBoards.forEach((board) => {
            this.#renderTasksList(board);
        })
          
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({task});

        render(taskComponent, container);
    }

    #renderTasksList(board) {
        const column = this.#renderColumnContainer(board);
        const tasksListComponent = new TasksListComponent();
        render(tasksListComponent, column.element);

        const tasks = this.#boardTasks.filter((task) => task.status === board.class);

        this.#renderTasksIntoList(tasks, tasksListComponent.element);

        if (board.class === "trash" && tasks.length > 0) {
            this.#renderClearButton(column.element);
        }
    }

    #renderColumnContainer(board) {
        const component = new TaskTableComponent(board.name, board.class);
        render(component, this.#boardContainer);
        return component;
    }

    #renderTasksIntoList(tasks, listContainer) {
        if (tasks.length === 0) {
            this.#renderNoTaskComponent(listContainer);
        } else {
            tasks.forEach((task) => this.#renderTask(task, listContainer));
        }
    }

    #renderClearButton(container) {
        const clearButton = new ClearTrashButtonComponent();
        render(clearButton, container);
    }

    #renderNoTaskComponent(container) {
        const noTaskComponent = new NoTaskComponent();
        render(noTaskComponent, container);
    }

}