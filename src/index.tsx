import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// Your top level component
import App from './App'

// Export your top level component as JSX (for static rendering)
export default App

let netlifyIdentity:any;
if (typeof document !== 'undefined') {
  netlifyIdentity = require('netlify-identity-widget')
  netlifyIdentity.init();
  
  if (typeof window !== "undefined") {
    window.netlifyIdentity = netlifyIdentity;
  }
}

// Fix for typescript window error
declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

// Render your app
if (typeof document !== 'undefined') {
  const target = document.getElementById('root')

  const renderMethod = target.hasChildNodes()
    ? ReactDOM.hydrate
    : ReactDOM.render

  const render = (Comp: Function) => {
    renderMethod(
      <AppContainer>
        <Comp />
      </AppContainer>,
      target
    )
  }

  // Render!
  render(App)

  // Hot Module Replacement
  if (module && module.hot) {
    module.hot.accept('./App', () => {
      render(App)
    })
  }
}
