import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // Fetch all toys on page load
  useEffect(() => {
    fetch("http://localhost:4000/toys")
      .then(r => r.json())
      .then(toysArray => {
        setToys(toysArray);
      });
  }, []);

  // Add new toy
  const addToy = (newToy) => {
    fetch("http://localhost:4000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newToy,
        likes: 0
      }),
    })
      .then(r => r.json())
      .then(newToyFromServer => {
        setToys([...toys, newToyFromServer]);
      });
  };

  // Delete toy
  const deleteToy = (toyId) => {
    fetch(`http://localhost:4000/toys/${toyId}`, {
      method: "DELETE",
    })
      .then(r => r.json())
      .then(() => {
        const updatedToys = toys.filter(toy => toy.id !== toyId);
        setToys(updatedToys);
      });
  };

  // Update likes
  const updateLikes = (toyId) => {
    const toy = toys.find(toy => toy.id === toyId);
    if (toy) {
      fetch(`http://localhost:4000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...toy,
          likes: toy.likes + 1
        }),
      })
        .then(r => r.json())
        .then(updatedToy => {
          const updatedToys = toys.map(t => 
            t.id === toyId ? updatedToy : t
          );
          setToys(updatedToys);
        });
    }
  };

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer 
        toys={toys} 
        onDeleteToy={deleteToy}
        onUpdateLikes={updateLikes}
      />
    </>
  );
}

export default App;