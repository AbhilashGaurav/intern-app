import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { TextField, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import { useState, useEffect } from 'react';
import { fetchCards } from '../../redux/feature/cardSlice';
import { createCategory } from '../../redux/feature/categorySlice';
import { useDispatch, useSelector } from 'react-redux'
import api from '../../api/cards'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function LinkTab(props) {
    return (
        <Tab
            component="a"
            onClick={(event) => {
                event.preventDefault();
            }}
            {...props}
        />
    );
}

export default function TabBar() {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category.categories);
    console.log(categories);
    const [value, setValue] = useState(0);
    const [category, setCategory] = useState({
        name:""
    });
    const [open, setOpen] = React.useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClick = () => setOpen((prev) => !prev);
    const handleCategory = (e) => {
        setCategory({name: e.target.value});
    }
    const handleSubmit = (e) => {
        if (category.name === "") {
            alert("Oops! Field Empty");
            return;
        }
        dispatch(createCategory(category));
        setCategory({
        name:""
        });
        setOpen((prev) => !prev);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Button onClick={handleClick}>Add Bucket</Button>
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                {categories.map((category) => (
                    <LinkTab label={category.name} key={category.id}/>
                ))}
            </Tabs>
            <Modal
                open={open}
                onClose={handleClick}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField
                        name="catgory"
                        variant="outlined"
                        label="Title"
                        fullWidth
                        className="input"
                        value={category.name}
                        onChange={handleCategory}
                    />
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                        fullWidth
                    >
                        Add Category
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
}
