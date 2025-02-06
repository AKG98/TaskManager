import { useEffect, useState } from "react"; 
import { Button } from "@/components/ui/button"; 
import AddTask from "./AddTask"; 
import DashNav from "./DashNav"; 
import TaskCard from "./TaskCard"; 
import { useGetTasksQuery } from "@/slices/TasksSlice"; 

 
interface Task { 
  _id: string; 
  title: string; 
  description: string; 
  completed: boolean; 
  priority: "high" | "medium" | "low"; 
  createdAt: string; 
} 

interface TasksResponse {
  data: Task[];

}
 
export default function TaskDashboard() { 
  const { data } = useGetTasksQuery<{ data: TasksResponse | undefined }>();
  const [allTasks, setAllTasks] = useState<Task[]>([]); 
  const [filter, setFilter] = useState<boolean>(false); 
 
  useEffect(() => { 
    if (data?.data) { 
      setAllTasks(data.data); 
    } 
  }, [data]); 
 
  const filteredTasks = allTasks?.filter(task => task.completed === filter) || []; 
 
  return ( 
    <div className="relative"> 
      <DashNav /> 
      <main className="pt-16 min-h-screen"> 
        <div className="sticky top-16 bg-background z-10 py-4"> 
          <div className="container flex justify-center"> 
            <div className="flex gap-4"> 
              <Button 
                variant={filter === false ? 'default' : 'link'} 
                onClick={() => setFilter(false)}  
              > 
                Pending 
              </Button> 
              <Button 
                variant={filter === true ? 'default' : 'link'}  
                onClick={() => setFilter(true)}  
              > 
                Completed 
              </Button> 
            </div> 
          </div> 
        </div> 
 
        <div className="container py-8"> 
          {filteredTasks.length === 0 ? ( 
            <div className="flex justify-center items-center px-10"> 
              <p className="text-2xl text-muted-foreground text-center"> 
                {filter ? "You're capable! Complete your task." : 'Get started, plan your day'} 
              </p> 
            </div> 
          ) : ( 
            <div className="w-full max-w-[1200px] mx-auto flex flex-wrap justify-center gap-4"> 
              {filteredTasks.map((task) => ( 
                <TaskCard 
                  key={task._id} 
                  taskData={task} 
                /> 
              ))} 
            </div> 
          )} 
        </div> 
      </main> 
      <AddTask /> 
    </div> 
  ); 
}