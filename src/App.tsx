
import { useState } from "react";
import "./App.css";
import { cn } from "./lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToDo } from "./types/toDo";

/**Components */
import Dashboard from "./components/Dashboard";
import { CreateTodoDialog } from "./components/CreateTodo";
import { RootState } from "./store/store";
import { ToDo, ToDoPriority, ToDoStatus } from "./types/toDo";
import { addToDo, deleteToDo, updateTodo, updateToDoStatus, updateToDoPriority } from "./store/todoSlice";
import ToDoList from "./components/ToDoList";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const statusFilter = useSelector((state: RootState) => state.todos.status);

  console.log("ovo je velicina todos niza u app", todos?.length)

  const handleAddToDo = (
    toDoData: Omit<ToDo, "id" | "status" | "createdAt">
  ) => {
    const newToDo: ToDo = {
      id: uuidv4(),
      status: "pending",
      title: toDoData.title,
      description: toDoData.description,
      priority: toDoData.priority,
      category: toDoData.category,
      createdAt: new Date().toString(),
      startDate: toDoData.startDate,
      endDate: toDoData.endDate,
      comment: toDoData.comment,
    };

    dispatch(addToDo(newToDo));
  };

  const handleDelete = (id: string) => {
    console.log("deleteing id : ", id)
    dispatch(deleteToDo(id))
  } 

  const handleUpdateTodo = (updatedTodo: ToDo) => {
    dispatch(updateTodo(updatedTodo))
  }

  const handleChangeStatus = (id: string, newStatus: ToDoStatus) => {
    dispatch(updateToDoStatus({ id, status: newStatus}));
  } 

  const handleChangePriority = (id: string, priority: ToDoPriority) => {
    dispatch(updateToDoPriority({ id, priority }))
  }

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="w-full min-h-screen flex flex-col md:flex-row justify-start ">
      <Dashboard
      todos={todos}
      ></Dashboard>
      <div className="flex-1 flex flex-col justify-start items-center bg-[#f3f4f6] p-4 md:p-8">
        <div className="max-w-[100%] min-w-[100%] md:max-w-[90%] md:min-w-[90%]">
          <div className="w-full flex justify-between mt-[10px] md:mt-[30px]">
            <h1 className="text-[42px] font-bold text-start text-[#000000]">
              Task Manager
            </h1>
            <CreateTodoDialog onSubmit={handleAddToDo} />
          </div>
          <ToDoList 
          todos={todos} 
          onDelete={handleDelete}
          onUpdate={handleUpdateTodo}
          onStatusChange={handleChangeStatus}
          onChangePriority={handleChangePriority}>
          </ToDoList>
        </div>
      </div>
    </div>
    </DndProvider>
  );
}

export default App;
