import { LoaderFunction } from "@remix-run/node";
import { Film, getFilmById } from "~/api/films";
import invariant from "tiny-invariant";
import { useLoaderData } from "@remix-run/react";

// Similar to the films index file, need a loader to get data from
// the server.
// export const loader: LoaderFunction = async ({request}) => {
//   const url = new URL(request.url);
//   const title = url.searchParams.get('title');



//   return getFilms(title);
// };
export const loader: LoaderFunction = async ({params}) => {
  // typescript doesn't know about params.filmId and would complain...
  // to get around that, install 'tiny-invariant'
  invariant(params.filmId, 'expected params.filmId'); // this tells typescript, by the time we get to where filmId is used, it should be truthy or true.

  // dynamic ID passed in function
  const film = await getFilmById(params.filmId);

  return film;
}

export default function Film() {
  // useLoaderData to retrieve the data from loader
  const film = useLoaderData<Film>();
  return <div>{film.title}</div>
}