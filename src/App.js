import React, { useState, useEffect } from 'react';
import {Button, FormControl, Input, InputLabel} from '@material-ui/core'
import './App.css';
import Todo from './Todo';
import db from './firebase'
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, [])

  const addTodo = e => {
    e.preventDefault()
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }

  return (
    <div className="App">
      <h1>Hello</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Message</InputLabel>
          <Input type="text" value={input} onChange={event => setInput(event.target.value)}/>
        </FormControl>

        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={addTodo}>Send</Button>

      </form>
      <ul>
        {todos.map((element, i) => (
          <Todo key={i} list={element} />
        ))}
      </ul>
    </div>
  );
}

export default App;
