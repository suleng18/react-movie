import Banner from 'components/banner/Banner';
import Main from 'components/layout/Main';
// import HomePage from 'page/HomePage';
// import MovieDetailsPage from 'page/MovieDetailsPage';
// import MoviePage from 'page/MoviePage';
import { Fragment, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'swiper/scss';

const HomePage = lazy(() => import('page/HomePage'));
const MovieDetailsPage = lazy(() => import('page/MovieDetailsPage'));
const MoviePage = lazy(() => import('page/MoviePage'));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Fragment>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  <HomePage />
                </>
              }
            ></Route>
            <Route path="/movies" element={<MoviePage />}></Route>
            <Route path="/movie/:movieId" element={<MovieDetailsPage />}></Route>
          </Route>
        </Routes>
      </Fragment>
    </Suspense>
  );
};

export default App;
