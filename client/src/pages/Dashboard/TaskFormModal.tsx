import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"

import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,} from "@/components/ui/dialog";
import { Select,SelectContent,SelectGroup,SelectItem,SelectLabel,SelectTrigger,SelectValue,} from "@/components/ui/select";

import { useAddTaskMutation, useUpdateTaskMutation } from '@/slices/TasksSlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';



type FormType = "add" | "edit";


interface TaskFormData {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  completed?: boolean;
  _id?: string;
}

// Types for props
interface TaskFormModalProps {
  formType: FormType;
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  initialData?: TaskFormData;
}


export default function TaskFormModal({ formType, isFormOpen, setIsFormOpen, initialData }: TaskFormModalProps) {
  const userId = useSelector((state: RootState) => state.user.user?._id);  
  // State for form data
    const [formData, setFormData] = useState<TaskFormData>({
      title: initialData?.title || "",
      description: initialData?.description || "",
      priority: initialData?.priority || "medium"
    });

    const [addTask] = useAddTaskMutation();
    const [updateTask] = useUpdateTaskMutation();

    
  
  // Input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Priority change handler (for Select component)
  const handlePriorityChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      priority: value as TaskFormData['priority']
    }));
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(formType === 'add') {
      // Handle adding a new task
      const values = {...formData,user: userId};

      addTask(values);
      setIsFormOpen(false);

      
    } else {
      // Handle updating an existing task
      updateTask({taskId: initialData?._id || '', body: formData});
      setIsFormOpen(false);
    }
    
  };

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);




  return (
    <>
    
    
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {formType === "add" ? "Add a new task" : "Edit task"}
          </DialogTitle>
          <DialogDescription>
            {formType === "add"
              ? "Fill in the information to add a new task"
              : "Update the information and save the task"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          
            <div className="mb-4">
              <Input
                id="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
          
          
          <div className="mb-4">
            <Textarea
              id="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="mb-4">
            <Select 
              value={formData.priority}
              onValueChange={handlePriorityChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Priority</SelectLabel>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <Button type="submit" className="w-full mt-4">
            {formType === "add" ? "Add task" : "Save changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
    </>
  );
}