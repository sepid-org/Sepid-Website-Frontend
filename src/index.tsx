import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reduxStore from 'commons/redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import InitialApiCaller from 'commons/utils/InitialApiCalls';

const rootContent =
  process.env.REACT_APP_GOOGLE_CLIENT_ID ?
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Provider store={reduxStore}>
          <InitialApiCaller>
            <App />
          </InitialApiCaller>
        </Provider>
      </BrowserRouter>
    </GoogleOAuthProvider> :
    <BrowserRouter>
      <Provider store={reduxStore}>
        <InitialApiCaller>
          <App />
        </InitialApiCaller>
      </Provider>
    </BrowserRouter>


ReactDOM.createRoot(document.getElementById("root")).render(rootContent);