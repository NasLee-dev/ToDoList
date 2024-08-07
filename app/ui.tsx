'use client'

import { Button, Input } from "@material-tailwind/react"
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTodo, getTodos } from "actions/todo-actions";
import Todo from "components/todo"
import { useState } from "react";

export default function UI() {
  const [searchInput, setSearchInput] = useState("");
  const todosQuery = useQuery({
    queryKey: ["todos"],
    queryFn: () => getTodos({ searchInput }),
  });

  const createTodoMutation = useMutation({
    mutationFn: () => createTodo({
      title: "New TODO",
      completed: false,
    }),
    onSuccess: () => {
      todosQuery.refetch();
    },
  });
  return (
    <div className="w-2/3 mx-auto flex flex-col items-center py-10 gap-2">
      <h1 className="text-xl">
        To Do List
      </h1>
      <Input 
        value={searchInput}
        label="Search TODO"
        icon={<i className="fas fa-search"></i>}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {
        todosQuery.isPending && <p>Loading...</p>
      }
      {todosQuery.data?.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      <Button onClick={() => createTodoMutation.mutate()} loading={createTodoMutation.isPending}>
        <i className="fas fa-plus mr-2"></i>
        Add TODO
      </Button>
    </div>
  )
}
