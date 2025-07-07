import { Circle, Group } from '@shopify/react-native-skia';

const HelloWorld = () => {
  const width = 256;
  const r = width * 0.33;
  return (
    <Group blendMode="multiply">
      <Circle cx={r} cy={r} r={r} color="cyan" />
      <Circle cx={width - r} cy={r} r={r} color="magenta" />
      <Circle cx={width / 2} cy={width - r} r={r} color="yellow" />
    </Group>
  );
};

export default HelloWorld;
