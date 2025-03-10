import React from "react";

export default function Stats({ meals }) {
  const totalMeals = meals.length;
  const allIngredients = meals.flatMap((meal) => meal.ingredients);
  const ingredientCount = allIngredients.reduce((acc, ing) => {
    acc[ing] = (acc[ing] || 0) + 1;
    return acc;
  }, {});

  const mostUsedIngredients = Object.entries(ingredientCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Meals: {totalMeals}</p>
      <h3>Most Used Ingredients:</h3>
      <ul>
        {mostUsedIngredients.length > 0 ? (
          mostUsedIngredients.map(([ing, count]) => (
            <li key={ing}>
              {ing}: {count} times
            </li>
          ))
        ) : (
          <p>No ingredients yet.</p>
        )}
      </ul>
    </div>
  );
}
