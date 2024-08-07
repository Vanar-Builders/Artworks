import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConnectWallet } from './components/ConnectWallet.jsx'; // Import your ConnectWallet component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Router>
      <Provider store={store}>
      <ConnectWallet>
        <App />
      </ConnectWallet>
      </Provider>
    </Router>
    
    
  </React.StrictMode>,
)
