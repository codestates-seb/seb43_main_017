import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import 'src/css/index.css';
import App from 'src/App';
import { GoogleOAuthProvider } from '@react-oauth/google';
const CLIENT_ID = '277083970068-k2lrnop3j3uvu85133vip6jfutof85fv.apps.googleusercontent.com';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <RecoilRoot>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <App />
        </GoogleOAuthProvider>
    </RecoilRoot>,
);
