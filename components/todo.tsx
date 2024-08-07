'use client'

import { Checkbox, IconButton, Input, Spinner } from "@material-tailwind/react"
import { useMutation } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "actions/todo-actions";
import { queryClient } from "config/ReactQueryClientProvider";
import { useState } from "react"

export default function Todo({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [completed, setCompleted] = useState(todo.completed);
  const [title, setTitle] = useState(todo.title);

  const updateTodoMutation = useMutation({
    mutationFn: () => updateTodo({
      id: todo.id,
      title,
      completed,
    }),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    }
  });

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo(todo.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    }
  });

  return (
    <div className="flex flex-row items-center w-full gap-2">
      <Checkbox 
        checked={completed}
        onChange={async (e) => {
          await setCompleted(e.target.checked)
          await updateTodoMutation.mutate()
        }}
      />
      {isEditing ? (
        <input 
          className="flex-1 border-b-black border-b pb-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      ) : (
        <p className={`flex-1 ${completed ? 'line-through' : ''}`}>
          {title}
        </p>
      )}
      {
        isEditing ? (
          <IconButton
            onClick={async () => {
              await updateTodoMutation.mutate()
            }}
          >
            {updateTodoMutation.isPending ? (
              <Spinner />
            ) : (
              <i className="fas fa-check"></i>
            )}
          </IconButton>
        )
        :
        (
          <IconButton
            onClick={() => {
              setIsEditing(true)
            }}
          >
            <i className="fas fa-pen"></i>
          </IconButton>
        )
      }
      <IconButton onClick={async () => await deleteTodoMutation.mutate()}>
        {
          deleteTodoMutation.isPending ? (
            <Spinner />
          ) : (
            <i className="fas fa-trash"></i>
          )
        }
      </IconButton>
    </div>
  )
}