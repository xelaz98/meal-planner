import React from "react";

export default function ShoppingList({ weeklyPlan }) {
  const allIngredients = Object.values(weeklyPlan)
    .flat()
    .flatMap((meal) => meal.ingredients);
  const uniqueIngredients = Array.from(new Set(allIngredients));

  return (
    <div>
      <h2>Shopping List</h2>
      {uniqueIngredients.length > 0 ? (
        <ul>
          {uniqueIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      ) : (
        <p>No ingredients needed.</p>
      )}
    </div>
  );
}
