import React from 'react'
import {Dimensions} from 'react-native'
import {
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PanGestureHandlerProps
} from 'react-native-gesture-handler';
import Animated, {
useSharedValue,
useAnimatedStyle,
useAnimatedGestureHandler,
withTiming,
runOnJS
} from 'react-native-reanimated';
import {Box} from 'native-base';
import {makeStyledComponent} from '../utils/styled'

const StyledView = makeStyledComponent(Animated.View)

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'>{
    children: React.ReactNode
    backView?: React.ReactNode
    onSwipe?: () => void
}

const { width : SCREEN_WIDTH} = Dimensions.get('window')
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2
const SwipeView = (props: Props)=>{
    const {children, backView, simultaneousHandlers, onSwipe} = props
    const translateX = useSharedValue(0)

    const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
        onActive: event => {
            translateX.value = Math.max(-128, Math.min(0, event.translationX))
        },
        onEnd: () => {
        const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD
        if (shouldBeDismissed) {
            translateX.value = withTiming(-SCREEN_WIDTH)
            onSwipe && runOnJS(onSwipe)()
        } else {
            translateX.value = withTiming(0)
        }
    }
    })
    const facadeStyle = useAnimatedStyle(() => ({
        transform: [
        {
            translateX: translateX.value
        }
        ]
    }))
    return(
        <StyledView w="full">
            {backView && (
                <Box position="absolute" right={0} left={0} top={0} bottom={0}>{backView}</Box>
            )}
             <PanGestureHandler
                simultaneousHandlers={simultaneousHandlers}
                onGestureEvent={panGesture}
            >
                <StyledView style={facadeStyle}>{children}</StyledView>
            </PanGestureHandler>
        </StyledView>
    )
}
export default SwipeView