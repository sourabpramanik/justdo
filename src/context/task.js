import React, { useState, useEffect } from "react"
import { DataStore } from "@aws-amplify/datastore"
import { TaskItem } from "../models"

const TaskContext = React.createContext()

const TaskProvider = props => {
  const [taskItem, setTaskItem] = useState([])
  const { id, userId, subject, done } = taskItem

  const queryData = async props => {
    try {
      const models = await DataStore.query(TaskItem, c =>
        c.userID("contains", props?.attributes?.sub)
      )
      setTaskItem(models)
    } catch (error) {
      console.log(error)
    }
  }
  const handleCreateTask = async props => {
    // console.log(props);
    await DataStore.save(
      new TaskItem({
        subject: props.subject,
        userID: props.userId,
        done: false
      })
    )
  }
  const handleDeleteTask = async props => {
    const item = await DataStore.query(TaskItem, props.id)
    DataStore.delete(item)
  }
  const handleTaskDone = async props => {
    const item = await DataStore.query(TaskItem, props.id)
    // console.log(item);
    await DataStore.save(
      TaskItem.copyOf(item, updated => {
        updated.done = !props.done
      })
    )
  }
  const handleSubjectUpdate = async props => {
    const item = await DataStore.query(TaskItem, props.id)
    if (item) {
      await DataStore.save(
        TaskItem.copyOf(item, updated => {
          updated.subject = props.subject
        })
      )
    } else {
      handleCreateTask(props)
    }
    // console.log(props);
  }
  return (
    <TaskContext.Provider
      value={{
        taskItem,
        setTaskItem,
        queryData,
        handleCreateTask,
        handleDeleteTask,
        handleTaskDone,
        handleSubjectUpdate
      }}
    >
      {props.children}
    </TaskContext.Provider>
  )
}
export default TaskContext
export { TaskProvider }
