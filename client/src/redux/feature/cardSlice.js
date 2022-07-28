import api from '../../api/cards.js'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
const initialState = {
  cards: [],
  isLoading: false,
}

export const fetchCards = createAsyncThunk(
  '/cards/fetchCards',
  async (thunkAPI) => {
    const response = await api.get('/cards').catch((error) => {
      console.log(error);
      return error;
    });
    return response.data;
  })

export const createCard = createAsyncThunk(
  '/cards/createCard',
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post('/cards', data);
      return response.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response?.data);
    }
  });

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {},
  extraReducers: {
    // create Cards
    [createCard.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [createCard.fulfilled]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        cards: [...state.cards, action.payload],
        isLoading: false,
      };
    },
    [createCard.rejected]: (state, action) => {
      return {
        ...state,
        error: action.payload,
        isLoading: true,
      };
    },

    // Fetch cards
    [fetchCards.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [fetchCards.fulfilled]: (state, action) => {
      return {
        ...state,
        cards: action.payload,
        isLoading: false,
      };
    },
    [fetchCards.rejected]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
        isLoading: true,
      };
    },
  }
});
// export default cardSlice.actions;
export default cardSlice.reducer;
