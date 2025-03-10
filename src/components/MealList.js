import React from "react";

export default function MealList({ meals }) {
  return (
    <div>
      <h2>Meal List</h2>
      <ul>
        {meals.length > 0 ? (
          meals.map((meal) => (
            <li key={meal.id}>
              <strong>{meal.name}</strong>: {meal.ingredients.join(", ")}
            </li>
          ))
        ) : (
          <p>No meals added yet.</p>
        )}
      </ul>
    </div>
  );
}
