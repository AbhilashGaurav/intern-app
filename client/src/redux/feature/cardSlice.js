import api from "../../api/cards.js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  cards: [],
  isLoading: false,
};

export const fetchCards = createAsyncThunk(
  "/cards/fetchCards",
  async (thunkAPI) => {
    const response = await api.get("/cards").catch((error) => {
      console.log(error);
      return error;
    });
    return response.data;
  }
);

export const createCard = createAsyncThunk(
  "/cards/createCard",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/cards", data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const deleteCard = createAsyncThunk(
  "/cards/deleteCard",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/cards/${id}`);
      return { response, id };
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
export const updateCard = createAsyncThunk(
  "/cards/updateCard",
  async ({ id, updatedCard }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cards/${id}`, updatedCard);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

const cardSlice = createSlice({
  name: "cards",
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
    // Delete Cards
    [deleteCard.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [deleteCard.fulfilled]: (state, action) => {
      console.log(action.payload);
      const prevState = state.cards.filter(
        (card) => card.id !== action.payload.id
      );
      return {
        ...state,
        cards: prevState,
        isLoading: false,
      };
    },
    [deleteCard.rejected]: (state, action) => {
      console.log(action.payload);
      return {
        ...state,
        error: action.payload,
        isLoading: true,
      };
    },
    // Update Cards
    [updateCard.pending]: (state) => {
      return {
        ...state,
        isLoading: true,
      };
    },
    [updateCard.fulfilled]: (state, action) => {
      const updatedCards = state.cards.map((card) =>
        card.id === action.payload.id ? action.payload : card
      );
      return {
        ...state,
        cards: updatedCards,
        isLoading:false
      };
    },
    [updateCard.rejected]: (state, action) => {
      return {
        ...state,
        updatePostError: action.payload,
        isLoading:true
      };
    },
  },
});
// export default cardSlice.actions;
export default cardSlice.reducer;
