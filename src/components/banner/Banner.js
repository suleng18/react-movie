import useSWR from 'swr';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from 'components/button/Button';
import { useNavigate } from 'react-router-dom';
import { fetcher } from 'apiConfig/config';

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=c0745c88b05aaa1f08d6d21307bd6f34`,
    fetcher,
  );

  const movies = data?.results || [];

  return (
    <section className="banner h-[600px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor="true" slidesPerView={'auto'}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerItem({ item }) {
  const { title, poster_path, id } = item;
  const navigate = useNavigate();

  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t rounded-lg from-black"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${poster_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg object-top"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center justify-start gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">Fiction</span>
          <span className="py-2 px-4 border border-white rounded-md">Attractive</span>
          <span className="py-2 px-4 border border-white rounded-md">Active</span>
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch</Button>
      </div>
    </div>
  );
}

export default Banner;
