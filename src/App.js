import React, { useState, useRef, useEffect } from "react";
import TodoList from "./components/TodoList";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import styled from "styled-components";

const LOCAL_STORAGE_KEY = "todoApp.todos";

const ContainerOuter = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  padding: 20px;
  background: lightblue;
  text-align: center;
`;

const InputContainer = styled.main`
  display: flex;
  width: 250px;
  margin-top: 10px;
  justify-content: center;
`;

const ButtonContainer = styled.main`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find(todo => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    console.log(name);
    setTodos(prevTodos => {
      return [...prevTodos, { id: name, name: name, complete: false }];
    });
    todoNameRef.current.value = null;
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <div>
        <ContainerOuter>
          <Card>
            <Card.Header>
              <h5>To do list:</h5>
            </Card.Header>
            <InputContainer>
              <input
                ref={todoNameRef}
                type="text"
                placeholder="Enter a new task..."
              />
            </InputContainer>
            <ButtonContainer>
              <Button
                variant="outline-success m-1"
                size="sm"
                onClick={handleAddTodo}
              >
                Add Todo
              </Button>

              <Button
                variant="outline-danger m-1"
                size="sm"
                onClick={handleClearTodos}
              >
                Clear Complete
              </Button>
            </ButtonContainer>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <Card.Footer>
              <h5>{todos.filter(todo => !todo.complete).length} Left to do</h5>
            </Card.Footer>
          </Card>
        </ContainerOuter>
      </div>
    </>
  );
}

export default App;
