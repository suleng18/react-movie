import MovieCard from 'components/movie/MovieCard';
import { func } from 'prop-types';
import React from 'react';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import { apiKey, fetcher } from '../config';

// https://api.themoviedb.org/3/account?api_key=<<api_key>>

const MovieDetailsPage = () => {
  const { movieId } = useParams({});
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`,
    fetcher,
  );
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;

  return (
    <div className="py-10">
      <div className="w-full h-[600px] relative ">
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
      <h1 className="text-white text-center text-4xl mb-10 font-bold">{title}</h1>
      {genres.length > 0 && (
        <div className="flex items-center gap-x-5 mb-10 justify-center">
          {genres.map((item) => (
            <span className="py-2 px-4 border border-primary text-primary rounded " key={item.id}>
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">{overview}</p>
      <MovieCredits></MovieCredits>
      <MovieVideos></MovieVideos>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};

function MovieCredits() {
  const { movieId } = useParams({});
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
    fetcher,
  );
  if (!data || !data.cast) return null;
  const { cast } = data;

  // https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=
  return (
    <div className="py-10 page-container">
      <h2 className="text-center text-3xl font-bold mb-10">Casts</h2>
      <div className="grid grid-cols-4 gap-5">
        {cast.length > 0 &&
          cast.slice(0, 8).map((item) => (
            <div key={item.id} className="cast-item">
              <img
                src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                alt=""
                className="w-full h-[350px] object-cover rounded-lg mb-3"
              />
              <h3 className="text-center text-xl">{item.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
}

function MovieVideos() {
  const { movieId } = useParams({});
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    fetcher,
  );
  if (!data || !data.results) return null;
  const { results } = data;

  return (
    <div className="py-10 page-container">
      <h2 className="text-center text-3xl font-bold mb-10">Trailer Movie</h2>
      <div className="flex flex-col gap-10">
        {results.slice(0, 2).map((item) => (
          <div className="" key={item.id}>
            <h3 className="mb-5 text-xl font-medium p-3 bg-secondary inline-block">{item.name}</h3>
            <div className="w-full aspect-auto">
              <iframe
                width="1522"
                height="581"
                src={`https://www.youtube.com/embed/${item.key}`}
                title="20th Century Girl | Official Trailer | Netflix [Việt SUB CC]"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full  object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MovieSimilar() {
  const { movieId } = useParams({});
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`,
    fetcher,
  );
  if (!data || !data.results) return null;
  const { results } = data;

  return (
    <div className="py-10 page-container">
      <h2 className="text-3xl text-center font-medium mb-10">Similar Movie</h2>
      <div className="movies-list">
        <Swiper grabCursor={true} spaceBetween={25} slidesPerView={'auto'}>
          {results.length > 0 &&
            results.map((item, index) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

// <iframe width="1522" height="581" src="https://www.youtube.com/embed/KFS4_qevE7M" title="20th Century Girl | Official Trailer | Netflix [Việt SUB CC]" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
export default MovieDetailsPage;
