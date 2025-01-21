import React from 'react'
import { ToDoStatus } from '@/types/toDo'
import { CheckCircle2, Clock, Loader2 } from 'lucide-react';


type StatusIconProps = {
    status: string;
}

export const StatusIcon = ( {status}: StatusIconProps )  => {
  switch(status){
    case 'completed':
        return <CheckCircle2 size={16} className='text-[#00C853]'></CheckCircle2>
    case 'pending':
        return <Loader2 size={16} className='text-[#FDD835]'></Loader2>
    case 'in-progress':
        return <Clock size={16} className='text-[#00B0FF]'></Clock>    
  }
}
