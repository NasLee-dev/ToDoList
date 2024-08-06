'use client'

import { Checkbox, IconButton, Input } from "@material-tailwind/react"
import { useState } from "react"

export default function Todo() {
  const [isEditing, setIsEditing] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [title, setTitle] = useState('')

  return (
    <div className="flex flex-row items-center w-full gap-2">
      <Checkbox 
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
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
            onClick={() => setIsEditing(false)}
          >
            <i className="fas fa-check"></i>
          </IconButton>
        )
        :
        (
          <IconButton
            onClick={() => setIsEditing(false)}
          >
            <i className="fas fa-check"></i>
          </IconButton>
        )
      }
      <IconButton>
        <i className="fas fa-trash"></i>
      </IconButton>
    </div>
  )
}