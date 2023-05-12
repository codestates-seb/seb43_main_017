import Uncover from 'src/components/main/Uncover';
import Info from 'src/components/main/Info';
import Footer from 'src/components/main/Footer';
import PageScroller from 'react-page-scroller';
function MainPage() {
    return (
        <>
            <PageScroller>
                <Uncover />
                <Info />
                <Footer />
            </PageScroller>
        </>
    );
}

export default MainPage;
