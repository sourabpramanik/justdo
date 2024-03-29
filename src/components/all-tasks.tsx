import React, { useCallback, useRef, useContext } from "react"
import { AnimatePresence, View } from "moti"
import TaskItem from "./task-item"
import { makeStyledComponent } from "../utils/styled"
import {
  PanGestureHandlerProps,
  ScrollView
} from "react-native-gesture-handler"
import TaskContext from "../context/task"

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TaskItemData {
  id: strings
  subject: string
  done: boolean
}

interface TaskListProps {
  data: Array<TaskItemData>
  editingItemId: string | null
  onToggleItem: (item: TaskItemData) => void
  onSubjectChange: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemoveItem: (item: TaskItemData) => void
}

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  data: TaskItemData
  isEditing: boolean
  onToggleItem: (item: TaskItemData) => void
  onSubjectChange: (item: TaskItemData, newSubject: string) => void
  onFinishEditing: (item: TaskItemData) => void
  onPressLabel: (item: TaskItemData) => void
  onRemove: (item: TaskItemData) => void
}

export const AnimatedTaskItem = (props: TaskItemProps) => {
  const {
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onSubjectChange,
    onFinishEditing,
    onRemove,
    onPressLabel
  } = props
  const {
    handleCreateTask,
    handleDeleteTask,
    handleTaskDone,
    handleSubjectUpdate
  } = useContext(TaskContext)

  const handleToggleCheckBox = useCallback(() => {
    onToggleItem(data)
    handleTaskDone(data)
  }, [data, onToggleItem])

  const handleChangeSubject = useCallback(
    subject => {
      onSubjectChange(data, subject)
      // handleSubjectUpdate(data, subject)
    },
    [data, onSubjectChange]
  )

  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data)
    handleSubjectUpdate(data)
  }, [data, onFinishEditing])

  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])

  const handleRemove = useCallback(() => {
    onRemove(data)
    handleDeleteTask(data)
  }, [data, onRemove])

  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.subject}
        isDone={data.done}
        isEditing={isEditing}
        onToggleCheckBox={handleToggleCheckBox}
        onSubjectChange={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  )
}

export default function AllTasks(props: TaskListProps) {
  const {
    data,
    editingItemId,
    onToggleItem,
    onSubjectChange,
    onFinishEditing,
    onPressLabel,
    onRemoveItem
  } = props

  const refScrollView = useRef(null)

  return (
    <StyledScrollView ref={refScrollView} w="full">
      <AnimatePresence>
        {data.map(item => (
          <AnimatedTaskItem
            key={item.id}
            data={item}
            simultaneousHandlers={refScrollView}
            isEditing={item.id === editingItemId}
            onToggleItem={onToggleItem}
            onSubjectChange={onSubjectChange}
            onFinishEditing={onFinishEditing}
            onPressLabel={onPressLabel}
            onRemove={onRemoveItem}
          />
        ))}
      </AnimatePresence>
    </StyledScrollView>
  )
}
