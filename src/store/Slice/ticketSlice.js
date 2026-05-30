import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helper/axios";

const initialState = {
  loading: false,
  status: false,
  tickets: [],
  selectedTicket: null,
  createTicketError: null,
  getTicketByIdError: null,
  getTicketsError: null,
  ticketSolvedError : null
};

export const createTicket = createAsyncThunk(
  "createTicket",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/v1/tickets/ticketCreated",
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

export const getTicketById = createAsyncThunk(
  "getTicketById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/v1/tickets/${id}`, {
        withCredentials: true,
      });

      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      console.log(error);

      return rejectWithValue(
        error.response?.data?.message || "something went wrong",
      );
    }
  },
);

export const getTickets = createAsyncThunk(
  "getTickets",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/v1/tickets/");

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "something went wrong",
      );
    }
  },
);

export const ticketSolved = createAsyncThunk(
  "ticketSolved",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/v1/tickets/ticketSolved/${id}`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      
      return response.data;
    } catch (error) {
      error.response?.data?.message || "something went wrong";
    }
  },
);

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTicket.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.tickets.push(action.payload);
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.loading = false;
      state.status = false;
      state.createTicketError = action.payload;
    });
    builder.addCase(getTicketById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTicketById.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.selectedTicket = action.payload;
    });
    builder.addCase(getTicketById.rejected, (state, action) => {
      state.loading = false;
      state.status = false;
      state.getTicketByIdError = action.payload;
    });
    builder.addCase(getTickets.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTickets.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.tickets = action.payload;
    });
    builder.addCase(getTickets.rejected, (state, action) => {
      state.loading = false;
      state.status = false;
      state.getTicketsError = action.payload;
    });
    builder.addCase(ticketSolved.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(ticketSolved.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.tickets = action.payload.tickets;
    });
    builder.addCase(ticketSolved.rejected, (state,action) => {
      state.loading = false;
      state.status = false;
      state.ticketSolvedError = action.payload;
    });
  },
});

export default ticketSlice.reducer;
