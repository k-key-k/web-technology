import TaskTableComponent from "../view/task-sections-component.js";
import TasksListComponent from "../view/task-column-component.js";
import TaskComponent from "../view/task-component.js";
import ClearTrashButtonComponent from "../view/clear-trash-button-component.js";
import { nameBoards } from "../const.js";
import { render, RenderPosition } from "../framework/render.js";

export default class TasksBoardPresenter {    
    #boardContainer = null;
    #tasksModel = null;        

    #boardTasks = [];

    constructor ({boardContainer, tasksModel}) {
        this.#boardContainer = boardContainer;
        this.#tasksModel = tasksModel;
    }

    init() {
        this.#boardTasks = [...this.#tasksModel.getTasks()];        

        nameBoards.forEach(board => {            
            render(new TaskTableComponent(board.name, board.class), this.#boardContainer);
        });
        
        const tasksBoardComponent = document.querySelectorAll('.task-column');        

        tasksBoardComponent.forEach(board => {
            const tasksListcomponent = new TasksListComponent();   
            render(tasksListcomponent, board);            

            const boardClassList = board.classList[1];            
            const boardStatus = boardClassList;            

            const filteredTasks = this.#boardTasks.filter(task => task.status === boardStatus);            

            filteredTasks.forEach(task => {                
                const taskComponent = new TaskComponent({task});
                render(taskComponent, tasksListcomponent.getElement());
            });

            if (boardStatus === "trash") {                
                render(new ClearTrashButtonComponent(), board);
            }
                        
        });        
    }
}