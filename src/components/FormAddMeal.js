import React, { useState } from "react";

export default function FormAddMeal({ onAddMeal }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !ingredients.trim()) return;

    const newMeal = {
      id: crypto.randomUUID(),
      name,
      ingredients: ingredients.split(",").map((ing) => ing.trim()),
    };

    onAddMeal(newMeal);
    setName("");
    setIngredients("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a New Meal</h2>
      <input
        type="text"
        placeholder="Meal Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button type="submit">Add Meal</button>
    </form>
  );
}
