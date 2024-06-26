import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
// import { ExpTraContextProvider } from './store/ExpContext.jsx';
import { Provider } from "react-redux";
import expenseConfigureStore from './store/ExpContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={expenseConfigureStore}>
        {/* <ExpTraContextProvider> */}
        <App />
        {/* </ExpTraContextProvider> */}
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
