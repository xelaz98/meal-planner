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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedMeals = localStorage.getItem("meals");
    const storedPlan = localStorage.getItem("weeklyPlan");

    try {
      if (storedMeals) setMeals(JSON.parse(storedMeals));
      if (storedPlan) setWeeklyPlan(JSON.parse(storedPlan));
    } catch (error) {
      console.error("Invalid data in Local Storage, resetting...");
      localStorage.removeItem("meals");
      localStorage.removeItem("weeklyPlan");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddMeal = (meal) => {
    if (editingMeal) {
      // 📌 Актуализираме ястието в Meal List
      setMeals(meals.map((m) => (m.id === editingMeal.id ? meal : m)));

      // 📌 Актуализираме ястието в Weekly Plan ако го има
      setWeeklyPlan((prevPlan) => {
        const newPlan = { ...prevPlan };
        Object.keys(newPlan).forEach((day) => {
          newPlan[day] = newPlan[day].map((m) =>
            m.id === editingMeal.id ? { ...m, name: meal.name } : m
          );
        });
        return newPlan;
      });

      setEditingMeal(null);
    } else {
      setMeals((prevMeals) => [...prevMeals, meal]);
    }
  };

  const handleEditMeal = (meal) => {
    setEditingMeal(meal);
  };

  const handleDeleteMeal = (mealId) => {
    setMeals(meals.filter((meal) => meal.id !== mealId));
    setWeeklyPlan((prevPlan) => {
      const newPlan = { ...prevPlan };
      Object.keys(newPlan).forEach((day) => {
        newPlan[day] = newPlan[day].filter((meal) => meal.id !== mealId);
      });
      return newPlan;
    });
  };

  const handleAddToPlan = (day, meal) => {
    setWeeklyPlan((prevPlan) => ({
      ...prevPlan,
      [day]: [...prevPlan[day], meal],
    }));
  };

  const handleRemoveFromPlan = (day, mealId) => {
    setWeeklyPlan((prevPlan) => ({
      ...prevPlan,
      [day]: prevPlan[day].filter((meal) => meal.id !== mealId),
    }));
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

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
        onRemoveFromPlan={handleRemoveFromPlan}
      />
      <ShoppingList weeklyPlan={weeklyPlan} />
      <Stats meals={meals} />
    </div>
  );
}

export default App;
