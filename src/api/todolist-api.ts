import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '3356848e-44a4-478d-85f0-1e1fabb15c46'
    }
});
export type TodolistType = {
    id: string
    addedDate: number
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export type UpdateTaskModelType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string

}

export const todoApi = {
    //methods on todoLists
    getTodos() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    //methods on tasks
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    createTask(todoListId: string, taskTitle: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${todoListId}/tasks`,{taskTitle} )
    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    }
}

