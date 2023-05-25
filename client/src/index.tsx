import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import 'src/css/index.css';
import App from 'src/App';
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <RecoilRoot>
        <App />
    </RecoilRoot>,
);
