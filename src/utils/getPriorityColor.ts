import { ToDoPriority } from "@/types/toDo";

export const priorityColor = (priority: ToDoPriority) => {
    switch(priority){
        case 'high':
            return 'text-[#FF0000]';
        case 'medium':
            return 'text-[#00FF00]';
        case 'low':
            return 'text-[#0000FF]';        

    }
}