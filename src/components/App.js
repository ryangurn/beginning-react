import {useEffect, useMemo, useRef, useState} from "react";
import '../reset.css';
import '../App.css';
import NoTodos from "./NoTodos";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function App() {
    const [name, setName] = useState('');
    const nameInputEl = useRef(null);
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

    const [idForTodo, setIdForTodo] = useState(4);

    function addTodo(todo) {
        // ... copies the array
        setTodos([...todos, {
            id: idForTodo,
            title: todo,
            isComplete: false
        }]);

        setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
        // setIdForTodo(idForTodo + 1);
    }

    function deleteTodo(id) {
        setTodos([...todos].filter(todo => todo.id !== id));
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

    function remainingCalculation() {
        return todos.filter(todo => !todo.isComplete).length;
    }

    const remaining = useMemo(remainingCalculation, [todos]);

    function clearCompleted() {
        setTodos([...todos].filter(todo => !todo.isComplete))
    }

    function completeAllTodos() {
        const updatedTodos = todos.map(todo => {
            todo.isComplete = true;

            return todo;
        });

        setTodos(updatedTodos);
    }

    function todosFiltered(filter) {
        if (filter === 'all') {
            return todos;
        } else if (filter === 'active') {
            return todos.filter(todo => !todo.isComplete);
        } else if (filter === 'completed') {
            return todos.filter(todo => todo.isComplete);
        }
    }

    useEffect(() => {
        nameInputEl.current.focus()
    }, []);

    return (
        <div className="todo-app-container">
            <div className="todo-app">
                <div className="name-container">
                    <h2>What is your name?</h2>
                    <form action="#">
                        <input type="text"
                               ref={nameInputEl}
                               className="todo-input"
                               placeholder="What is your name?"
                               value={name}
                               onChange={event => setName(event.target.value)}/>
                    </form>

                    {name && <p className="name-label">Hello, {name}</p>}
                </div>
                <h2>Todo App</h2>
                <TodoForm addTodo={addTodo}/>

                {
                    todos.length > 0 ? (
                        <TodoList todos={todos} completeTodo={completeTodo} markAsEditing={markAsEditing}
                                  updateTodo={updateTodo} cancelEdit={markAsEditing} deleteTodo={deleteTodo}
                                  remaining={remaining} clearCompleted={clearCompleted}
                                  completeAllTodos={completeAllTodos} todosFiltered={todosFiltered}/>
                    ) : (
                        <NoTodos/>
                    )
                }
            </div>
        </div>
    );
}

export default App;