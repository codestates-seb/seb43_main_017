import { Routes, Route } from 'react-router-dom';
// import styled from 'styled-components';
import NotFound from '../components/NotFound';
import MainPage from './MainPage';
import Playlist from '../components/playlist/Playlist';
import Mixing from '../components/mixing/Mixing';
import Mypage from '../components/mypage/mypage';

function RoutingPages() {
    return (
        <Routes>
            <Route path="/*" element={<NotFound />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/mixing" element={<Mixing />} />
            <Route path="/mypage" element={<Mypage />} />
        </Routes>
    );
}

export default RoutingPages;
