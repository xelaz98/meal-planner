import React from "react";

export default function FormAddMeal() {
  return (
    <form>
      <h2>Add a New Meal</h2>
      <input type="text" placeholder="Meal Name" />
      <input type="text" placeholder="Ingredients (comma separated)" />
      <button type="submit">Add Meal</button>
    </form>
  );
}
