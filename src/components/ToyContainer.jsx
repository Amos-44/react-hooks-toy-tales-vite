import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, onDeleteToy, onUpdateLikes }) {
  return (
    <div id="toy-collection">
      {toys.map(toy => (
        <ToyCard
          key={toy.id}
          id={toy.id}
          name={toy.name}
          image={toy.image}
          likes={toy.likes}
          onDeleteToy={onDeleteToy}
          onUpdateLikes={onUpdateLikes}
        />
      ))}
    </div>
  );
}

export default ToyContainer;