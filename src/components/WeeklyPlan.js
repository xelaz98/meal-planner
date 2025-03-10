import React from "react";

export default function WeeklyPlan({ meals, weeklyPlan, onAddToPlan }) {
  const days = Object.keys(weeklyPlan);

  return (
    <div>
      <h2>Weekly Plan</h2>
      {days.map((day) => (
        <div key={day}>
          <h3>{day}</h3>
          <ul>
            {weeklyPlan[day].length > 0 ? (
              weeklyPlan[day].map((meal) => <li key={meal.id}>{meal.name}</li>)
            ) : (
              <p>No meals planned for {day}.</p>
            )}
          </ul>
          {meals.length > 0 && (
            <select
              onChange={(e) =>
                onAddToPlan(
                  day,
                  meals.find((m) => m.id === e.target.value)
                )
              }
            >
              <option value="">Add a meal...</option>
              {meals.map((meal) => (
                <option key={meal.id} value={meal.id}>
                  {meal.name}
                </option>
              ))}
            </select>
          )}
        </div>
      ))}
    </div>
  );
}
