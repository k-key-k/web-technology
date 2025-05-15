import TaskTableComponent from "../view/task-sections-component.js";
import TasksListComponent from "../view/task-column-component.js";
import TaskComponent from "../view/task-component.js";
import ClearTrashButtonComponent from "../view/clear-trash-button-component.js";
import NoTaskComponent from "../view/no-tasks-component.js";
import { nameBoards, UserActions, UpdateType } from "../const.js";
import { render } from "../framework/render.js";
import LoadingViewComponent from "../view/loading-view-component.js";

export default class TasksBoardPresenter {    
    #boardContainer = null;
    #tasksModel = null;
    #loadingComponent = new LoadingViewComponent();

    constructor ({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;

        this.#tasksModel.addObserver(this.#handleModelEvent.bind(this));        
    }

    get tasks() {
        return this.#tasksModel.tasks;
    }

    async init() {        
        render(this.#loadingComponent, this.#boardContainer);

        await this.#tasksModel.init();
        this.#clearBoard();
        this.#renderBoard();

        this.#loadingComponent.removeElement();
    }

    async createTask() {
        const taskTitle = document.querySelector('#add-task-name').value.trim();
        if (!taskTitle) {
            return;
        }
        try {
            await this.#tasksModel.addTask(taskTitle);
            document.querySelector('#add-task-name').value = '';
        } catch (err) {
            console.error("Ошибка при создании задачи:", err);
        }
    }

    async #handleTaskDrop(taskId, newStatus) {
        try {
            await this.#tasksModel.updateTaskStatus(taskId, newStatus);
        } catch (err) {
            console.error("Ошибка при обновлении статуса задачи:", err);
        }        
    }

    async #handleClearTrashClick() {
        try {
            await this.#tasksModel.clearTrashTasks();
        } catch (err) {
            console.error("Ошибка при очистке корзины:", err);
        }
    }

    #renderTask(task, container) {
        const taskComponent = new TaskComponent({task});

        render(taskComponent, container);
    }

    #renderBoard() {
        nameBoards.forEach((board) => {
            this.#renderTasksList(board);
        })   
    }

    #renderTasksList(board) {
        const column = this.#renderColumnContainer(board);
        const tasksListComponent = new TasksListComponent({
            status: board.class,
            label: board.name,
            onTaskDrop: this.#handleTaskDrop.bind(this)
        });
        render(tasksListComponent, column.element);

        const tasks = this.tasks.filter((task) => task.status === board.class);

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
        const clearButton = new ClearTrashButtonComponent({
            onClick: this.#handleClearTrashClick.bind(this)
        });
        render(clearButton, container);
    }

    #renderNoTaskComponent(container) {
        const noTaskComponent = new NoTaskComponent();
        render(noTaskComponent, container);
    }

    #clearBoard() {     
        this.#loadingComponent.removeElement();   
        document.querySelector('.board').innerHTML = '';        
    }
    
    #handleModelEvent(event, payload) {
        switch (event) {
            case UpdateType.INIT:
                this.#clearBoard();
                this.#renderBoard();
                break;
                
            case UserActions.ADD_TASK:
            case UserActions.UPDATE_TASK:
            case UserActions.DELETE_TASK:                
                this.#clearBoard();
                this.#renderBoard();
                                
                if (payload?.status === 'trash' || payload?.task?.status === 'trash') {
                    this.#updateTrashSection();
                }
                break;
                
            default:
                console.warn(`Неизвестный тип обновления: ${updateType}`);
        }
    }

    #updateTrashSection() {
        const trashColumn = this.#boardContainer.querySelector('.trash-column');
        if (!trashColumn) return;
        
        trashColumn.innerHTML = '';
        
        const trashTasks = this.tasks.filter(task => task.status === 'trash');
        const board = nameBoards.find(b => b.class === 'trash');
        
        if (board) {
            const tasksListComponent = new TasksListComponent({
                status: board.class,
                label: board.name,
                onTaskDrop: this.#handleTaskDrop.bind(this)
            });
            render(tasksListComponent, trashColumn);
            
            this.#renderTasksIntoList(trashTasks, tasksListComponent.element);
            
            if (trashTasks.length > 0) {
                this.#renderClearButton(trashColumn);
            }
        }
    }
}