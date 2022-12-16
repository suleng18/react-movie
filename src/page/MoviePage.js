import MovieCard from 'components/movie/MovieCard';
import { fetcher } from 'config';
import useDebounce from 'hooks/useDebounce';
import { useEffect } from 'react';
import { useState } from 'react';
import useSWR from 'swr';
// https://api.themoviedb.org/3/search/movie?api_key=

const pageCount = 5;

const MoviePage = () => {
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/popular?api_key=c0745c88b05aaa1f08d6d21307bd6f34&page=${nextPage}`,
  );
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;

  const filterDebounce = useDebounce(filter, 500);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (filterDebounce)
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=c0745c88b05aaa1f08d6d21307bd6f34&query=${filterDebounce}&page=${nextPage}`,
      );
    else {
      setUrl(
        `https://api.themoviedb.org/3/movie/popular?api_key=c0745c88b05aaa1f08d6d21307bd6f34&page=${nextPage}`,
      );
    }
  }, [filterDebounce, nextPage]);

  const movies = data?.results || [];
  // const { page, total_pages } = data;
  // console.log('🚀 ~ total_pages', total_pages);
  // console.log('🚀 ~ page', page);

  return (
    <div className="py-10 page-container">
      <div className="flex mb-10 text-white">
        <div className="flex-1 ">
          <input
            onChange={handleFilterChange}
            type="text"
            className="w-full p-4 bg-slate-800 outline-none"
            placeholder="Type here to search..."
          />
        </div>
        <button className="text-white p-4 bg-primary ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent mx-auto animate-spin"></div>
      )}
      <div className="grid grid-cols-4 gap-10">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => <MovieCard key={item.id} item={item}></MovieCard>)}
      </div>
      <div className="flex items-center justify-center mt-10 gap-x-5">
        <span className="cursor-pointer" onClick={() => setNextPage(nextPage - 1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </span>
        {new Array(pageCount).fill(0).map((item, index) => (
          <span
            onClick={() => setNextPage(index + 1)}
            className="cursor-pointer inline-block py-2 px-4 rounded leading-none bg-white text-slate-800"
          >
            {index + 1}
          </span>
        ))}

        <span className="cursor-pointer" onClick={() => setNextPage(nextPage + 1)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MoviePage;
