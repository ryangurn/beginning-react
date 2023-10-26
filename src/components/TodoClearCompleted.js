import React, {useContext} from "react";
import {func} from "prop-types";
import {TodosContext} from "../context/TodosContext";

function TodoClearCompleted() {
    const {todos, setTodos} = useContext(TodosContext);

    function clearCompleted() {
        setTodos([...todos].filter(todo => !todo.isComplete))
    }

    return <button className="button" onClick={clearCompleted}>Clear completed</button>
}

export default TodoClearCompleted