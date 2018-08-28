import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import './index.styl'

render(<App />, document.querySelector('.app-container'));
registerServiceWorker();
