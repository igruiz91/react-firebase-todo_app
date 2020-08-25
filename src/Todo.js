import React, { useState } from "react";
import "./Todo.css";
import {
  List,
  Avatar,
  IconButton,
  Card,
  CardHeader,
  Modal,
  Button,
  Input,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

import db from "./firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  input: {marginRight: '5px', marginLeft: '5px'},
  paper:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width:400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  }
}));

function Todo(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('')

  const classes = useStyles();

  const updateTodo = () => {
    db.collection('todos').doc(props.list.id).set({
      todo: input
    },{merge:true})
    setOpen(false)
  };

  return (
    <div>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <p>Edit Message: </p>
          <Input className={classes.input} placeholder={props.list.todo} value={input} onChange={
            e => setInput(e.target.value)
          }></Input>
          <Button variant="contained" color="primary" onClick={updateTodo}>Update</Button>
        </div>
      </Modal>
      <List className="todo_list">
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                I
              </Avatar>
            }
            action={
              <div>
                <IconButton aria-label="edit" onClick={(e) => setOpen(true)}>
                  <CreateIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={(event) =>
                    db.collection("todos").doc(props.list.id).delete()
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            }
            title={props.list.todo}
          />
        </Card>
      </List>
    </div>
  );
}

export default Todo;
