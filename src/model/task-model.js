import { tasks } from "../mock/task.js";
import { generateID } from "../utils.js";

export default class TasksModel {
    #boardtasks = tasks;
    #observers = [];

    get tasks() {
        return this.#boardtasks;
    }    

    addTask(title) {
        const newTask = {
            title,
            status: "backlog",
            id: generateID(),
        };
        this.#boardtasks.push(newTask);
        this._notifyObserver();
        return newTask;
    }

    clearTrash() {
        this.#boardtasks = this.#boardtasks.filter((task) => task.status !== "trash");
        this._notifyObserver();
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    removeObserver(observer) {
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObserver() {
        this.#observers.forEach((observer) => observer());
    }
}