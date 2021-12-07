import React, {useCallback} from 'react';
import { Pressable, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import {Box, HStack, Text,useTheme, useColorModeValue, themeTools, Icon, Input } from 'native-base';
import AnimatedCheckbox from './animated-checkbox';
import AnimatedTaskLabel from './animated-tasklabel';
import SwipeView from './swipable';
import {Feather} from '@expo/vector-icons';
import {PanGestureHandlerProps} from 'react-native-gesture-handler';

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'>{
    isEditing:boolean
    isDone:boolean
    onToggleCheckBox?: () => void
    onPressLabel?: () => void
    onRemove?: () => void
    onSubjectChange?: (subject: string) => void
    onFinishEditing?: () => void
    subject: string
}

const TaskItem = (props: Props)=>{
    const {
        isDone, 
        onToggleCheckBox, 
        subject, 
        onRemove, 
        onPressLabel, 
        simultaneousHandlers, 
        isEditing, 
        onSubjectChange, 
        onFinishEditing} = props

    const theme = useTheme()
    const highlightColor = themeTools.getColor(
        theme,
        useColorModeValue('blue.500', 'blue.400')
    )
    const boxStroke = themeTools.getColor(
        theme,
        useColorModeValue('muted.300', 'muted.500')
    )    
    const checkMarkColor = themeTools.getColor(
        theme,
        useColorModeValue('white', 'white')
    )
    const activeTextColor = themeTools.getColor(
        theme,
        useColorModeValue('darkText', 'lightText')
    )
    const doneTextColor = themeTools.getColor(
        theme,
        useColorModeValue('muted.400', 'muted.600')
    )

    const handleChangeSubject = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>)=>{
        onSubjectChange && onSubjectChange(e.nativeEvent.text)
    },[onSubjectChange])
    return(
        <SwipeView      
            simultaneousHandlers={simultaneousHandlers} 
            onSwipe={onRemove} 
            backView={
                <Box w="full" h="full" bg="red.500" alignItems="flex-end" justifyContent="center" pr={4}>
                    <Icon color="white" as={<Feather name="trash-2"/>} size="sm"/>
                </Box>
            }
        >
            <HStack 
            alignItems="center" 
            w="full" 
            px={4} 
            py={2}
            bg={useColorModeValue('warmGray.50', 'primary.900')}
            >
                <Box width={30} height={30} mr={2}>
                    <Pressable onPress={onToggleCheckBox}>
                        <AnimatedCheckbox 
                        highlightColor={highlightColor} 
                        checkMarkColor={checkMarkColor} 
                        boxOutlineColor={boxStroke}
                        checked={isDone}/>
                    </Pressable>
                </Box>
                {isEditing? (
                    <Input 
                    placheolder="I have to To Do...." 
                    value={subject} 
                    variant="unstyled" 
                    fontSize={19} 
                    px={1} 
                    py={0} 
                    autoFocus 
                    blurOnSubmit 
                    onChange={handleChangeSubject}
                    onBlur={onFinishEditing}
                    />
                ) :(
                    <AnimatedTaskLabel
                    textColor={activeTextColor}
                    inactiveTextColor={doneTextColor}
                    onPress={onPressLabel}
                    strikeThrough={isDone}>
                        {subject}
                    </AnimatedTaskLabel>
                )}
                
            </HStack> 
        </SwipeView>               
    )
}
export default TaskItem