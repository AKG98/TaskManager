import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RootState, AppDispatch } from "@/store";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/slices/UserSlice";
import {tasksApi} from "@/slices/TasksSlice";



export default function DashNav() {
  const userName = useSelector((state: RootState) => state.user.user?.name);
  const [userInitials, setUserInitials] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (userName) {
      const initials = userName.split(' ').map(name => name[0]).join('').toUpperCase();
      setUserInitials(initials);
    }
  }, [userName]);

  // Handle logout action
  function logoutHandler() {
    dispatch(logoutUser());
    dispatch(tasksApi.util.resetApiState());
    navigate('/');
  };

  return (
    <nav className="bg-white w-[100dvw] h-[10dvh] flex items-center justify-between lg:px-40 px-5 fixed top-0 z-10">
      <div className="flex gap-1 font-bold text-2xl">
        <h1 className="text-[#294496]">Task</h1>
        <h1>Master</h1>
      </div>


      <DropdownMenu>
        <DropdownMenuTrigger
          className="border rounded-full h-10 w-10 hover:scale-105 transform transition duration-300 ease-in-out"
        >
          {userInitials}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logoutHandler}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
