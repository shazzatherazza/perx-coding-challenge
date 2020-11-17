import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Home() {
  let history = useHistory();
  const [name, setName] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    let searchName = name.value;
    let path = `search/${searchName}`;
    history.push(path);
  };

  return (
    <div className="main-content home">
      <h1>Perx Star Wars Frontend Coding Challenge</h1>
      <h2>Star Wars character search</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" ref={input => setName(input)} />

        <button type="submit">Go!</button>
      </form>
    </div>
  );
}

export default Home;
