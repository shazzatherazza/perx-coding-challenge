import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import NotFound from "./NotFound";
import CharacterProfile from "./CharacterProfile";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
	const { isAuthenticated, isLoading } = useAuth0();
	let comp;
	if (isLoading) {
		comp = <p>Loading...</p>;
	} else if (isAuthenticated) {
		comp = (
			<div>
				<LogoutButton />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/search/:name" component={Search} />
					<Route path="/character/:id" component={CharacterProfile} />
					<Route component={NotFound} />
				</Switch>
			</div>
		);
	} else {
		comp = <LoginButton />;
	}
	return (
		<BrowserRouter>
			<div className="container">{comp}</div>
		</BrowserRouter>
	);
};

export default App;
