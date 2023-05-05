import { Routes, Route } from 'react-router-dom';
// import styled from 'styled-components';
import NotFound from '../components/NotFound';
import MainPage from './MainPage';
import Playlist from '../components/playlist/Playlist';

function RoutingPages() {
    return (
        <Routes>
            <Route path="/*" element={<NotFound />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/playlist" element={<Playlist />} />
        </Routes>
    );
}

export default RoutingPages;
