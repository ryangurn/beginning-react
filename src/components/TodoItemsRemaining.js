import React from "react";
import {number} from "prop-types";

TodoItemsRemaining.propTypes = {
    remaining: number.isRequired
}
function TodoItemsRemaining(props) {
    return <span>{props.remaining} items remaining</span>
}

export default TodoItemsRemaining;