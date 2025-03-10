import React, { useState } from "react";

export default function MealList({ meals, onEditMeal, onDeleteMeal }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredMeals = meals.filter((meal) => {
    if (filter !== "All" && meal.category !== filter) return false;
    if (search && !meal.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="card">
      <h2 className="text-center">Meal List</h2>
      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-group"
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="form-group"
      >
        <option value="All">All</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <ul>
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <li key={meal.id} className="flex justify-between items-center">
              <div>
                <strong>{meal.name}</strong> ({meal.category}):{" "}
                {meal.ingredients.join(", ")}
              </div>
              <div>
                <button onClick={() => onEditMeal(meal)} className="btn-edit">
                  Edit
                </button>
                <button
                  onClick={() => onDeleteMeal(meal.id)}
                  className="btn-delete"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-red text-center">No meals available.</p>
        )}
      </ul>
    </div>
  );
}
