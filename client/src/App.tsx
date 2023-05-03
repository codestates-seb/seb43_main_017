import React from 'react';
import './css/App.css';
import './css/reset.css';
import NotFound from './components/NotFound';

function App() {
    return (
        <>
            <NotFound />
            <div className="App">리액트가 정상작동 하는지 확인</div>
        </>
    );
}

export default App;
