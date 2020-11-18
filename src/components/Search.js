import React, { useState, useEffect } from "react";
import CharacterListing from "./CharacterListing";
import NotFound from "./NotFound";
import axios from "axios";

function Search(props) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const query = props.match.params.name;

	useEffect(() => {
		axios(`https://swapi.dev/api/people/?search=` + query)
			.then((response) => setData(response.data.results))
			.catch((error) => console.log("Error fetching and parsing data", error))
			.finally(() => setIsLoading(false));
	}, [query]);

	let comp;
	if (isLoading) {
		comp = <p>Loading...</p>;
	} else if (data.length) {
		comp = data.map((result) => (
			<CharacterListing key={result.name} data={result} />
		));
	} else {
		comp = <NotFound />;
	}
	return (
		<div>
			<h2>Search results</h2>
			<ul>{comp}</ul>
		</div>
	);
}

export default Search;
