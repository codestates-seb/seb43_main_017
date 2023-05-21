import { Routes, Route } from 'react-router-dom';
// import styled from 'styled-components';
import NotFound from 'src/pages/NotFound';
import MainPage from './MainPage';
import Playlist from 'src/components/playlist/Playlist';
import Mixing from 'src/components/mixing/Mixing';
import Mypage from 'src/components/mypage/Mypage';
import Musiclist from 'src/components/musiclist/Musiclist';
import PlaylistDetail from 'src/pages/PlaylistDetail';
import MusicDetail from 'src/pages/MusicDetail';
import Loading from 'src/components/sign/Loading';

function RoutingPages() {
    return (
        <Routes>
            <Route path="/*" element={<NotFound />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/playlsit/:plId" element={<PlaylistDetail />} />
            <Route path="/musiclist" element={<Musiclist />} />
            <Route path="/musiclist/:msId" element={<MusicDetail />} />
            <Route path="/fittingroom" element={<Mixing />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/oauthloading" element={<Loading />} />
        </Routes>
    );
}

export default RoutingPages;
