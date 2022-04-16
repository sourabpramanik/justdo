import React, { useState, useEffect } from "react"

const WorkContext = React.createContext()

const initialWorkItem = [
  {
    id: "1dsadas",
    title: "Project One",
    desc: "dssdasdas",
    createdAt: "2000-10-31T01:30:00.000-05:00"
  }
]

const WorkProvider = props => {
  const [workItem, setWorkItem] = useState(initialWorkItem)
  const { id, title, desc, done } = workItem

  const handleCreateWork = async props => {
    const id = shortid.generate()
    setWorkItem([
      {
        id,
        title: props.title,
        desc: props.desc,
        createdAt: new Date().toISOString()
      },
      ...workItem
    ])
  }

  return (
    <WorkContext.Provider
      value={{
        workItem,
        setWorkItem,
        handleCreateWork
      }}
    >
      {props.children}
    </WorkContext.Provider>
  )
}
export default WorkContext
export { WorkProvider }
