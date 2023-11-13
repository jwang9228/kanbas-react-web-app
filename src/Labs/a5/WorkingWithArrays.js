import React, { useState, useEffect } from "react";
import axios from "axios";

function WorkingWithArrays() {
    const API = "http://localhost:4000/a5/todos";

    const [errorMessage, setErrorMessage] = useState(null);

    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });

    const [todos, setTodos] = useState([]);
    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };
    const removeTodo = async (todo) => {
        const response = await axios
          .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };
    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };
    const deleteTodo = async (todo) => {
        try {
            const response = await axios.delete(`${API}/${todo.id}`);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };
    const updateTodo = async () => {
        try {
            const response = await axios.put(
            `${API}/${todo.id}`, todo);
            setTodos(todos.map((t) => (
            t.id === todo.id ? todo : t)));
            setTodo({});
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };
    const fetchTodoById = async (id) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };
    const updateTitle = async () => {
        const response = await axios.get(
          `${API}/${todo.id}/title/${todo.title}`);
        setTodos(response.data);
    };
    
    useEffect(() => {
        fetchTodos();
    }, []);

    return (
      <div>
        <h3>Working with Arrays</h3>
        {errorMessage && (
            <div className="alert alert-danger mb-2 mt-2">
            {errorMessage}
            </div>
        )}
        <input className="form-control mb-2" value={todo.id} readOnly />
        <input
            className="form-control mb-2"
            onChange={(e) => setTodo({
            ...todo, title: e.target.value })}
            value={todo.title} type="text"
        />
        <textarea
            className="form-control mb-2"
            onChange={(e) => setTodo({ ...todo,
            description: e.target.value })}
            value={todo.description} type="text"
        />
        <input
            className="form-control mb-2"
            onChange={(e) => setTodo({
            ...todo, due: e.target.value })}
            value={todo.due} type="date"
        />
        <label>
            <input
            className="mb-2"
            onChange={(e) => setTodo({
                ...todo, completed: e.target.checked })}
            value={todo.completed} type="checkbox"
            />
            Completed
        </label>
        <button 
            className="btn btn-warning mb-2 w-100"
            onClick={postTodo} >
            Post Todo
        </button>
        <button 
            className="btn btn-success mb-2 w-100"
            onClick={updateTodo}>
            Update Todo
        </button>
        <button onClick={createTodo}
            className="btn btn-primary mb-2 w-100">
        Create Todo
        </button>
        <button onClick={updateTitle}
            className="btn btn-success mb-2 w-100">
        Update Title
        </button>
        <ul className="list-group">
            {todos.map((todo) => (
            <li key={todo.id}
                className="list-group-item">
                <button
                    onClick={() => fetchTodoById(todo.id)}
                    className="btn btn-warning me-2 float-end" >
                    Edit
                </button>
                <button
                    onClick={() => removeTodo(todo)}
                    className="btn btn-danger float-end me-2" >
                    Remove
                </button>
                <button
                    onClick={() => deleteTodo(todo)}
                    className="btn btn-danger float-end me-2">
                    Delete
                </button>
                <input
                    checked={todo.completed}
                    type="checkbox" readOnly
                />
                {todo.title}
                <p>{todo.description}</p>
                <p>{todo.due}</p>
            </li>
            ))}
        </ul>
        <h4>Retrieving Arrays</h4>
        <a href={API} className="btn btn-primary me-2">
          Get Todos
        </a>
        <h4>Retrieving an Item from an Array by ID</h4>
        <input
            className="form-control"
            value={todo.id}
            onChange={(e) => setTodo({ ...todo,
            id: e.target.value })}/>
        <a href={`${API}/${todo.id}`}
            className="btn btn-primary me-2">
            Get Todo by ID
        </a>
        <input
            value={todo.id}
            onChange={(e) => setTodo({
            ...todo, id: e.target.value })}
            className="form-control mb-2 mt-2"
            type="number"
        />
        <input
            value={todo.title}
            onChange={(e) => setTodo({
            ...todo, title: e.target.value })}
            className="form-control mb-2"
            type="text"
        />
        <input
            value={todo.description}
            onChange={(e) => setTodo({
            ...todo, description: e.target.value })}
            className="form-control mb-2"
            type="text"
        />
        <label for="completed">
            <input 
                type="checkbox"
                id="completed"
                checked={todo.completed}
                onClick={() => setTodo({ ...todo, completed: !todo.completed })}
            />
            Completed
        </label>
        <h3>Deleting from an Array</h3>
        <a href={`${API}/${todo.id}/delete`}
            className="btn btn-primary me-2">
            Delete Todo with ID = {todo.id}
        </a>
        <h3>Updating an Item in an Array</h3>
        <a
            href={`${API}/${todo.id}/title/${todo.title}`}
            className="btn btn-primary me-2" >
            Update Title to {todo.title}
        </a>
        <a
            href={`${API}/${todo.id}/description/${todo.description}`}
            className="btn btn-primary me-2" >
            Update Description to {todo.description}
        </a>
        <a
            href={`${API}/${todo.id}/completed/${todo.completed}`}
            className="btn btn-primary me-2" >
            Update Completed to {todo.completed.toString()}
        </a>
        <h3>Filtering Array Items</h3>
        <a href={`${API}?completed=true`}
            className="btn btn-primary me-2" >
            Get Completed Todos
        </a>
        <h4>Creating new Items in an Array</h4>
        <a href={`${API}/create`}
            className="btn btn-primary me-2">
            Create Todo
        </a>
      </div>
    );
}
export default WorkingWithArrays;