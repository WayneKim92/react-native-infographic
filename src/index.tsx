export { default as HelloWorld } from './helloWorld';

import { Canvas } from '@shopify/react-native-skia';
import { SkiaImageView } from './SkiaImageView';
import { useWindowDimensions } from 'react-native';
import HelloWorld from './helloWorld';

export function RNIGView() {
  const screenDimensions = useWindowDimensions();

  return (
    // You should not render a skia component that contains a Canvas inside a Canvas.
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
    </Canvas>
  );
}
