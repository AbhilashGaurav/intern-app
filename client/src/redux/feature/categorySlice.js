import api from '../../api/cards.js'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const initialState = {
    categories: [],
    isLoading: false
}
export const fetchCategory = createAsyncThunk(
    '/category/fetchCategory',
    async (thunkAPI) => {
        const response = await api.get('/categories').catch((error) => {
            console.log(error)
            return error;
        });
        return response.data;
    });

export const createCategory = createAsyncThunk(
    '/category/createCategory',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/categories', data);
            return response.data;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data);
        }
    });

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers: {
        // create Category
        [createCategory.pending]: (state) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        [createCategory.fulfilled]: (state, action) => {
            return {
                ...state,
                categories: [...state.categories, action.payload],
                isLoading: false,
            };
        },
        [createCategory.rejected]: (state, action) => {
            return {
                ...state,
                error: action.payload,
                isLoading: true,
            };
        },
        // Fetch categories
        [fetchCategory.pending]: (state) => {
            return {
                ...state,
                isLoading: true,
            };
        },
        [fetchCategory.fulfilled]: (state, action) => {
            return {
                ...state,
                categories: action.payload,
                isLoading: false,
            };
        },
        [fetchCategory.rejected]: (state, action) => {
            return {
                ...state,
                error: action.payload,
                isLoading: true,
            };
        },
    }
}
);

export default categorySlice.reducer