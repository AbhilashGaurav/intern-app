import { configureStore} from "@reduxjs/toolkit";
import cardsreducer from "./feature/cardSlice";
import categoryReducer from "./feature/categorySlice"

const store = configureStore({
  reducer: {
    card: cardsreducer,
    category: categoryReducer
  },
});

export default store;