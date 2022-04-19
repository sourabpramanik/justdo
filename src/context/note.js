import React, { useState, useEffect, useCallback, useContext } from "react"
import { DataStore } from "@aws-amplify/datastore"
import { NoteItem } from "../models"
import UserContext from "./user"

const NoteContext = React.createContext()

const initialNoteItem = [
  {
    id: "",
    title: "",
    desc: "",
    userId: ""
  }
]

const NoteProvider = props => {
  const [noteItem, setNoteItem] = useState(initialNoteItem)
  const { id, title, desc, done } = noteItem
  const { authUser } = useContext(UserContext)

  useEffect(() => {
    const subscription = DataStore.observe(NoteItem).subscribe(c =>
      // setNoteItem(c.userID("contains", authUser?.attributes?.sub))
      setNoteItem(prevData => {
        const newData = [...prevData]
        const index = newData.findIndex(item => item.id === c.element.id)
        if (index !== -1) {
          newData[index] = c.element
        }
        return newData
      })
    )

    return () => subscription.unsubscribe()
  }, [])

  const queryData = async props => {
    try {
      const models = await DataStore.query(NoteItem, c =>
        c.userID("contains", props?.attributes?.sub)
      )
      setNoteItem(models)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateNote = async props => {
    // console.log(props)
    await DataStore.save(
      new NoteItem({
        title: props.title,
        desc: props.desc,
        userID: props.userId
      })
    )
  }

  const handleDeleteNote = async props => {
    const item = await DataStore.query(NoteItem, props.id)
    DataStore.delete(item)
  }

  const handleTitleChange = async props => {
    const item = await DataStore.query(NoteItem, props.id)
    if (item) {
      await DataStore.save(
        NoteItem.copyOf(item, updated => {
          updated.title = props.title
        })
      )
    }
  }

  const handleDescChange = async props => {
    const item = await DataStore.query(NoteItem, props.id)
    if (item) {
      await DataStore.save(
        NoteItem.copyOf(item, updated => {
          updated.desc = props.desc
        })
      )
    }
  }

  return (
    <NoteContext.Provider
      value={{
        noteItem,
        setNoteItem,

        queryData,

        handleCreateNote,
        handleDeleteNote,
        handleTitleChange,
        handleDescChange
      }}
    >
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteContext
export { NoteProvider }
