import { RiEdit2Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import TaskFormModal from "./TaskFormModal";
import { Badge } from "@/components/ui/badge";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/slices/TasksSlice";

interface TaskData {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

interface TaskCardProps {
  taskData: TaskData;
  isLoading?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onComplete?: (id: string) => void;
}

type FormType = 'add' | 'edit';

export default function TaskCard({ taskData, isLoading = false }: TaskCardProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>('edit');
  const [initialData, setInitialData] = useState<TaskData | undefined>(undefined);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  if (isLoading) {
    return (
      <Card className="w-full max-w-[380px] min-h-[200px] flex flex-col">
        <CardHeader className="relative">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="flex-grow">
          <Skeleton className="h-full w-full" />
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-10 w-1/2" />
        </CardFooter>
      </Card>
    );
  }

  function handleEdit() {
    setIsFormOpen(true);
    setFormType('edit');
    setInitialData(taskData);
  }

  function handleDelete() {
    deleteTask(taskData._id);
  }

  function handleComplete() {
    // Toggle task completion status based on current state
    updateTask({
      taskId: taskData._id,
      body: { ...taskData, completed: !taskData.completed, priority: taskData.priority as 'high' | 'medium' | 'low' },
    });
  }

  function getPriorityColor() {
    switch (taskData.priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-gray-800';
    }
  }

  function getFormattedData(date: string) {
    const nDate = new Date(date);
    return nDate.toDateString();
  }

  return (
    <>
      <Card className={ ' bg-white w-full max-w-[380px] h-[max-content] flex flex-col overflow-hidden' }>
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleEdit}
            aria-label="Edit task"
          >
            <RiEdit2Fill />
          </Button>
          <CardTitle>{taskData.title}</CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription>{taskData.createdAt ? getFormattedData(taskData.createdAt) : ''}</CardDescription>
            <div className="flex items-center gap-2">
              <Badge className={getPriorityColor()}>{taskData.priority}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{taskData.description}</p>
        </CardContent>

        <CardFooter className="flex justify-between gap-2">
          <AlertDialog open={isDeleting} onOpenChange={setIsDeleting}>
            <Button
              variant={'outline'}
              className="flex-1 text-red-500 border-red-500 hover:text-white hover:bg-red-500"
              onClick={() => setIsDeleting(true)}
            >
              Delete
            </Button>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button className="flex-1" onClick={handleComplete}>
            {taskData.completed ? 'Mark as undone' : 'Mark as done'}
          </Button>
        </CardFooter>
        {taskData.completed && (
        <div className="bg-green-500 h-5 w-full">
          <p className="text-sm text-center text-white">completed</p>
        </div>
        )}
      </Card>

      {isFormOpen && (
        <TaskFormModal
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
          formType={formType}
          initialData={initialData}
        />
      )}
    </>
  );
}
