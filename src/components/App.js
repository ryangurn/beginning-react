import {useState} from "react";
import '../reset.css';
import '../App.css';

function App() {
    const [todos, setTodos] = useState([
        {
            id: 1,
            title: 'Finish React Series',
            isComplete: false,
            isEditing: false,
        },
        {
            id: 2,
            title: 'Go Shopping',
            isComplete: true,
            isEditing: false,
        },
        {
            id: 3,
            title: 'Take over the world',
            isComplete: false,
            isEditing: false,
        }
    ]);

    const [todoInput, setTodoInput] = useState('');
    const [idForTodo, setIdForTodo] = useState(4);

    function addTodo(event) {
        // prevents the browser from submitting the form
        event.preventDefault();

        // check if the string is empty
        if (todoInput.trim().length === 0)
            return;

        // ... copies the array
        setTodos([...todos, {
            id: idForTodo,
            title: todoInput,
            isComplete: false
        }]);

        setTodoInput('');
        setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
        // setIdForTodo(idForTodo + 1);
    }

    function deleteTodo(id) {
        setTodos([...todos].filter(todo => todo.id !== id));
    }

    function handleInput(event) {
        setTodoInput(event.target.value);
    }

    function completeTodo(id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id)
                todo.isComplete = !todo.isComplete;

            return todo;
        });

        setTodos(updatedTodos);
    }

    function markAsEditing(id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id)
                todo.isEditing = !todo.isEditing;

            return todo;
        });

        setTodos(updatedTodos);
    }

    function updateTodo(event, id) {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.isEditing = false;
                if (event.target.value.trim().length === 0) {
                    return todo;
                }

                todo.title = event.target.value;
            }

            return todo;
        });

        setTodos(updatedTodos);
    }

    return (
        <div className="todo-app-container">
            <div className="todo-app">
                <h2>Todo App</h2>
                <form action="#" onSubmit={addTodo}>
                    <input
                        type="text"
                        value={todoInput}
                        onChange={handleInput} // could also be onChange={(event) => { setTodoInput(event.target.value) }}
                        className="todo-input"
                        placeholder="What do you need to do?"
                    />
                </form>

                <ul className="todo-list">
                    {todos.map((todo, index) => (
                        <li key={todo.id} className="todo-item-container">
                            <div className="todo-item">
                                <input type="checkbox" checked={todo.isComplete}
                                       onChange={() => completeTodo(todo.id)}/>

                                {!todo.isEditing ? (
                                    <span
                                        onDoubleClick={() => markAsEditing(todo.id)}
                                        className={`todo-item-label ${todo.isComplete ? 'line-through' : ''}`}>{todo.title}</span>
                                ) : (
                                    <input type="text" defaultValue={todo.title} className="todo-item-input" autoFocus
                                           onBlur={(event) => updateTodo(event, todo.id)}
                                           onKeyDown={(event) => {
                                               if (event.key === 'Enter')
                                                   updateTodo(event, todo.id)
                                               else if (event.key === 'Escape')
                                                   markAsEditing(todo.id)
                                           }}
                                    />
                                )}
                            </div>
                            <button onClick={() => deleteTodo(todo.id)} className="x-button">
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
                    <div>
                        <div className="button">Check All</div>
                    </div>

                    <span>3 items remaining</span>
                </div>

                <div className="other-buttons-container">
                    <div>
                        <button className="button filter-button filter-button-active">
                            All
                        </button>
                        <button className="button filter-button">Active</button>
                        <button className="button filter-button">Completed</button>
                    </div>
                    <div>
                        <button className="button">Clear completed</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;