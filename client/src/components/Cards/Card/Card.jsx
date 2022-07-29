import * as React from "react";
import {
  CardActions,
  CardContent,
  Button,
  Typography,
  Modal,
  Box,
  Card,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { deleteCard } from "../../../redux/feature/cardSlice";
import { useDispatch } from "react-redux";

const styleBox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicCard({ card, setSelectId }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Paper elevation={12} style={{margin: "2rem"}}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {card.title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>
            Play
          </Button>
          <EditIcon style={{cursor: "pointer"}} onClick={()=>{
            setSelectId(card.id);
          }}/>
          <DeleteIcon style={{cursor: "pointer"}} onClick={()=>{
            dispatch(deleteCard(card.id))
          }}/>
        </CardActions>
        <Modal
          open={open}
          onClose={handleClick}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleBox}>
            <iframe src={card.url} width="100%" height="100%" title={card.name}/>
          </Box>
        </Modal>
      </Card>
    </Paper>
  );
}
