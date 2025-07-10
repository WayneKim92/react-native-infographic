import type {
  CanvasProps,
  ImageProps,
  TextProps,
} from '@shopify/react-native-skia';
import {
  Canvas,
  Image as SkiaImage,
  Text as SkiaText,
} from '@shopify/react-native-skia';
import { useCallback } from 'react';
import { useWindowDimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

interface CanvasText {
  type: 'text';
  props: TextProps;
}

interface CanvasImage {
  type: 'image';
  props: ImageProps;
}

type CanvasElement = Array<CanvasText | CanvasImage>;

interface ResultViewProps {
  // TODO: canvasData should contain the data needed to render the Canvas and its elements
  canvasData?: {
    canvas?: CanvasProps;
    elements?: CanvasElement;
  };
}

// TODO: Create a View rendered with Reanimated, and make it possible to pass data from this View to be rendered
export function ResultView({ canvasData }: ResultViewProps) {
  const screenDimensions = useWindowDimensions();
  const gesture = Gesture.Pan().runOnJS(true);

  const renderData = useCallback((data: CanvasElement) => {
    return data.map((item, index) => {
      if (item.type === 'text') {
        return <SkiaText key={index} {...item.props} />;
      } else if (item.type === 'image') {
        return <SkiaImage key={index} {...item.props} />;
      }
      return null;
    });
  }, []);

  return (
    <>
      {/* You should not render a skia component that contains a Canvas inside a Canvas. */}
      <Canvas>
        {canvasData?.elements ? renderData(canvasData.elements) : null}
      </Canvas>

      {/* You must use GestureDetector as a parent of the Canvas. It cannot be used inside the Canvas. */}
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={{
            width: screenDimensions.width,
            height: screenDimensions.height,
          }}
        />
      </GestureDetector>
    </>
  );
}
