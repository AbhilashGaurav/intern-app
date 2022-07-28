import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import './form.css'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createCard, fetchCards } from "../../redux/feature/cardSlice";
import { fetchCategory } from "../../redux/feature/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function Form() {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    title: "",
    url: "",
    category: ""
  });
  //   const post = useSelector((state) => {
  //     return selectedId
  //       ? state.post.posts.find((p) => p._id === selectedId)
  //       : null;
  //   });
  useEffect(() => {
    console.log("Hello world")
    dispatch(fetchCards());
    dispatch(fetchCategory());
    // console.log(fetchC());
  }, [dispatch]);

  function clear() {
    setPostData({
      title: "",
      url: "",
      category: ""
    });
    // setSelectedId(null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (
      postData.title === "" ||
      postData.url === "" ||
      postData.category === ""
    ) {
      alert("All fields must be field");
      return;
    }
    // if (selectedId) {
    //   const obj = {
    //     id: selectedId,
    //     updatedPost: { ...postData, name: user?.result?.name },
    //   };
    //   dispatch(updatePost(obj));
    //   clear();
    // } else {
    dispatch(createCard({ ...postData, id: uuidv4() }));
    clear();
    // }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setPostData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  //   if (!user?.result?.name) {
  //     return (
  //       <Paper className="paper">
  //         <Typography variant="h6" align="center">
  //           Please Sign In to create the post
  //         </Typography>
  //       </Paper>
  //     );
  //   }
  return (
    <Paper elevation={12} className="paper">
      <form
        autoComplete="off"
        noValidate
        className="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          Create a card
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          className="input"
          value={postData.title}
          onChange={handleChange}
        />
        <TextField
          name="url"
          variant="outlined"
          label="Video/Audio URL"
          fullWidth
          className="input"
          value={postData.url}
          onChange={handleChange}
        />
        <FormControl fullWidth>
          <InputLabel>Select the category</InputLabel>
          <Select
            name="category"
            value={postData.category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value={"Entertainment Videos"}>Entertainment Videos</MenuItem>
            <MenuItem value={"Education Videos"}>Education Videos</MenuItem>
          </Select>
        </FormControl>
        <Button
          className="buttonSubmit"
          variant="contained"
          size="large"
          color="primary"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          size="large"
          color="secondary"
          onClick={clear}
          fullWidth
        >
          clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;