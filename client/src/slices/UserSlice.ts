import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApis from "@/apis/user/userApis";


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

interface UserState {
    user: UserResponse | null;
    loading: boolean;
    error: string | null;
    success: boolean;
    message: string | null;
    isAuthenticated: boolean;
}


const initialState: UserState = {
    user: null,
    loading: false,
    success: false,
    error: null,
    message: null,
    isAuthenticated: false,
};


export const createUser = createAsyncThunk<
    ApiResponse<UserResponse>,
    User,
    { rejectValue: string }
>("user/createUser", async (user, { rejectWithValue }) => {
    try {
        const response = await userApis.createUser(user);
        return response;
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Failed to create user'
        );
    }
});

export const loginUser = createAsyncThunk<
    ApiResponse<UserResponse>,
    Partial<User>,
    { rejectValue: string }
>("user/loginUser", async (credentials, { rejectWithValue }) => {
    try {
        const response = await userApis.loginUser(credentials as User);
        return response;
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Failed to login'
        );
    }
});

export const getCurrentUser = createAsyncThunk<
    ApiResponse<UserResponse>,
    void,
    { rejectValue: string }
>("user/getCurrentUser", async (_, { rejectWithValue }) => {
    try {
        const response = await userApis.getCurrentUser();
        return response;
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Failed to get current user'
        );
    }
});

export const updateUser = createAsyncThunk<
    ApiResponse<UserResponse>,
    Partial<User>,
    { rejectValue: string }
>("user/updateUser", async (userData, { rejectWithValue }) => {
    try {
        const response = await userApis.updateUser(userData as User);
        return response;
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Failed to update user'
        );
    }
});

export const deleteUser = createAsyncThunk<
    ApiResponse<UserResponse>,
    void,
    { rejectValue: string }
>("user/deleteUser", async (_, { rejectWithValue }) => {
    try {
        const response = await userApis.deleteUser();
        return response;
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Failed to delete user'
        );
    }
});

export const logoutUser = createAsyncThunk<
    ApiResponse<UserResponse>,
    void,
    { rejectValue: string }
>("user/logoutUser", async (_, { rejectWithValue }) => {
    try {
        const response = await userApis.logoutUser();
        return response;
    } catch (error) {
        return rejectWithValue(
            error instanceof Error ? error.message : 'Failed to logout user'
        );
    }
});


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.message = null;
        },
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        builder

            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data ?? null;
                state.message = action.payload.message;
                state.success = action.payload.success;
                // state.isAuthenticated = !!action.payload.data;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'An error occurred';
                state.isAuthenticated = false;
            })


            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data ?? null;
                state.message = action.payload.message;
                // state.isAuthenticated = !!action.payload.data;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'An error occurred';
                state.isAuthenticated = false;
            })

            .addCase(getCurrentUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data ?? null;
                state.isAuthenticated = !!action.payload.data;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'An error occurred';
                state.isAuthenticated = false;
            })

            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data ?? null;
                state.message = action.payload.message;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'An error occurred';
            })

            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, () => initialState)
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'An error occurred';
            })
            .addCase(logoutUser.fulfilled, () => initialState)
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload ?? 'An error occurred';
            });
    },
});


export const { clearError, resetState } = userSlice.actions;

export default userSlice.reducer;