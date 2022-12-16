import { fetcher, tmdbAPI } from 'apiConfig/config';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import MovieCard, { MovieCardSkeleton } from './MovieCard';
import PropTypes from 'prop-types';
import { withErrorBoundary } from 'react-error-boundary';

// https://api.themoviedb.org/3/movie/now_playing?api_key=c0745c88b05aaa1f08d6d21307bd6f34

const MovieList = ({ type = 'now_playing' }) => {
  const { data, error } = useSWR(tmdbAPI.getMovieList(type), fetcher);
  const isLoading = !data && !error;
  const movies = data?.results || [];

  return (
    <div className="movies-list">
      {isLoading && (
        <>
          <Swiper grabCursor={true} spaceBetween={25} slidesPerView={'auto'}>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      {!isLoading && (
        <Swiper grabCursor={true} spaceBetween={25} slidesPerView={'auto'}>
          {movies.length > 0 &&
            movies.map((item, index) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string.isRequired,
};

function FallbackComponent() {
  return <p className="bg-red-50 text-red-400">Something went wrong with this component</p>;
}

export default withErrorBoundary(MovieList, {
  FallbackComponent: FallbackComponent,
});
