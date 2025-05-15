import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/task-input-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import { render, RenderPosition } from './framework/render.js';
import TasksModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://6825ee5a397e48c913144539.mockapi.io';
const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.task-form');
const tasksBoardContainer = document.querySelector('.board');

const tasksModel = new TasksModel({
    tasksApiService: new TasksApiService(END_POINT)
});

const tasksBoardPresenter = new TasksBoardPresenter({
    boardContainer: tasksBoardContainer,
    tasksModel,
});

const formAddTaskComponent = new FormAddTaskComponent({
    onClick: handleNewTaskButtonClick
});

function handleNewTaskButtonClick() {
    tasksBoardPresenter.createTask();
}

// render главной формы
render(new HeaderComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(formAddTaskComponent, formContainer);

// render доски с задачами
tasksBoardPresenter.init();