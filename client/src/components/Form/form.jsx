import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import './form.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createCard, updateCard } from "../../redux/feature/cardSlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function Form({selectId, setSelectId}) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const [cardData, setCardData] = useState({
    title: "",
    url: "",
    category: ""
  });
    const card = useSelector((state) => {
      return selectId
        ? state.card.cards.find((p) => p.id === selectId)
        : null;
    });
  useEffect(() => {
    console.log(card);
    if (card) setCardData(card);
  }, [card]);

  function clear() {
    setCardData({
      title: "",
      url: "",
      category: ""
    });
    setSelectId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      cardData.title === "" ||
      cardData.url === "" ||
      cardData.category === ""
    ) {
      alert("All fields must be field");
      return;
    }
    if (selectId) {
      const obj = {
        id: selectId,
        updatedCard: cardData,
      };
      dispatch(updateCard(obj));
      clear();
    } else {
    dispatch(createCard({ ...cardData, id: uuidv4() }));
    clear();
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setCardData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  return (
    <Paper elevation={12} className="paper">
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {selectId ? "Edit" : "Create"} a card
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          className="input"
          value={cardData.title}
          onChange={handleChange}
        />
        <TextField
          name="url"
          variant="outlined"
          label="Video/Audio URL"
          fullWidth
          className="input"
          value={cardData.url}
          onChange={handleChange}
        />
        <FormControl fullWidth className="input">
          <InputLabel>Select the category</InputLabel>
          <Select
            name="category"
            value={cardData.category}
            label="Category"
            onChange={handleChange}
          >
          {categories.map((category)=>(
            <MenuItem value={category.name} key={category.id}>{category.name}</MenuItem>
          ))}
          </Select>
        </FormControl>
        <Button
          className="buttonSubmit"
          variant="contained"
          size="large"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          className="buttonSubmit"
          size="large"
          color="secondary"
          onClick={clear}
        >
          clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;