import { forwardRef, useImperativeHandle, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export interface CanvasTextElementData {
  type: 'text';
  props: {
    x: number;
    y: number;
    text: string;
    color?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: string;
    // Add more Skia TextProps as needed
  };
}

export interface IGTextRef {
  getCanvasElementData: () => CanvasTextElementData;
}

interface IGTextProps {
  initialText?: string;
  initialX?: number;
  initialY?: number;
  color?: string;
  fontSize?: number;
  fontStyle?: string;
  fontWeight?: string;
}

export const IGText = forwardRef<IGTextRef, IGTextProps>(
  (
    {
      initialText = '',
      initialX = 100,
      initialY = 100,
      color = '#222',
      fontSize = 24,
      fontStyle,
      fontWeight,
    },
    ref
  ) => {
    const [text, setText] = useState(initialText);
    const [editing, setEditing] = useState(false);

    // Position state
    const x = useSharedValue(initialX);
    const y = useSharedValue(initialY);

    // 마지막 위치 저장용
    const lastOffset = useSharedValue({ x: initialX, y: initialY });

    // Expose getCanvasElementData via ref
    useImperativeHandle(ref, () => ({
      getCanvasElementData: () => ({
        type: 'text',
        props: {
          x: x.value,
          y: y.value,
          text,
          color,
          fontSize,
          fontStyle,
          fontWeight,
        },
      }),
    }));

    // Animated style for moving the text
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: x.value }, { translateY: y.value }],
    }));

    // Pan gesture for moving
    const panGesture = Gesture.Pan()
      .runOnJS(true)
      .onBegin(() => {
        // 제스처 시작 시점에 현재 위치를 저장
        lastOffset.value = { x: x.value, y: y.value };
      })
      .onUpdate((e) => {
        // 마지막 위치 + 이동량
        x.value = lastOffset.value.x + e.translationX;
        y.value = lastOffset.value.y + e.translationY;
      })
      .enabled(!editing);

    // Long press to edit
    const longPressGesture = Gesture.LongPress()
      .runOnJS(true)
      .onStart(() => {
        setEditing(true);
      })
      .minDuration(400);

    // Tap to enable move
    const tapGesture = Gesture.Tap()
      .runOnJS(true)
      .onStart(() => {
        if (!editing) {
          Keyboard.dismiss();
        }
      });

    // Combine gestures
    const composedGesture = Gesture.Simultaneous(
      panGesture,
      longPressGesture,
      tapGesture
    );

    return (
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.container, animatedStyle]}>
          {editing ? (
            <TextInput
              // style={[
              //   styles.textInput,
              //   { color, fontSize, fontStyle, fontWeight },
              // ]}
              value={text}
              autoFocus
              onChangeText={setText}
              onBlur={() => setEditing(false)}
              onSubmitEditing={() => setEditing(false)}
              blurOnSubmit
            />
          ) : (
            <TouchableWithoutFeedback onPress={() => setEditing(false)}>
              <View>
                <Animated.Text
                  style={[
                    styles.text,
                    // { color, fontSize, fontStyle, fontWeight },
                  ]}
                >
                  {text || 'Tap and hold to edit'}
                </Animated.Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  text: {
    // Default text style
  },
  textInput: {
    minWidth: 80,
    minHeight: 40,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    backgroundColor: '#fff',
    padding: 4,
  },
});
