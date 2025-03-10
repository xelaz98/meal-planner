import React, { useState, useEffect } from "react";
import MealList from "./components/MealList";
import FormAddMeal from "./components/FormAddMeal";
import WeeklyPlan from "./components/WeeklyPlan";
import ShoppingList from "./components/ShoppingList";
import Stats from "./components/Stats";
import "./index.css";

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
  const [editingMeal, setEditingMeal] = useState(null);

  // 📌 Зареждане на данни от Local Storage при стартиране
  useEffect(() => {
    const storedMeals = localStorage.getItem("meals");
    const storedPlan = localStorage.getItem("weeklyPlan");
    if (storedMeals) setMeals(JSON.parse(storedMeals));
    if (storedPlan) setWeeklyPlan(JSON.parse(storedPlan));
  }, []);

  // 📌 Съхранение на ястията в Local Storage
  useEffect(() => {
    if (meals.length > 0) {
      localStorage.setItem("meals", JSON.stringify(meals));
    }
  }, [meals]);

  // 📌 Съхранение на седмичния план в Local Storage
  useEffect(() => {
    if (Object.values(weeklyPlan).flat().length > 0) {
      localStorage.setItem("weeklyPlan", JSON.stringify(weeklyPlan));
    }
  }, [weeklyPlan]);

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
      setWeeklyPlan((prevPlan) => {
        const newPlan = { ...prevPlan };
        Object.keys(newPlan).forEach((day) => {
          newPlan[day] = newPlan[day].filter((meal) => meal.id !== mealId);
        });
        return newPlan;
      });
    }
  };

  // 📌 Функция за добавяне на ястие към ден от седмицата
  const handleAddToPlan = (day, meal) => {
    setWeeklyPlan((prevPlan) => ({
      ...prevPlan,
      [day]: [...prevPlan[day], meal],
    }));
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
