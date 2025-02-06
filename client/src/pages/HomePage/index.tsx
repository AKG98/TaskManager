import Navbar from "@/components/custom/Navbar";
import About from "./About";
import Demo from "./Demo";
import Footer from "./Footer";
import HomePage from "./HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCurrentUser } from "@/slices/UserSlice";
import { RootState, AppDispatch } from "@/store";
import Spinner from "@/components/custom/Spinner";




interface UserState {
  error: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  message: string | null;
}

export default function Index() {
  const { isAuthenticated, loading}: UserState = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(getCurrentUser());      
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
      } 
    };

    fetchUserData(); 
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Spinner />;
  }


  return (
    <>
      <Navbar />
      <HomePage />
      <Demo />
      <About />
      <Footer />
    </>
  );
}
