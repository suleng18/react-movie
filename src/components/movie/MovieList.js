import { fetcher } from 'config';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import MovieCard from './MovieCard';

// https://api.themoviedb.org/3/movie/now_playing?api_key=c0745c88b05aaa1f08d6d21307bd6f34

const MovieList = ({ type = 'now_playing' }) => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=c0745c88b05aaa1f08d6d21307bd6f34`,
    fetcher,
  );

  const movies = data?.results || [];

  return (
    <div className="movies-list">
      <Swiper grabCursor={true} spaceBetween={25} slidesPerView={'auto'}>
        {movies.length > 0 &&
          movies.map((item, index) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
