import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the types for the task data
interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

interface CreateTaskRequest {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
  priority?: "low" | "medium" | "high";
}

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/tasks" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => '/get-tasks',
      providesTags: ["Tasks"],
    }),
    
    addTask: builder.mutation<Task, CreateTaskRequest>({
      query: (body) => ({
        url: "/create-task",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    
    updateTask: builder.mutation<Task, { taskId: string; body: UpdateTaskRequest }>({
      query: ({ taskId, body }) => ({
        url: `/update-task/${taskId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
    
    deleteTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `/delete-task/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;

export default tasksApi;