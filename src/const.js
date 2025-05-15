const nameBoards = [
    { name: "Бэклог", class: "backlog" },
    { name: "В процессе", class: "in-progress" },
    { name: "Готово", class: "done" },
    { name: "Корзина", class: "trash" }
];

const UserActions = {
    UPDATE_TASK: 'UPDATE_TASK',
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK'
};

const UpdateType = {
    PATCH: 'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
    INIT: 'INIT'
};

export { nameBoards, UserActions, UpdateType }