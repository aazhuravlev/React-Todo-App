import React from 'react';

import TodoListItem from '../todo-list-item/';
import './todo-list.css'

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {

    const elements = todos.map((item, index) => {

        const { id, ...itemProps } = item;
        return (
            <li key={ id } className="list-group-item">
                <TodoListItem
                    { ...itemProps }
                    onDeleted={() => onDeleted(id)}
                    onToggleImportant={() => onToggleImportant(index)}
                    onToggleDone={() => onToggleDone(index)}/>
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            { elements }
        </ul>
    );
};

export default TodoList;