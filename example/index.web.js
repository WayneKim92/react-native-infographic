import { LoadSkiaWeb } from '@shopify/react-native-skia/src/web';
import { version } from 'canvaskit-wasm/package.json';
import { registerRootComponent } from 'expo';

// 더 이상 웹을 위하여 추가할 필요 없음. 추가하면 오히려 문제가 발생함.
// import { enableLegacyWebImplementation } from 'react-native-gesture-handler';
// enableLegacyWebImplementation(true);

import App from './src/App';

LoadSkiaWeb({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/canvaskit-wasm@${version}/bin/full/${file}`,
}).then(async () => {
  registerRootComponent(App);
});
