import React from "react";

export default function WeeklyPlan({
  meals,
  weeklyPlan,
  onAddToPlan,
  onRemoveFromPlan,
}) {
  const days = Object.keys(weeklyPlan);

  return (
    <div className="card">
      <h2 className="text-center">Weekly Plan</h2>
      {days.map((day) => (
        <div key={day} className="form-group">
          <h3 className="text-blue">{day}</h3>
          <ul>
            {weeklyPlan[day].length > 0 ? (
              weeklyPlan[day].map((meal) => (
                <li key={meal.id} className="flex justify-between items-center">
                  <span>{meal.name}</span>
                  <button
                    onClick={() => onRemoveFromPlan(day, meal.id)}
                    className="btn-delete"
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <p>No meals planned for {day}.</p>
            )}
          </ul>
          {meals.length > 0 && (
            <select
              onChange={(e) => {
                const meal = meals.find((m) => m.id === e.target.value);
                if (meal) onAddToPlan(day, meal);
                e.target.value = ""; // Изчистване на избора след добавяне
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
