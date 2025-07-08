export { default as HelloWorld } from './helloWorld';

import { Canvas, Circle } from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';
import HelloWorld from './helloWorld';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSharedValue, withDecay } from 'react-native-reanimated';
import { SkiaImageView } from './SkiaImageView';

export function RNIGView() {
  const screenDimensions = useWindowDimensions();

  const { width } = useWindowDimensions();

  const leftBoundary = 0;
  const rightBoundary = width;
  const translateX = useSharedValue(width / 2);

  const gesture = Gesture.Pan()
    .onChange((e) => {
      translateX.value += e.changeX;
    })
    .onEnd((e) => {
      translateX.value = withDecay({
        velocity: e.velocityX,
        clamp: [leftBoundary, rightBoundary],
      });
    });

  return (
    // You must use GestureDetector as a parent of the Canvas. It cannot be used inside the Canvas.
    <GestureDetector gesture={gesture}>
      {/* You should not render a skia component that contains a Canvas inside a Canvas. */}
      <Canvas
        style={{
          width: screenDimensions.width,
          height: screenDimensions.height,
        }}
      >
        {/* Sample Code */}
        <HelloWorld />
        {/* Practice Code */}
        <SkiaImageView src="https://picsum.photos/200/300" />
        {/* Gesture Test Code */}
        <Circle cx={translateX} cy={40} r={20} color="#3E3E" />
      </Canvas>
    </GestureDetector>
  );
}
