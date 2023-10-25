import React from "react";
import {func} from "prop-types";

TodoItemsRemaining.propTypes = {
    remaining: func.isRequired
}
function TodoItemsRemaining(props) {
    return <span>{props.remaining()} items remaining</span>
}

export default TodoItemsRemaining;