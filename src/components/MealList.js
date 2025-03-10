import React, { useState } from "react";

export default function MealList({ meals }) {
  const [filter, setFilter] = useState("All");

  const filteredMeals =
    filter === "All" ? meals : meals.filter((meal) => meal.category === filter);

  return (
    <div>
      <h2>Meal List</h2>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Breakfast">Breakfast</option>
        <option value="Lunch">Lunch</option>
        <option value="Dinner">Dinner</option>
      </select>
      <ul>
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <li key={meal.id}>
              <strong>{meal.name}</strong> ({meal.category}):{" "}
              {meal.ingredients.join(", ")}
            </li>
          ))
        ) : (
          <p>No meals available for this category.</p>
        )}
      </ul>
    </div>
  );
}
