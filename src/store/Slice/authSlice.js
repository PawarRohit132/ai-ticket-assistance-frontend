import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helper/axios";
import toast from "react-hot-toast";

const initialState = {
  loading: true,
  status: false,
  userData: null,
  allUserData: null,
  signupError: null,
  loginError: null,
  logoutError: null,
  getCurrentUserError: null,
  getAllUsersError: null,
  updateUserDetailsError: null,
  refreshAccessTokenError: null,
};

export const createAccount = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/v1/users/signup", data, {
        withCredentials: true,
      });
      console.log(response);

      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "something went wrong",
      );
    }
  },
);

export const userLogin = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/v1/users/login", data, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", response.data.data.accessToken);

      toast.success(response.data.data);

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "something went wrong",
      );
    }
  },
);

export const userLogout = createAsyncThunk("logout", async () => {
  try {
    const response = await axiosInstance.post("/v1/users/logout");
    localStorage.removeItem("accessToken");
    toast.success(response.data.message);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "something went wrong",
    );
  }
});

export const getCurrentUser = createAsyncThunk(
  "getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/v1/users/getUsers", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "something went wrong",
      );
    }
  },
);

export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/v1/users/getAllUsers", {
        withCredentials: true,
      });
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "something went wrong",
      );
    }
  },
);

export const udateUserDetails = createAsyncThunk(
  "udateUserDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/v1/users/update-user-details",
        data,
        { withCredentials: true },
      );
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const refreshAccessToken = createAsyncThunk(
  "refreshAccessToken",
  async (data) => {
    try {
      const response = await axiosInstance.post(
        "/api/v1/users/refreshAccessToken",
        data,
        { withCredentials: true },
      );
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "something went wrong",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearLoginError: (state) => {
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createAccount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(createAccount.rejected, (state, action) => {
      state.loading = false;
      state.status = false;
      state.signupError = action.payload;
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.status = false;
      state.loginError = action.payload;
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.status = false;
      state.getCurrentUserError = action.payload;
    });
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.allUserData = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.status = false;
      state.getAllUsersError = action.payload;
    });
    builder.addCase(udateUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(udateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(udateUserDetails.rejected, (state, action) => {
      state.loading = false;
      state.status = false;
      state.updateUserDetailsError = action.payload;
    });
    builder.addCase(refreshAccessToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(refreshAccessToken.rejected, (state, action) => {
      state.loading = false;
      state.status = false;
      state.refreshAccessTokenError = action.payload;
    });
    builder.addCase(userLogout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      ((state.loading = false),
        (state.status = false),
        (state.userData = null),
        (state.loginError = null));
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      ((state.loading = false),
        (state.status = false),
        (state.logoutError = action.payload));
    });
  },
});

export default authSlice.reducer;
export const { clearLoginError } = authSlice.actions;
