import { Routes, Route } from 'react-router-dom';
// import styled from 'styled-components';
import NotFound from '../components/NotFound';
import MainPage from './MainPage';

function RoutingPages() {
    return (
        <Routes>
            <Route path="/*" element={<NotFound />} />
            <Route path="/" element={<MainPage />} />
        </Routes>
    );
}

export default RoutingPages;
