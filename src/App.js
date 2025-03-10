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
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Meal Planner
      </h1>
      <h2 className="text-red-500">
        Ако този текст е червен, Tailwind работи!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormAddMeal onAddMeal={handleAddMeal} />
        <MealList meals={meals} />
        <Stats meals={meals} />
        <WeeklyPlan
          meals={meals}
          weeklyPlan={weeklyPlan}
          onAddToPlan={handleAddToPlan}
        />
        <ShoppingList weeklyPlan={weeklyPlan} />
      </div>
    </div>
  );
}

export default App;
