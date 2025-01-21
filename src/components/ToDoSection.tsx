import { ToDo, ToDoPriority, ToDoStatus } from "@/types/toDo";
import React from "react";
import { useDrop } from 'react-dnd'
import { priorityColor } from "@/utils/getPriorityColor";
import ToDoItem from "./ToDoItem";

type ToDoSectionProps = {
  filteredToDos: ToDo[];
  title: string;
  priority: "high" | "medium" | "low";
  onDelete: (id: string) => void;
  onStatusChange: (id: string,  status: ToDoStatus) => void;
  onChangePriority: (id: string, priority: ToDoPriority) => void;
};

const ToDoSection = ({ filteredToDos, title, priority, onDelete, onStatusChange, onChangePriority }: ToDoSectionProps) => {
  console.log("ovo je title prvoj ", filteredToDos[0]?.title);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'todo',
    drop: (item: { id: string; type: string }) => {
      if (item.type === 'todo') {
        onChangePriority(item.id, priority);
        return { priority };
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }), [priority, onChangePriority]);


  return (
    <div className=" flex flex-col gap-4">
      {/* <p>{filteredToDos.map(item => {
            return (
                <li key={item.id}>{item.title}</li>
                
            )
        })}</p> */}

      <div
        className={`p-6 w-full rounded-lg flex justify-start bg-[#FFFFFF] shadow-[0_3px_10px_rgb(0,0,0,0.05)] ${isOver ? 'ring-2' : ''}` }
        ref={drop}
      >
        <h1 className={`text-[18px] font-medium] ${priorityColor(priority)}`}>
          {title}
        </h1>
      </div>
      <div className="results grid grid-cols-2 gap-2">
        {filteredToDos.map((todo) => {
          return (
            <ToDoItem
              id={todo.id}
              title={todo.title}
              description={todo.description}
              status={todo.status}
              priority={todo.priority}
              startDate={todo.startDate}
              endDate={todo.endDate}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
              onChangePriority={onChangePriority}
            ></ToDoItem>
          );
        })}
      </div>
    </div>
  );
};

export default ToDoSection;
