import React, {useState} from "react";
import {array, func, number} from "prop-types";
import TodoItemsRemaining from "./TodoItemsRemaining";
import TodoClearCompleted from "./TodoClearCompleted";
import TodoCompleteAllTodos from "./TodoCompleteAllTodos";
import TodoFilters from "./TodoFilters";

TodoList.propTypes = {
    todos: array.isRequired,
    completeTodo: func.isRequired,
    markAsEditing: func.isRequired,
    updateTodo: func.isRequired,
    cancelEdit: func.isRequired,
    deleteTodo: func.isRequired,
    remaining: number.isRequired,
    clearCompleted: func.isRequired,
    completeAllTodos: func.isRequired,
    todosFiltered: func.isRequired,
};

function TodoList(props) {
    const [filter, setFilter] = useState('all');

    return (
        <>
            <ul className="todo-list">
                {props.todosFiltered(filter).map((todo, index) => (
                    <li key={todo.id} className="todo-item-container">
                        <div className="todo-item">
                            <input type="checkbox" checked={todo.isComplete}
                                   onChange={() => props.completeTodo(todo.id)}/>

                            {!todo.isEditing ? (
                                <span
                                    onDoubleClick={() => props.markAsEditing(todo.id)}
                                    className={`todo-item-label ${todo.isComplete ? 'line-through' : ''}`}>{todo.title}</span>
                            ) : (
                                <input type="text" defaultValue={todo.title} className="todo-item-input"
                                       autoFocus
                                       onBlur={(event) => props.updateTodo(event, todo.id)}
                                       onKeyDown={(event) => {
                                           if (event.key === 'Enter')
                                               props.updateTodo(event, todo.id)
                                           else if (event.key === 'Escape')
                                               props.cancelEdit(todo.id)
                                       }}
                                />
                            )}
                        </div>
                        <button onClick={() => props.deleteTodo(todo.id)} className="x-button">
                            <svg
                                className="x-button-icon"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>

            <div className="check-all-container">
                <TodoCompleteAllTodos completeAllTodos={props.completeAllTodos}/>

                <TodoItemsRemaining remaining={props.remaining}/>
            </div>

            <div className="other-buttons-container">
                <TodoFilters todosFiltered={props.todosFiltered} filter={filter} setFilter={setFilter}/>
                <div>
                    <TodoClearCompleted clearCompleted={props.clearCompleted}/>
                </div>
            </div>
        </>
    )
}

export default TodoList;