import { ToDoStatus } from "@/types/toDo";



export const statusColor = (status: string) => {
    switch(status){
        case 'in-progress':
            return 'text-[#00B0FF]';
        case 'pending':
            return 'text-[#FDD835]';
        case 'completed':
            return 'text-[#00C853]';        

    }
}