import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Toast from "@/components/custom/Toast";
import { useDispatch } from "react-redux";
import { createUser, loginUser } from "@/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { ThunkDispatch } from "@reduxjs/toolkit";

interface FormData {
    name: string;
    email: string;
    password: string;
}

type ToastTypes = "success" | "error" | "warning" | "info";


export default function AuthIndex() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
    });
    const [formType, setFormType] = useState<"login" | "signup">("login");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [toastType, setToastType] = useState<ToastTypes | undefined>(undefined);
    const dispatch = useDispatch<ThunkDispatch<RootState, any, any>>();
    const navigate = useNavigate();

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
        const {id, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    }
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        
        try {
            if(formType === "login"){
                const response = await dispatch(loginUser(formData));
                if(response.meta.requestStatus === 'rejected'){
                    setMessage(response.payload as string);
                    setToastType("error");
                    return;
                }
                navigate("/dashboard");
            } else {
                const response = await dispatch(createUser(formData));
                if(response.meta.requestStatus === 'rejected'){
                    setMessage(response.payload as string);
                    setToastType("error");
                    return;
                }
                setFormType("login");
                setMessage("Account created successfully");
                setToastType("success");
            }
        } catch (error) {
            setMessage("An unexpected error occurred");
            setToastType("error");
        }
    }

    function toggleFormType(){
        setFormType(formType === "login" ? "signup" : "login");
        setFormData({ name: "", email: "", password: "" });
    }

    useEffect(() => {
        if(message){
            const timer = setTimeout(() => {
                setMessage(null);
                setToastType(undefined);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <main className="w-screen h-screen flex flex-col items-center pt-20">
            <Toast message={message} toastType={toastType} />
            <div className="w-full max-w-md p-10 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold">
                    {formType === "login" ? "Welcome back!" : "Create an account"}
                </h1>
                <p className="text-gray-500 mb-4 text-sm">
                    {formType === "login"
                        ? "Enter your credentials to access your account"
                        : "Fill in the information to create your account"}
                </p>
                <form onSubmit={handleSubmit}>
                    {formType === "signup" && (
                        <div className="mb-2">
                            <Label className="text-sm" htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    )}

                    <div className="mb-2">
                        <Label className="text-sm" htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-5 relative">
                        <Label className="text-sm" htmlFor="password">Password</Label>
                        <div className="flex items-center">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            
                            <Button 
                                type="button"
                                variant="ghost" 
                                size="icon" 
                                className="absolute right-0"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </Button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        {formType === "login" ? "Login" : "Sign Up"}
                    </Button>

                    <div className="text-center mt-4">
                        <Button 
                            type="button" 
                            variant="link" 
                            onClick={toggleFormType}
                        >
                            {formType === "login"
                                ? "New user? Create an account"
                                : "Already have an account? Login"}
                        </Button>
                    </div>
                </form>  
                <div className="text-center">
                    <Button variant='link' onClick={() => navigate(-1)}>Go Back</Button>    
                </div>
            </div>
        </main>
    );
}