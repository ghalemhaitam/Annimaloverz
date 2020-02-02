/**
 * @format
 */

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { YellowBox } from 'react-native'

console.disableYellowBox = true

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed']
AppRegistry.registerComponent(appName, () => App)

YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
    'Module RCTImageLoader requires',
    'Setting a timer'
])
