import { createRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { IGText, type IGTextRef } from './IGComponents/IGText';
import { ResultView } from './ResultView';

interface RNIGViewProps {
  // rnigURI: string;
}

type ElementType = {
  id: string;
  type: 'text' | 'image';
  ref: React.RefObject<IGTextRef | null>;
};

export function RNIGView(_props: RNIGViewProps) {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [elements, setElements] = useState<ElementType[]>([]);

  // Add IGText to canvas
  const handleAddText = () => {
    const id = Math.random().toString(36).slice(2);
    const ref = createRef<IGTextRef>();
    setElements((prev) => [...prev, { id, type: 'text', ref }]);
  };

  // Gather canvas data for preview mode
  // const getCanvasData = () => {
  //   const canvasElementData = elements.map((el) =>
  //     el.ref.current?.getCanvasElementData()
  //   );
  //   return {
  //     canvas: {},
  //     elements: canvasElementData,
  //   };
  // };

  return (
    <View style={{ flex: 1 }}>
      {/* TODO: refactor temp style */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsPreviewMode(!isPreviewMode)}>
          <Text>{`Toggle ${isPreviewMode ? 'Edit' : 'Preview'} Mode`}</Text>
        </TouchableOpacity>
      </View>
      {isPreviewMode ? (
        <ResultView />
      ) : (
        // Realtime Canvas
        <Animated.View style={{ flex: 1 }}>
          {/* Render IGText components */}
          {elements.map((el) =>
            el.type === 'text' ? <IGText key={el.id} ref={el.ref} /> : null
          )}

          {/* Edit Bar */}
          <EditBar onAddText={handleAddText} />
        </Animated.View>
      )}
    </View>
  );
}

// Edit Bar Component
function EditBar({ onAddText }: { onAddText: () => void }) {
  return (
    <View style={styles.editBar}>
      <TouchableOpacity style={styles.editBarButton} onPress={onAddText}>
        <Text style={styles.editBarButtonText}>Text</Text>
      </TouchableOpacity>
      {/* Add more buttons for images, shapes, etc. */}
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
  editBar: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
  },
  editBarButton: {
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  editBarButtonText: {
    fontWeight: 'bold',
    color: '#333',
  },
});
