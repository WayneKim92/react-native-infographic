import { LoadSkiaWeb } from '@shopify/react-native-skia/src/web';
import { version } from 'canvaskit-wasm/package.json';
import { registerRootComponent } from 'expo';

import App from './src/App';

LoadSkiaWeb({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${version}/bin/full/${file}`,
}).then(async () => {
  registerRootComponent(App);
});
