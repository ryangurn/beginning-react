import React from "react";
import {func} from "prop-types";

TodoClearCompleted.propTypes = {
    clearCompleted: func.isRequired
};

function TodoClearCompleted(props) {
    return <button className="button" onClick={props.clearCompleted}>Clear completed</button>
}

export default TodoClearCompleted