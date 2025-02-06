import { CiMenuFries } from "react-icons/ci";
import { Button } from "../ui/button";
import { useState } from "react";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = () => {
    setIsOpen(false);
  };
  
  const handleAuthClick = () => {
    navigate('/auth');
  };
  
  return (
    <nav className='bg-white w-[100dvw] h-[10dvh] flex items-center justify-between lg:px-20 px-5 fixed top-0 z-10'>
      <div className='flex gap-1 font-bold text-2xl'>
        <h1 className='text-[#294496]'>Task</h1>
        <h1>Master</h1>
      </div>
      <Button
        className='bg-[#294496] text-white rounded-full home-btn hover:scale-105 transform transition duration-300 ease-in-out'
        size='sm'
        onClick={() => setIsOpen(true)}
      >
        <CiMenuFries />
      </Button>
      <Drawer
        open={isOpen}
        onOpenChange={setIsOpen}
        direction="right"
      >
        <DrawerContent className="h-full w-[300px]">
          <DrawerHeader>
            <DrawerTitle>Task Master</DrawerTitle>
            <DrawerDescription>Welcome</DrawerDescription>
          </DrawerHeader>
          <div className='flex flex-col gap-4 p-4'>
            <a href='#home' onClick={handleNavClick}>Home</a>
            <a href='#demo' onClick={handleNavClick}>How it works?</a>
            <a href='#about' onClick={handleNavClick}>About</a>
            <a href='#contact' onClick={handleNavClick}>Contact</a>
          </div>
          <DrawerFooter className="flex flex-col gap-2">
            <Button onClick={handleAuthClick} className="w-full">
              SignIn
            </Button>
            <DrawerClose className="w-full border py-1 rounded-md" >
              Cancel
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </nav>
  )
}