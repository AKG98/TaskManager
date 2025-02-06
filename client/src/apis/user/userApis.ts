
interface User {
    name: string;
    email: string;
    password: string;
}

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

interface UserResponse {
    _id: string;
    name: string;
    email: string;
}

async function createUser(user: User): Promise<ApiResponse<UserResponse>> {
    try {
        const response = await fetch("/api/users/signup-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create user");
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
        throw new Error("Failed to create user");
    }
}

async function loginUser(user: User): Promise<ApiResponse<UserResponse>> {
    try {
        const response = await fetch("/api/users/login-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to login");
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to login: ${error.message}`);
        }
        throw new Error("Failed to login");
    }
}

async function getCurrentUser(): Promise<ApiResponse<UserResponse>> {
    try {
        const response = await fetch("/api/users/current-user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to get current user");
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to get current user: ${error.message}`);
        }
        throw new Error("Failed to get current user");
    }
}

async function updateUser(user: User): Promise<ApiResponse<UserResponse>> {
    try {
        const response = await fetch("/api/users/update-user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to update user");
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
        throw new Error("Failed to update user");
    }
}

async function deleteUser(): Promise<ApiResponse<UserResponse>> {
    try {
        const response = await fetch("/api/users/delete-user", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to delete user");
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
        throw new Error("Failed to delete user");
    }
}

async function logoutUser(): Promise<ApiResponse<UserResponse>> {
    try {
        const response = await fetch("/api/users/logout-user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to logout user");
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to logout user: ${error.message}`);
        }
        throw new Error("Failed to logout user");
    }
}



const userApis = {
    createUser,
    loginUser,
    getCurrentUser,
    updateUser,
    deleteUser,
    logoutUser,
};

export default userApis;