import React from "react";

function ToyCard({ id, name, image, likes, onDeleteToy, onUpdateLikes }) {
  function handleDeleteClick() {
    onDeleteToy(id);
  }

  function handleLikeClick() {
    onUpdateLikes(id);
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button 
        className="like-btn" 
        onClick={handleLikeClick}
      >
        Like {"<3"}
      </button>
      <button 
        className="del-btn"
        onClick={handleDeleteClick}
      >
        Donate to GoodWill
      </button>  
    </div>
  );
}

export default ToyCard;