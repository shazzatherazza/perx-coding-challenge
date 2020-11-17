import React, { useState, useEffect } from "react";
import NotFound from "./NotFound";
import axios from "axios";
const CharacterProfile = props => {
  const [name, setName] = useState();
  const [homeworld, setHomeworld] = useState();
  const [films, setFilms] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const query = props.match.params.id;

  useEffect(() => {
    axios(`https://swapi.dev/api/people/` + query)
      .then(response => {
        setName(response.data.name);
        let promises = [];
        promises.push(axios(response.data.homeworld));

        response.data.films.forEach(film => promises.push(axios(film)));
        return Promise.all(promises);
      })
      .then(response => {
        setHomeworld(response[0].data.name);
        setFilms(response.slice(1).map(film => film.data.title));
      })
      .catch(error => console.log("Error fetching and parsing data", error))
      .finally(() => setIsLoading(false));
  }, [query]);

  let comp;
  if (isLoading) {
    comp = <p>Loading...</p>;
  } else if (name && homeworld && films) {
    comp = (
      <div>
        <h1>{name}</h1>
        <h2>Homeworld: {homeworld}</h2>
        <ul>
          {films.map(film => (
            <li key={film}>{film}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    comp = <NotFound />;
  }
  return <div className="main-content">{comp}</div>;
};

export default CharacterProfile;
