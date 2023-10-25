import React from "react";
import {func} from "prop-types";

TodoCompleteAllTodos.propTypes = {
    completeAllTodos: func.isRequired
};

function TodoCompleteAllTodos(props) {
    return (
        <div>
            <div className="button" onClick={props.completeAllTodos}>Check All</div>
        </div>
    )
}

export default TodoCompleteAllTodos;