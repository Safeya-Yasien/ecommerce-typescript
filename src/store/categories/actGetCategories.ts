import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICategory } from "@types/category";
import axios from "axios";

type TResponse = ICategory[];

const actGetCategories = createAsyncThunk(
  "categories/actGetCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get<TResponse>(
        `${import.meta.env.VITE_BASE_URL}/categories`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || error.message);
      }

      return rejectWithValue("An unexpected error occurred");
    }
  }
);

export default actGetCategories;
