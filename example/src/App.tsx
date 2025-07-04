import { Text, View, StyleSheet } from 'react-native';
import { sayDream, HelloWorld } from 'react-native-infographic';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{sayDream()}</Text>
      <HelloWorld />
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
