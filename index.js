import { KeepAwake, registerRootComponent } from 'expo';
import Boot from './Boot';

if (__DEV__) {
  KeepAwake.activate();
}
console.log('Booting')
registerRootComponent(Boot);
