import { ToDo, ToDoStatus } from "@/types/toDo";
import React from "react";
import { ToDoPriority } from "@/types/toDo";
import ToDoSection from "./ToDoSection";

type ToDoListProps = {
  todos: ToDo[];
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ToDoStatus) => void;
  onChangePriority: (id: string, priority: ToDoPriority) => void;
};

const ToDoList = ({ todos, onDelete, onStatusChange, onChangePriority }: ToDoListProps) => {
  const filterByPriorities = (priority: ToDoPriority): ToDo[] => {
    return todos.filter((todo) => todo.priority === priority);
  };

  return (
    <div className="bg-[#f9fafb] mt-[80px] p-6 rounded flex flex-col gap-12">
      <ToDoSection
        filteredToDos={filterByPriorities("high")}
        title={"High Priority"}
        priority={"high"}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        onChangePriority={onChangePriority}
      ></ToDoSection>
      <ToDoSection
        filteredToDos={filterByPriorities("medium")}
        title={"Medium Priority"}
        priority={"medium"}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        onChangePriority={onChangePriority}
      ></ToDoSection>
      <ToDoSection
        filteredToDos={filterByPriorities("low")}
        title={"Low Priority"}
        priority={"low"}
        onDelete={onDelete}
        onStatusChange={onStatusChange}
        onChangePriority={onChangePriority}
      ></ToDoSection>
      
    </div>
  );
};

export default ToDoList;
