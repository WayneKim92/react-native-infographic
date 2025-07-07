import React from 'react';
import {
  Image as SkiaImage,
  useImage,
  type Fit,
} from '@shopify/react-native-skia';
import { useWindowDimensions } from 'react-native';

interface SkiaImageViewProps {
  src: string;
  fit?: Fit;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export const SkiaImageView: React.FC<SkiaImageViewProps> = ({
  src,
  fit,
  x,
  y,
  width,
  height,
}) => {
  /*
  On web, 
  using useImage with conditional rendering, can cause ResizeObserver errors.
  because Skia may try to unobserve a non-Element target.
  */
  const image = useImage(src);
  const screenDimensions = useWindowDimensions();

  return (
    <SkiaImage
      image={image}
      fit={fit ? fit : 'contain'}
      x={x ? x : 0}
      y={y ? y : 0}
      width={width ? width : screenDimensions.width}
      height={height ? height : screenDimensions.height}
    />
  );
};
