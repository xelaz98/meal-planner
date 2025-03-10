import React from "react";

export default function WeeklyPlan({ meals, weeklyPlan, onAddToPlan }) {
  const days = Object.keys(weeklyPlan);

  return (
    <div className="card">
      <h2 className="text-center">Weekly Plan</h2>
      {days.map((day) => (
        <div key={day} className="form-group">
          <h3 className="text-blue">{day}</h3>
          <ul>
            {weeklyPlan[day].length > 0 ? (
              weeklyPlan[day].map((meal) => <li key={meal.id}>{meal.name}</li>)
            ) : (
              <p>No meals planned for {day}.</p>
            )}
          </ul>
          {meals.length > 0 && (
            <select
              onChange={(e) => {
                const meal = meals.find((m) => m.id === e.target.value);
                if (meal) onAddToPlan(day, meal);
              }}
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
