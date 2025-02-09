// import React, { useState } from "react";
// import { ToDo, ToDoPriority, ToDoStatus } from "@/types/toDo";
// import { format } from "date-fns";
// import { useDrag } from "react-dnd"
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "./ui/select";
// import { Calendar, Trash2, Pen } from "lucide-react";
// import { StatusIcon } from "./StatusIcon";
// import { statusColor } from "@/utils/getStatusColor";
// import { CreateTodoDialog } from "./CreateTodo";

// type ToDoItemProps = {
//   todo: ToDo;
//   onDelete: (id: string) => void;
//   onStatusChange: (id: string, status: ToDoStatus) => void;
//   onChangePriority: (id: string, priority: ToDoPriority) => void;
// };

// const ToDoItem = ({
//   todo,
//   onDelete,
//   onStatusChange,
//   onChangePriority
// }: ToDoItemProps) => {

//   const [editOpen, setEditOpen] = useState<boolean>(false);

//   console.log("Current status:", todo.status);


//     const [{ isDragging }, drag] = useDrag({
//         type: 'todo',
//         item: { type: 'todo', id: todo.id },
//         collect: (monitor) => ({
//           isDragging: monitor.isDragging(),
//         }),
//       });

//   return (
//     <div className="card flex flex-col justify-start p-6 bg-[#FFFFFF] rounded shadow-[0_3px_10px_rgb(0,0,0,0.05)] relative group"
//     ref={drag}>
//       <h4 className="text-[18px] text-start mb-[6px]">{todo.title}</h4>
//       <p className="text-[14px] text-[#3939399c] text-start">{todo.description}</p>

//       <div className="date mt-[20px] flex flex-col gap-[4px]">
//         <div className="start-date flex flex-row justify-start items-center gap-2">
//           <Calendar size={16} color="#777777"></Calendar>
//           <p className="text-[14px] text-[#777777]">
//             Start: {format(todo.startDate, "PPP")}
//           </p>
//         </div>
//         <div className="end-date flex flex-row justify-start items-center gap-2">
//           <Calendar size={16} color="#777777"></Calendar>
//           <p className="text-[14px] text-[#777777]">
//             End: {format(todo.endDate, "PPP")}
//           </p>
//         </div>
//         <div
//           onClick={() => {
//             onDelete(todo.id);
//           }}
//           className="delete items-center p-2 bg-[red] rounded absolute bg-[white] hover:bg-[#f3f5f6] cursor-pointer right-[20px] top-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <Trash2 size={17}></Trash2>
//         </div>

//         <div
//           onClick={() => {
//             setEditOpen(true);
//           }}
//           className="delete items-center p-2 bg-[red] rounded absolute bg-[white] hover:bg-[#f3f5f6] cursor-pointer right-[60px] top-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//           <Pen size={17}></Pen>
          
//         </div>
        

//         <div className="unurasnji flex flex-row items-center justify-end gap-2 absolute bottom-[32px] right-[32px]">
//           <StatusIcon status={todo.status}></StatusIcon>
//           <p className={`${statusColor(todo.status)}`}>{todo.status.replace("-", " ")}</p>
//         </div>

//         <div className="status absolute right-[20px] top-[20px]">
//           <Select
//             value={todo.status}
//             onValueChange={(newStatus) =>
//               onStatusChange(todo.id, newStatus as ToDoStatus)
//             }
//           >
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select a priority" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="completed">Completed</SelectItem>
//                 <SelectItem value="in-progress">In-progress</SelectItem>
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ToDoItem;






import React, { useState } from "react";
import { ToDo, ToDoPriority, ToDoStatus } from "@/types/toDo";
import { format } from "date-fns";
import { useDrag } from "react-dnd";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem, SelectGroup } from "./ui/select";
import { Calendar, Trash2, Pen } from "lucide-react";
import { StatusIcon } from "./StatusIcon";
import { statusColor } from "@/utils/getStatusColor";
import { CreateTodoDialog } from "./CreateTodo";
import TodoEditDialog from "./TodoEditDialog";

type ToDoItemProps = {
  // id: string;
  // title: string;
  // description: string;
  // status: string;
  // startDate: string;
  // endDate: string;
  // priority: string;
  todo: ToDo;
  onDelete: (id: string) => void;
  onUpdate: (updatedTodo: ToDo) => void;
  onStatusChange: (id: string, status: ToDoStatus) => void;
  onChangePriority: (id: string, priority: ToDoPriority) => void;
};

const ToDoItem = ({
  // id,
  // title,
  // description,
  // status,
  // startDate,
  // endDate,
  // priority,
  todo,
  onDelete,
  onStatusChange,
  onChangePriority,
  onUpdate,
}: ToDoItemProps) => {

  const [editOpen, setEditOpen] = useState<boolean>(false);
  console.log(editOpen)

    const [{ isDragging }, drag] = useDrag({
        type: 'todo',
        item: { type: 'todo', id: todo.id },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });

  return (
    <div className="card flex flex-col justify-start p-6 bg-[#FFFFFF] rounded shadow-[0_3px_10px_rgb(0,0,0,0.05)] relative group"
    ref={drag}>
      <h4 className="text-[18px] text-start mb-[6px]">{todo.title}</h4>
      <p className="text-[14px] text-[#3939399c] text-start">{todo.description}</p>

      <div className="date mt-[20px] flex flex-col gap-[4px]">
        <div className="start-date flex flex-row justify-start items-center gap-2">
          <Calendar size={16} color="#777777"></Calendar>
          <p className="text-[14px] text-[#777777]">
            Start: {format(todo.startDate, "PPP")}
          </p>
        </div>
        <div className="end-date flex flex-row justify-start items-center gap-2">
          <Calendar size={16} color="#777777"></Calendar>
          <p className="text-[14px] text-[#777777]">
            End: {format(todo.endDate, "PPP")}
          </p>
        </div>
        <div
          onClick={() => {
            onDelete(todo.id);
          }}
          className="delete items-center p-2 bg-[red] rounded absolute bg-[white] hover:bg-[#f3f5f6] cursor-pointer right-[20px] top-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Trash2 size={17}></Trash2>
        </div>

        <div 
          onClick={() => {
            setEditOpen(true);
          }}
          className="edit editujItem items-center p-2 bg-[red] rounded absolute bg-[white] hover:bg-[#f3f5f6] cursor-pointer right-[60px] top-[70px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Pen size={17}></Pen>
          
        </div>
        {/* <div className=" flex flex-row items-center justify-start gap-2">
          <StatusIcon status={status}></StatusIcon>
          <p className={`${statusColor(status)}`}>{status.replace('-', ' ')}</p>
        </div> */}

        <div className="unurasnji flex flex-row items-center justify-end gap-2 absolute bottom-[32px] right-[32px]">
          <StatusIcon status={todo.status}></StatusIcon>
          <p className={`${statusColor(todo.status)}`}>{todo.status.replace("-", " ")}</p>
        </div>

        <div className="status absolute right-[20px] top-[20px]">
          <Select
            value={todo.status}
            onValueChange={(newStatus) =>
              onStatusChange(todo.id, newStatus as ToDoStatus)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue  placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In-progress</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {editOpen && <TodoEditDialog todo={todo} open={editOpen} onUpdate={onUpdate} onOpenChange={setEditOpen}></TodoEditDialog>}

    </div>
  );
};

export default ToDoItem;
