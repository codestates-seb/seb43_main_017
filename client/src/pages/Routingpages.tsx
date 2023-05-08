import { Routes, Route } from 'react-router-dom';
// import styled from 'styled-components';
import NotFound from '../components/NotFound';
import MainPage from './MainPage';
import Playlist from '../components/playlist/Playlist';
import Mixing from '../components/mixing/Mixing';
import Mypage from '../components/mypage/Mypage';
import Musiclist from '../components/musiclist/Musiclist';
import MusicDetail from './MusicDetail';

function RoutingPages() {
    return (
        <Routes>
            <Route path="/*" element={<NotFound />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/mixing" element={<Mixing />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/musiclist" element={<Musiclist />} />
            <Route path="/musicdetail" element={<MusicDetail />} />
        </Routes>
    );
}

export default RoutingPages;
