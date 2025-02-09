export type ToDoStatus = 'pending' | 'completed' | 'in-progress';
export type ToDoPriority = 'high' | 'medium' | 'low';
export type ToDoCategory = 'work' | 'school' | 'study';

export type ToDo = {
    id: string;
    title: string;
    description: string;
    // priority: string;
    priority: ToDoPriority;
    // category: string;
    category: ToDoCategory;
    status: string;
    createdAt: string;
    startDate: string;
    endDate: string;
    comment?: string | undefined;
}