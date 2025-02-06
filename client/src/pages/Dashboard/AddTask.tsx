import { Button } from '@/components/ui/button'
import { RiApps2AddFill } from "react-icons/ri";
import TaskFormModal from './TaskFormModal';
import { useState } from 'react';

type FormType = 'add' | 'edit';

export default function AddTask() {
    const[isFormOpen, setIsFormOpen] = useState(false);
    const[formType, setFormType] = useState<FormType>('add');
    
    function handleAddTask() {
        setIsFormOpen(true);
        setFormType('add');
    }

  return (
    <>
    <Button 
        className='fixed bottom-10 h-15 w-15 right-10 rounded-full bg-[#294496] text-white p-4 hover:scale-105 transform transition duration-300 ease-in-out'
        onClick={handleAddTask}>
      <RiApps2AddFill />
    </Button>
    {isFormOpen && (
        <TaskFormModal
          formType={formType}
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
        />
    )}
    </>
  )
}
