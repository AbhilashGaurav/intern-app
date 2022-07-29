import React, { useState, useEffect } from "react";
import Form from "./components/Form/form";
import TabBar from "./components/TabBar/TabBar";
import { fetchCards } from "./redux/feature/cardSlice";
import { fetchCategory } from "./redux/feature/categorySlice";
import { useDispatch } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Cards from "./components/Cards/Cards";

function App() {
  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState(null);
  useEffect(() => {
    dispatch(fetchCards());
    dispatch(fetchCategory());
  }, [dispatch]);
  return (
    <div>
      <Router>
        <Form setSelectId={setSelectId} selectId={selectId} />
        <TabBar />
        <Routes>
          <Route
            path="/:category"
            element={<Cards setSelectId={setSelectId} selectId={selectId} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
