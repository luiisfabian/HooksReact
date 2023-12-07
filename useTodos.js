import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

export const useTodos = () => {
    const initialState = [
    ]
    // const [useTodos, setUseTodos] = useState()

    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }


    const [todos, dispatch] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
        console.log(todos);
        localStorage.setItem('todos', JSON.stringify(todos))

    }, [todos])

    const handleNewTodo = (todo) => {
        const action = {

            type: '[TODO] Add todo',
            payload: todo
        }
        dispatch(action)
    }


    const handleDeleteTodo = (id) => {
        console.log({ id });
        dispatch({
            type: '[TODO] remove todo',
            payload: id
        })
    }

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] toogle todo',
            payload: id
        })
    }

    return {
        todosCount: todos.length,
        todosPending: todos.filter((todo) => !todo.done).length,
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }
}