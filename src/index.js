import React from 'react'
import ReactDOM from 'react-dom/client'
import { Offline, Online } from 'react-detect-offline'

import App from './components/App/App'
import NoInternet from './components/UI/NoInternet/NoInternet'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <>
    <Online>
      <App />
    </Online>
    <Offline>
      <NoInternet />
    </Offline>
  </>
)
