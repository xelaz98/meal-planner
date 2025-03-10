import React, { useState } from "react";
import MealList from "./components/MealList";
import FormAddMeal from "./components/FormAddMeal";
import WeeklyPlan from "./components/WeeklyPlan";
import ShoppingList from "./components/ShoppingList";

function App() {
  // useState за списъка с ястия
  const [meals, setMeals] = useState([]);

  // Функция за добавяне на ново ястие
  const handleAddMeal = (meal) => {
    setMeals((prevMeals) => [...prevMeals, meal]);
  };

  return (
    <div className="App">
      <h1>Meal Planner</h1>
      <FormAddMeal onAddMeal={handleAddMeal} />
      <MealList meals={meals} />
      <WeeklyPlan meals={meals} />
      <ShoppingList meals={meals} />
    </div>
  );
}

export default App;
