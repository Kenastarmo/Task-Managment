import React from "react";
import { User, LayoutList, BriefcaseBusiness, Book, SquareUserRound } from "lucide-react";
import { ToDo, ToDoCategory, ToDoStatus } from "@/types/toDo";

type DashboardProps = {
  todos: ToDo[];
}

const Dashboard = ({todos}: DashboardProps) => {

  const getCategoryCount = (category: ToDoCategory) => {
    return todos?.filter(todo => todo.category === category).length;
  }

  const getStatusCount = (status: ToDoStatus) => {
    return todos?.filter(todo => todo.status === status).length;
  }
  console.log("ovo je velicina todo niza ", todos?.length)

  return (
    <div className="dashboard w-80 flex flex-col bg-red p-8 gap-[50px] border-r border-r-solid border-r-[#00000012]">
      <div className="flex flex-row gap-3">
        <div className="p-4 bg-[#f3f4f6] rounded-full	border border-solid border-[#00000012]">
          <User size={48} color="#0061e0" strokeWidth={1.5} />
        </div>
        <div className="flex flex-col justify-center items-start p-2">
          <h5 className="text-[#000000] font-medium text-left text-[22px]">
            User
          </h5>
          <p className="text-left text-[#00000066]">user@gmail.com</p>
        </div>
      </div>

      <div className="p-1 w-full flex flex-row justify-between gap-2">
        <div className="flex flex-col gap-[2px] ">
          <h1 className="text-[22px] font-medium text-start">{getStatusCount('pending') || 0}</h1>
          <p className="text-[15px] font-normal text-[#0009]">Pending</p>
        </div>
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-[22px] font-medium text-start">{getStatusCount('completed') || 0}</h1>
          <p className="text-[15px] font-normal text-[#0009]">Completed</p>
        </div>
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-[22px] font-medium text-start ">{getStatusCount('in-progress') || 0}</h1>
          <p className="text-[15px] font-normal text-[#0009]">In Progress</p>
        </div>
      </div>

      <div className="categories flex flex-col justify-start gap-3">
        <h1 className="text-[24px] font-medium text-start mb-[8px]">
          Categories
        </h1>
        <div className="flex flex-row justify-start items-center p-2 gap-2 bg-[#f9f9f9] border border-solid border-[#00000012] rounded">
          <LayoutList size={26} color="#0061e0" strokeWidth={1.5} />
          <p className="text-[17px] ml-[10px]"> All ({todos?.length || 0})</p>
        </div>
        <div className="flex flex-row justify-start items-center p-2 gap-2 bg-[#f9f9f9] border border-solid border-[#00000012] rounded">
          <BriefcaseBusiness size={26} color="#0061e0" strokeWidth={1.5} />
          <p className="text-[17px] ml-[10px]"> Work ({getCategoryCount('work')})</p>
        </div>
        <div className="flex flex-row justify-start items-center p-2 gap-2 bg-[#f9f9f9] border border-solid border-[#00000012] rounded">
          <Book size={26} color="#0061e0" strokeWidth={1.5} />
          <p className="text-[17px] ml-[10px]"> Study ({getCategoryCount('study') || 0})</p>
        </div>
        <div className="flex flex-row justify-start items-center p-2 gap-2 bg-[#f9f9f9] border border-solid border-[#00000012] rounded">
          <SquareUserRound size={26} color="#0061e0" strokeWidth={1.5} />
          <p className="text-[17px] ml-[10px]"> School ({getCategoryCount('school') || 0})</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
