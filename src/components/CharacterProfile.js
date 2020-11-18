import React, { useState, useEffect } from "react";
import NotFound from "./NotFound";
import axios from "axios";
const CharacterProfile = (props) => {
	const [name, setName] = useState();
	const [homeworld, setHomeworld] = useState();
	const [films, setFilms] = useState();
	const [image, setImage] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	const query = props.match.params.id;
	const bingSubscriptionKey = process.env.REACT_APP_BING_SUBSCRIPTION_KEY;
	useEffect(() => {
		axios(`https://swapi.dev/api/people/` + query)
			.then((response) => {
				setName(response.data.name);
				let promises = [];
				promises.push(
					axios.get("https://api.bing.microsoft.com/v7.0/images/search", {
						headers: {
							"Ocp-Apim-Subscription-Key": bingSubscriptionKey,
						},
						params: {
							count: 1,
							mkt: "en-US",
							q: response.data.name,
						},
					})
				);

				promises.push(axios(response.data.homeworld));

				response.data.films.forEach((film) => promises.push(axios(film)));
				return Promise.all(promises);
			})
			.then((response) => {
				setImage(response[0].data.value[0].thumbnailUrl);
				setHomeworld(response[1].data.name);
				setFilms(response.slice(2).map((film) => film.data.title));
			})
			.catch((error) => setError(error))
			.finally(() => setIsLoading(false));
	}, [query]);

	let comp;
	if (isLoading) {
		comp = <p>Loading...</p>;
	} else if (!error) {
		comp = (
			<div>
				<h1>{name}</h1>
				<h2>Homeworld: {homeworld}</h2>
				<ul>
					{films.map((film) => (
						<li key={film}>{film}</li>
					))}
				</ul>
				<img src={image} alt={name} />
			</div>
		);
	} else {
		comp = <NotFound />;
	}
	return <div>{comp}</div>;
};

export default CharacterProfile;
