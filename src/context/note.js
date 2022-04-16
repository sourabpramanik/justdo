import React, { useState, useEffect } from "react"

const NoteContext = React.createContext()
import shortid from "shortid"

const initialNoteItem = [
  {
    id: shortid.generate(),
    title: "Project One",
    desc: "dssdasdas",
    createdAt: "2000-10-31T01:30:00.000-05:00"
  }
]

const NoteProvider = props => {
  const [noteItem, setNoteItem] = useState(initialNoteItem)
  const { id, title, desc, done } = noteItem

  const handleCreateWork = async props => {
    const id = shortid.generate()
    setNoteItem([
      {
        id,
        title: props.title,
        desc: props.desc,
        createdAt: new Date().toISOString()
      },
      ...noteItem
    ])
  }

  return (
    <NoteContext.Provider
      value={{
        noteItem,
        setNoteItem,
        handleCreateWork
      }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteContext
export { NoteProvider }
