import React from "react";
import { useHistory } from "react-router-dom";

const CharacterListing = props => {
  let history = useHistory();

  const name = props.data.name;
  const id = props.data.url.split("/")[5];
  return (
    <li
      onClick={() => {
        history.push(`../character/${id}`);
      }}
    >
      <a>{name}</a>
    </li>
  );
};

export default CharacterListing;
