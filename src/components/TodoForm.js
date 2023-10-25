import React, {useState} from "react";
import {func} from "prop-types";

TodoForm.propTypes = {
    addTodo: func.isRequired,
}

function TodoForm(props) {
    const [todoInput, setTodoInput] = useState('');

    function handleInput(event) {
        setTodoInput(event.target.value);
    }

    function handleSubmit(event) {
        // prevents the browser from submitting the form
        event.preventDefault();

        // check if the string is empty
        if (todoInput.trim().length === 0)
            return;

        props.addTodo(todoInput);

        setTodoInput('');
    }

    return (
        <form action="#" onSubmit={handleSubmit}>
            <input
                type="text"
                value={todoInput}
                onChange={handleInput} // could also be onChange={(event) => { setTodoInput(event.target.value) }}
                className="todo-input"
                placeholder="What do you need to do?"
            />
        </form>
    );
}

export default TodoForm