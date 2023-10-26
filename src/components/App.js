import {useEffect, useRef, useState} from "react";
import '../reset.css';
import '../App.css';
import NoTodos from "./NoTodos";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import useLocalStorage from "../hooks/useLocalStorage";
import {TodosContext} from "../context/TodosContext";

function App() {
    const [name, setName] = useLocalStorage('name', '');
    const nameInputEl = useRef(null);
    const [todos, setTodos] = useLocalStorage('todos', []);
    const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);
    const [filter, setFilter] = useState('all');

    function todosFiltered() {
        if (filter === 'all') {
            return todos;
        } else if (filter === 'active') {
            return todos.filter(todo => !todo.isComplete);
        } else if (filter === 'completed') {
            return todos.filter(todo => todo.isComplete);
        }
    }

    function handleNameInput(event) {
        setName(event.target.value);
    }

    useEffect(() => {
        nameInputEl.current.focus()
    }, []);

    return (
        <TodosContext.Provider value={{todos, setTodos, idForTodo, setIdForTodo, todosFiltered, filter, setFilter}}>
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
                                   onChange={handleNameInput}/>
                        </form>

                        {name && <p className="name-label">Hello, {name}</p>}
                    </div>
                    <h2>Todo App</h2>
                    <TodoForm/>

                    {
                        todos.length > 0 ? (
                            <TodoList />
                        ) : (
                            <NoTodos/>
                        )
                    }
                </div>
            </div>
        </TodosContext.Provider>
    );
}

export default App;