import type {
  CanvasProps,
  ImageProps,
  TextProps,
} from '@shopify/react-native-skia';
import { Canvas, Fill, Image, Text, useFont } from '@shopify/react-native-skia';
import { useCallback } from 'react';
import { useWindowDimensions, View } from 'react-native';
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
    canvas?: CanvasProps | undefined;
    elements?: CanvasElement;
  };
  fonts: Record<string, any>;
}

// TODO: Create a View rendered with Reanimated, and make it possible to pass data from this View to be rendered
export function ResultView({ canvasData, fonts }: ResultViewProps) {
  const screenDimensions = useWindowDimensions();
  const gesture = Gesture.Pan().runOnJS(true);

  const font = useFont(fonts?.NotoSansKR, 16);

  const renderData = useCallback(
    (data: CanvasElement) => {
      return data.map((item, index) => {
        if (item.type === 'text') {
          return <Text key={index} {...item.props} font={font} />;
        } else if (item.type === 'image') {
          return <Image key={index} {...item.props} />;
        }
        return null;
      });
    },
    [font]
  );

  return (
    <View style={{ flex: 1, position: 'absolute' }}>
      {/* You should not render a skia component that contains a Canvas inside a Canvas. */}
      <Canvas style={{ width: '100%', height: '100%' }}>
        <Fill color="white" />
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
    </View>
  );
}
