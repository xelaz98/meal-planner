import React, { useState } from "react";
import MealList from "./components/MealList";
import FormAddMeal from "./components/FormAddMeal";
import WeeklyPlan from "./components/WeeklyPlan";
import ShoppingList from "./components/ShoppingList";
import Stats from "./components/Stats";
import "./index.css";

function App() {
  const [meals, setMeals] = useState([]);
  const [editingMeal, setEditingMeal] = useState(null);

  const handleAddMeal = (meal) => {
    if (editingMeal) {
      setMeals(meals.map((m) => (m.id === editingMeal.id ? meal : m)));
      setEditingMeal(null);
    } else {
      setMeals((prevMeals) => [...prevMeals, meal]);
    }
  };

  const handleEditMeal = (meal) => {
    setEditingMeal(meal);
  };

  const handleDeleteMeal = (mealId) => {
    if (window.confirm("Are you sure you want to delete this meal?")) {
      setMeals(meals.filter((meal) => meal.id !== mealId));
    }
  };

  return (
    <div className="container">
      <h1 className="text-center text-blue">Meal Planner</h1>
      <FormAddMeal onAddMeal={handleAddMeal} editingMeal={editingMeal} />
      <MealList
        meals={meals}
        onEditMeal={handleEditMeal}
        onDeleteMeal={handleDeleteMeal}
      />
      <Stats meals={meals} />
    </div>
  );
}

export default App;
