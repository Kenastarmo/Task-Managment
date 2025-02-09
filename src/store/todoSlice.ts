import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToDo, ToDoStatus, ToDoPriority, ToDoCategory } from '@/types/toDo';

interface ToDoState {
    todos: ToDo[],
    status: ToDoStatus  | 'all',
    category: ToDoCategory | 'all',
    priority: ToDoPriority | 'all',
    startDate?: string,
    endDate?: string;
}

const initialState : ToDoState = {
    todos: [],
    status: 'all',
    category: 'all',
    priority: 'all',
};

export const toDoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addToDo : (state, action: PayloadAction<ToDo>) => {
            state.todos.push(action.payload);
        },

        deleteToDo : (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },

        updateTodo : (state, action: PayloadAction<ToDo>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id)
            if(index !== -1){
                state.todos[index] = action.payload
            }
        },
        
        updateToDoStatus : (state, action: PayloadAction<{ id: string, status: ToDoStatus }>) => {
            const todo = state.todos.find( todo => todo.id === action.payload.id)
            if(todo){
                todo.status = action.payload.status;
            }
        },

        updateToDoPriority: (state, aciton: PayloadAction<{id: string, priority: ToDoPriority}>) => {
            const todo = state.todos.find(todo => todo.id === aciton.payload.id)
            if(todo){
                todo.priority = aciton.payload.priority;
            }
        }
    }
})

export const {
    addToDo,
    deleteToDo,
    updateTodo,
    updateToDoStatus,
    updateToDoPriority,
} = toDoSlice.actions;

export default toDoSlice.reducer;