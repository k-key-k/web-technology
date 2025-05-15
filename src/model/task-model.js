import Observable from "../framework/observable.js";
import { generateID } from "../utils.js";
import { UpdateType, UserActions } from "../const.js";

export default class TasksModel extends Observable {
    #tasksApiService = null;
    #boardtasks = [];    

    constructor({tasksApiService}) {
        super();
        this.#tasksApiService = tasksApiService;
    }

    async init() {
        try {
            const tasks = await this.#tasksApiService.tasks;
            this.#boardtasks = tasks;
        } catch (err) {
            this.#boardtasks = [];
        }
        this._notify(UpdateType.INIT);
    }

    get tasks() {
        return this.#boardtasks;
    }    

    async addTask(title) {
        const newTask = {
            title,
            status: "backlog",
            id: generateID(),
        };
        try {
            const createdTask = await this.#tasksApiService.addTask(newTask);
            this.#boardtasks.push(createdTask);
            this._notify(UserActions.ADD_TASK, createdTask);
            return createdTask; 
        } catch (err) {
            console.error("Ошибка при добавлении задачи на сервер:",  err);
            throw err;
        }
    }

    async updateTaskStatus(taskId, newStatus) {
        const task = this.#boardtasks.find(task => task.id === taskId);
        if (task) {
            task.status = newStatus;

            try {
                const updatedTask = await this.#tasksApiService.updateTask(task);
                Object.assign(task, updatedTask);
                this._notify(UserActions.UPDATE_TASK, task);
            } catch (err) {
                console.error("Ошибка при обновлении статуса задачи на сервер:", err);
                task.status = previousStatus;
                throw err;
            }            
        }
    }

    deleteTask(taskId) {
        this.#boardtasks = this.#boardtasks.filter(task => task.id !== taskId);
        this._notify(UserActions.DELETE_TASK, { id: taskId });
    }
    
    async clearTrashTasks() {
        const basketTasks = this.#boardtasks.filter(task => task.status === 'trash');
    
        try {
            await Promise.all(basketTasks.map(task => this.#tasksApiService.deleteTask(task.id)));
            this.#boardtasks = this.#boardtasks.filter(task => task.status !== 'trash');
            this._notify(UserActions.DELETE_TASK, { status: 'trash' });
        } catch (err) {
            console.error("Ошибка при удалении задач из корзины на сервере:", err);
            throw err;
        }
    }
    
    hasTrashTasks() {
        return this.#boardtasks.some(task => task.status === 'trash');
    }
}