import React, { useState } from "react";
import MealList from "./components/MealList";
import FormAddMeal from "./components/FormAddMeal";
import WeeklyPlan from "./components/WeeklyPlan";
import ShoppingList from "./components/ShoppingList";
import Stats from "./components/Stats";

function App() {
  const [meals, setMeals] = useState([]);
  const [weeklyPlan, setWeeklyPlan] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  });

  const handleAddMeal = (meal) => {
    setMeals((prevMeals) => [...prevMeals, meal]);
  };

  const handleAddToPlan = (day, meal) => {
    setWeeklyPlan((prevPlan) => ({
      ...prevPlan,
      [day]: [...prevPlan[day], meal],
    }));
  };

  return (
    <div className="App">
      <h1>Meal Planner</h1>
      <FormAddMeal onAddMeal={handleAddMeal} />
      <MealList meals={meals} />
      <WeeklyPlan
        meals={meals}
        weeklyPlan={weeklyPlan}
        onAddToPlan={handleAddToPlan}
      />
      <ShoppingList weeklyPlan={weeklyPlan} />
      <Stats meals={meals} />
    </div>
  );
}

export default App;
