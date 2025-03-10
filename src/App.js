import React from "react";
import MealList from "./components/MealList";
import FormAddMeal from "./components/FormAddMeal";
import WeeklyPlan from "./components/WeeklyPlan";
import ShoppingList from "./components/ShoppingList";

function App() {
  return (
    <div className="App">
      <h1>Meal Planner</h1>
      <FormAddMeal />
      <MealList />
      <WeeklyPlan />
      <ShoppingList />
    </div>
  );
}

export default App;
