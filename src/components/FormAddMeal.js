import React, { useState, useEffect } from "react";

export default function FormAddMeal({ onAddMeal, editingMeal }) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [category, setCategory] = useState("Breakfast");

  useEffect(() => {
    if (editingMeal) {
      setName(editingMeal.name);
      setIngredients(editingMeal.ingredients.join(", "));
      setCategory(editingMeal.category);
    }
  }, [editingMeal]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !ingredients.trim()) return;

    const newMeal = {
      id: editingMeal?.id || crypto.randomUUID(),
      name,
      ingredients: ingredients.split(",").map((ing) => ing.trim()),
      category,
    };

    onAddMeal(newMeal);
    setName("");
    setIngredients("");
    setCategory("Breakfast");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingMeal ? "Edit Meal" : "Add a New Meal"}</h2>
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
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <button type="submit">{editingMeal ? "Update Meal" : "Add Meal"}</button>
    </form>
  );
}
