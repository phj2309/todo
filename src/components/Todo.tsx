"use client";

import React, { useState } from "react";
import styled from "styled-components";
import useTodoStore from "../store/todoStore";

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #ff6f91; /* 진한 핑크색 텍스트 */
`;

const InputContainer = styled.div`
  margin: 20px 0;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  margin-right: 10px;
  border: 2px solid #ff6f91; /* 진한 핑크색 테두리 */
  border-radius: 5px;
  outline: none;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  margin-right: 5px;
  background-color: #87cefa; /* 연한 하늘색 배경 */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #6ea3d4; /* 하늘색 */
  }
`;

const TodoList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TodoItem = styled.li<{ completed: boolean }>`
  background: ${({ completed }) =>
    completed
      ? "#d3ffd3"
      : "#ffebf0"}; /* 완료: 연한 녹색, 미완료: 연한 핑크색 */
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TodoText = styled.span<{ completed: boolean }>`
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  color: ${({ completed }) =>
    completed ? "#6c757d" : "#333"}; /* 완료: 회색, 미완료: 기본 텍스트 색상 */
`;

const Todo: React.FC = () => {
  const { todos, addTodo, toggleComplete, deleteTodo } = useTodoStore();
  const [input, setInput] = useState<string>("");

  const handleAddTodo = () => {
    if (input.trim() === "") return;
    addTodo(input);
    setInput("");
  };

  return (
    <Container>
      <Title>투두 리스트</Title>
      <InputContainer>
        <Input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
          placeholder="할 일을 입력하세요"
        />
        <Button onClick={handleAddTodo}>추가</Button>
      </InputContainer>
      <TodoList>
        {todos.map((todo) => (
          <TodoItem key={todo.id} completed={todo.completed}>
            <TodoText completed={todo.completed}>{todo.text}</TodoText>
            <div>
              <Button onClick={() => toggleComplete(todo.id)}>
                {todo.completed ? "취소" : "완료"}
              </Button>
              <Button onClick={() => deleteTodo(todo.id)}>삭제</Button>
            </div>
          </TodoItem>
        ))}
      </TodoList>
    </Container>
  );
};

export default Todo;
