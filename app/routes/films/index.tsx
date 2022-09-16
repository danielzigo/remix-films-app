import { 
  LinksFunction, 
  LoaderFunction, 
  MetaFunction, 
} from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Film, getFilms } from "~/api/films";


// This is SERVER side
// Remix promotes use of APIs that exist already.
// Fetch exists in the browser, so no real need to use APIs like Axios.
export const loader: LoaderFunction = async ({request}) => {
  // This is how Remix uses the default browser behaviour to
  // handle browser queries [instead of doing 'e.preventDefault()]
  const url = new URL(request.url);
  // * console.log() is printed to the terminal (!)
  // console.log(url.searchParams.get('title'));
  const title = url.searchParams.get('title');

  // See ./api/films.ts
  return getFilms(title);
  // return { message: 'hello world!!' };
};

// CLIENT side
export default function FilmsIndex() {
  // to retrieve data from the loader (server),
  // we use the 'useLoaderData'.
  // with React, this would need to be done with an API request, but
  // it's been made easier with just the hook below.

  const films = useLoaderData<Film[]>(); //<- film array imported. typescript.
  // const data = useLoaderData();
  return (
    <div className="p-16 font-sans">
      <h1 className="text-5xl font-bold text-center">Studio Ghibli Films</h1>

      {/* 
        Remix recommends the use of the Form component from Remix.
        By default, the method is 'get'.
      */}
      <Form reloadDocument method="get" className="py-5">
        <label 
          htmlFor="" className="font-bold">
            Search 
          <input type="text" name="title" placeholder="Type a title..." className="border-2 rounded py-2 px-3"/>
        </label>

        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
        >
          Search
        </button>
      </Form>

      <div className="grid grid-cols-4 gap-4">
        {films.map((film) => (
          // add a key property here - because we're rendering a list and each item should
          // have a unique key
          <Link 
            title={film.title}
            key={film.id} 
            to={film.id} 
            className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer"
            prefetch="none" // what does this do again?
          >
            <h2>{film.title}</h2>
            <img src={film.image} alt={film.title} />
          </Link>
        ))}
      </div>
      {/* <p>{data.message}</p> */}
    </div>
  );
  // return <div>Films {data.message}</div>
}

export const links: LinksFunction = () => {
  return [{
    rel: 'stylesheet',
    href: 'styles'
  }];
};

export const meta: MetaFunction = () => {
  return {
    title: "Films | My Studio",
    description: 'A list of films',
  };
};
