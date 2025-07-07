import { View, StyleSheet } from 'react-native';
import { RNIGView } from 'react-native-infographic';

export default function App() {
  return (
    <View style={styles.container}>
      <RNIGView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
