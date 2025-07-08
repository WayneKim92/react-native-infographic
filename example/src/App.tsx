import { RNIGView } from 'react-native-infographic';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>
      <RNIGView />
    </GestureHandlerRootView>
  );
}
