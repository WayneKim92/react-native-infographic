import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { ResultView } from './ResultView';

interface RNIGViewProps {
  // rnigURI: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RNIGView(props: RNIGViewProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  return (
    <View>
      {/* TODO: refactor temp style */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsPreviewMode(!isPreviewMode)}>
          <Text>{`Toggle ${isPreviewMode ? 'Edit' : 'Preview'} Mode`}</Text>
        </TouchableOpacity>
      </View>
      {isPreviewMode ? (
        <ResultView canvasData={{ canvas: {}, elements: [] }} />
      ) : (
        <Animated.View style={{ backgroundColor: 'red' }}>
          {/* TODO: Reanimred 기반으로 제스처 및 스타일 수정이 가능한 컴포넌트 만들어보자. */}
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    height: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
