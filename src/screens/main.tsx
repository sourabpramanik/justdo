import React, {useCallback,useState, useContext, useEffect} from 'react';
import {
    Center,
    VStack,  
    useColorModeValue,
    Fab,
    Icon
} from 'native-base';
import {AntDesign} from '@expo/vector-icons'
import AnimatedCheckbox from '../components/animated-checkbox';
import TaskItem from '../components/task-item'
import AllTasks from '../components/all-tasks'
import AnimatedColorBox from '../components/animate-color-box'
import {Pressable} from 'react-native'
import shortid from 'shortid'
import Masthead from '../components/masthead'
import NavBar from '../components/navbar'
import UserContext from '../context/user'
import TaskContext from '../context/task'

export default function MainScreen(){
    // const [data, setTaskItem] = useState(initialData)
    const [editingItemId, setEditingItemId] = useState<string | null>(null)
    const {authUser} = useContext(UserContext)
    const {taskItem, setTaskItem, queryData, handleCreateTask} = useContext(TaskContext)
    useEffect(()=>{
        queryData(authUser)
    },[])
    const handleToggleTaskItem = useCallback(item => {
        setTaskItem(prevData => {
            const newData = [...prevData]
            const index = prevData.indexOf(item)
            newData[index] = {
                ...item,
                done: !item.done                
            }
            return newData            
            
        })                        
    },[])

    const handleChangeTaskItemSubject = useCallback((item, newSubject)=>{
        setTaskItem(prevData =>{
            const newData = [...prevData]
            const index = prevData.indexOf(item)
            newData[index] = {
                ...item,
                subject: newSubject
            }
            return newData
        })
    },[])

    const handleFinishEditingTaskItem = useCallback(item=>{        
        
        setEditingItemId(null)
    },[])

    const handlePressTaskItemLabel = useCallback(item=>{
        setEditingItemId(item.id)
    },[])

    const handleRemoveItem = useCallback(item =>{
        setTaskItem(prevData => {
        const newData = prevData.filter(i => i !== item)
        return newData
        })
    },[])
    return(
        <AnimatedColorBox 
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        w="full"
        flex={1}>    
            <Masthead title={"What's up!! "+ authUser?.attributes?.name} image={require('../assets/masthead.png')}>
                <NavBar/>
            </Masthead>        
            <VStack flex={2} space={1}  mt="-20px" borderTopLeftRadius="20px" borderTopRightRadius="20px" pt="20px" bg={useColorModeValue('warmGray.50', 'primary.900')}>
                 <AllTasks
                    data={taskItem}
                    onToggleItem={handleToggleTaskItem}
                    onSubjectChange={handleChangeTaskItemSubject}
                    onFinishEditing={handleFinishEditingTaskItem}
                    onRemoveItem={handleRemoveItem}
                    onPressLabel={handlePressTaskItemLabel}
                    editingItemId={editingItemId}
                 />                                   
            </VStack>    
            <Fab
            position="absolute"
            renderInPortal={false}
            size='sm'
            icon={<Icon color="white" as={<AntDesign name="plus"/>} size="sm"/>}
            colorScheme={useColorModeValue('blue', 'darkBlue')}
            bg={useColorModeValue('blue.500', 'blue.400')}
            onPress={() => {
                const id = shortid.generate()
                setTaskItem([
                    {
                    id,
                    userId:authUser?.attributes?.sub,
                    subject: '',
                    },
                    ...taskItem
                ])
                setEditingItemId(id)
            }}
            />           
        </AnimatedColorBox>
    )
}