"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SelectDefault from '@/components/atoms/SelectDefault';
import Input2 from '@/components/atoms/Input2';
import Button from '@/components/atoms/Button';

const FitnessDashboard = () => {
  // State for the entire application
  const [data, setData] = useState(() => {
    const defaultData = {
      exercises: [],
      meals: [],
      bodyMeasurements: [],
      sleepRecords: [],
      waterIntakes: [],
      goals: [],
      journalEntries: [],
      settings: {
        darkMode: false,
        notifications: true,
        waterTarget: 8,
        sleepTarget: 8
      }
    };
    const savedData = localStorage.getItem('fitnessDashboardData');
    return savedData ? JSON.parse(savedData) : defaultData;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(data.settings.darkMode);
  const [restTime, setRestTime] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(null);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('fitnessDashboardData', JSON.stringify(data));
  }, [data]);

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        darkMode
      }
    }));
  }, [darkMode]);

  // Rest timer logic
  const startRestTimer = (seconds) => {
    setIsResting(true);
    setRestTime(seconds);
    
    const timer = setInterval(() => {
      setRestTime(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsResting(false);
          alert('Rest time is over! Time for your next set!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    setRestTimer(timer);
  };

  const cancelRestTimer = () => {
    if (restTimer) {
      clearInterval(restTimer);
      setRestTimer(null);
    }
    setIsResting(false);
    setRestTime(0);
  };

  // Exercise CRUD operations
  const addExercise = useCallback((exercise) => {
    const newExercise = {
      ...exercise,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setData(prev => ({
      ...prev,
      exercises: [...prev.exercises, newExercise]
    }));
  }, []);

  const deleteExercise = useCallback((id) => {
    setData(prev => ({
      ...prev,
      exercises: prev.exercises.filter(ex => ex.id !== id)
    }));
  }, []);

  // Nutrition CRUD operations
  const addMeal = useCallback((meal) => {
    const newMeal = {
      ...meal,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setData(prev => ({
      ...prev,
      meals: [...prev.meals, newMeal]
    }));
  }, []);

  const deleteMeal = useCallback((id) => {
    setData(prev => ({
      ...prev,
      meals: prev.meals.filter(meal => meal.id !== id)
    }));
  }, []);

  // Body measurements CRUD operations
  const addBodyMeasurement = useCallback((measurement) => {
    const newMeasurement = {
      ...measurement,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setData(prev => ({
      ...prev,
      bodyMeasurements: [...prev.bodyMeasurements, newMeasurement]
    }));
  }, []);

  // Sleep records CRUD operations
  const addSleepRecord = useCallback((record) => {
    const newRecord = {
      ...record,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setData(prev => ({
      ...prev,
      sleepRecords: [...prev.sleepRecords, newRecord]
    }));
  }, []);

  // Water intake CRUD operations
  const addWaterIntake = useCallback((intake) => {
    const newIntake = {
      ...intake,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setData(prev => ({
      ...prev,
      waterIntakes: [...prev.waterIntakes, newIntake]
    }));
  }, []);

  // Goals CRUD operations
  const addGoal = useCallback((goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString()
    };
    setData(prev => ({
      ...prev,
      goals: [...prev.goals, newGoal]
    }));
  }, []);

  const completeGoal = useCallback((id) => {
    setData(prev => ({
      ...prev,
      goals: prev.goals.map(goal => 
        goal.id === id ? { ...goal, completed: !goal.completed } : goal
      )
    }));
  }, []);

  // Journal entries CRUD operations
  const addJournalEntry = useCallback((entry) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setData(prev => ({
      ...prev,
      journalEntries: [...prev.journalEntries, newEntry]
    }));
  }, []);

  // Calculate today's nutrition totals
  const todaysNutrition = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    const todaysMeals = data.meals.filter(meal => meal.date === today);
    
    return todaysMeals.reduce((acc, meal) => {
      acc.calories += meal.calories;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
  }, [data.meals]);

  // Calculate weekly averages for charts
  const weeklyData = useCallback(() => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    const lastWeekExercises = data.exercises.filter(ex => {
      const exDate = new Date(ex.date);
      return exDate >= weekAgo && exDate <= now;
    });
    
    const lastWeekMeasurements = data.bodyMeasurements.filter(m => {
      const mDate = new Date(m.date);
      return mDate >= weekAgo && mDate <= now;
    });
    
    const lastWeekSleep = data.sleepRecords.filter(s => {
      const sDate = new Date(s.date);
      return sDate >= weekAgo && sDate <= now;
    });
    
    const lastWeekWater = data.waterIntakes.filter(w => {
      const wDate = new Date(w.date);
      return wDate >= weekAgo && wDate <= now;
    });
    
    // Group by day
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = days.map(day => ({
      name: day,
      exercises: 0,
      weight: 0,
      sleep: 0,
      water: 0,
      calories: 0
    }));
    
    lastWeekExercises.forEach(ex => {
      const day = new Date(ex.date).getDay();
      result[day].exercises += 1;
    });
    
    lastWeekMeasurements.forEach(m => {
      const day = new Date(m.date).getDay();
      result[day].weight = m.weight;
    });
    
    lastWeekSleep.forEach(s => {
      const day = new Date(s.date).getDay();
      result[day].sleep = s.hours;
    });
    
    lastWeekWater.forEach(w => {
      const day = new Date(w.date).getDay();
      result[day].water = w.cups;
    });
    
    // For calories, we need to filter meals for each day
    const lastWeekMeals = data.meals.filter(m => {
      const mDate = new Date(m.date);
      return mDate >= weekAgo && mDate <= now;
    });
    
    lastWeekMeals.forEach(m => {
      const day = new Date(m.date).getDay();
      result[day].calories += m.calories;
    });
    
    return result;
  }, [data]);

  // Get latest body measurement
  const latestMeasurement = useCallback(() => {
    if (data.bodyMeasurements.length === 0) return null;
    
    const sorted = [...data.bodyMeasurements].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    return sorted[0];
  }, [data.bodyMeasurements]);

  // Calculate BMR and TDEE
  const calculateUserTDEE = useCallback(() => {
    const measurement = latestMeasurement();
    if (!measurement) return { bmr: 0, tdee: 0 };
    
    // For demo, using male and age 30 as defaults
    const bmr = calculateBMR('male', measurement.weight, measurement.height, 30);
    const tdee = calculateTDEE(bmr, 'moderate');
    
    return { bmr, tdee };
  }, [latestMeasurement]);

  // Utility functions
  const calculateBMR = (gender, weight, height, age) => {
    if (gender === 'male') {
      return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
  };

  const calculateTDEE = (bmr, activityLevel) => {
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };
    return bmr * multipliers[activityLevel];
  };

  // Dashboard Component
  const Dashboard = () => {
    const nutrition = todaysNutrition();
    const weekly = weeklyData();
    const measurement = latestMeasurement();
    const { bmr, tdee } = calculateUserTDEE();
    
    return (
      <div className="space-y-6">
        {/* Rest Timer Notification */}
        {isResting && (
          <div className="fixed top-4 right-4 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">Rest Timer</h3>
                <p>{Math.floor(restTime / 60)}:{String(restTime % 60).padStart(2, '0')}</p>
              </div>
              <Button 
                color="red" 
                label="Cancel" 
                onClick={cancelRestTimer} 
                cn="ml-4"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">Today's Nutrition</h3>
            <div className="space-y-1">
              <p>Calories: {nutrition.calories} / {Math.round(tdee)}</p>
              <p>Protein: {nutrition.protein}g</p>
              <p>Carbs: {nutrition.carbs}g</p>
              <p>Fat: {nutrition.fat}g</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">Body Stats</h3>
            {measurement ? (
              <div className="space-y-1">
                <p>Weight: {measurement.weight} kg</p>
                <p>Height: {measurement.height} cm</p>
                {measurement.bodyFat && <p>Body Fat: {measurement.bodyFat}%</p>}
              </div>
            ) : (
              <p>No measurements recorded</p>
            )}
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">Metabolism</h3>
            <div className="space-y-1">
              <p>BMR: {Math.round(bmr)} kcal</p>
              <p>TDEE: {Math.round(tdee)} kcal</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Weekly Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="exercises" stroke="#8884d8" name="Exercises" />
                <Line type="monotone" dataKey="weight" stroke="#82ca9d" name="Weight (kg)" />
                <Line type="monotone" dataKey="sleep" stroke="#ffc658" name="Sleep (hrs)" />
                <Line type="monotone" dataKey="water" stroke="#0088FE" name="Water (cups)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">Recent Exercises</h3>
            {data.exercises.slice(0, 3).map(ex => (
              <div key={ex.id} className="mb-2 p-2 border-b">
                <p className="font-medium">{ex.name}</p>
                <p className="text-sm">{ex.sets}x{ex.reps} @ {ex.weight}kg</p>
              </div>
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-2">Recent Meals</h3>
            {data.meals.slice(0, 3).map(meal => (
              <div key={meal.id} className="mb-2 p-2 border-b">
                <p className="font-medium">{meal.name}</p>
                <p className="text-sm">{meal.calories} kcal</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Exercises Component
  const Exercises = () => {
    const [newExercise, setNewExercise] = useState({
      name: '',
      category: 'Push',
      sets: 3,
      reps: 10,
      weight: 0,
      notes: '',
      restTime: 60 // Default rest time in seconds
    });
    
    const handleAddExercise = () => {
      if (!newExercise.name) return;
      addExercise(newExercise);
      setNewExercise({
        name: '',
        category: 'Push',
        sets: 3,
        reps: 10,
        weight: 0,
        notes: '',
        restTime: 60
      });
    };
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Add New Exercise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Exercise Name</label>
              <Input2
                type="text"
                value={newExercise.name}
                onChange={(e) => setNewExercise({...newExercise, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Category</label>
              <SelectDefault
                value={newExercise.category}
                onChange={(e) => setNewExercise({...newExercise, category: e.target.value})}
                options={[
                  { value: 'Push', label: 'Push' },
                  { value: 'Pull', label: 'Pull' },
                  { value: 'Legs', label: 'Legs' },
                  { value: 'Cardio', label: 'Cardio' },
                  { value: 'Core', label: 'Core' },
                  { value: 'Full Body', label: 'Full Body' }
                ]}
              />
            </div>
            
            <div>
              <label className="block mb-2">Sets</label>
              <Input2
                type="number"
                value={newExercise.sets}
                onChange={(e) => setNewExercise({...newExercise, sets: parseInt(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Reps</label>
              <Input2
                type="number"
                value={newExercise.reps}
                onChange={(e) => setNewExercise({...newExercise, reps: parseInt(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Weight (kg)</label>
              <Input2
                type="number"
                value={newExercise.weight}
                onChange={(e) => setNewExercise({...newExercise, weight: parseFloat(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Rest Time (sec)</label>
              <Input2
                type="number"
                value={newExercise.restTime}
                onChange={(e) => setNewExercise({...newExercise, restTime: parseInt(e.target.value) || 60})}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2">Notes</label>
              <textarea
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                value={newExercise.notes}
                onChange={(e) => setNewExercise({...newExercise, notes: e.target.value})}
              />
            </div>
          </div>
          
          <Button
            cn="mt-4"
            color="blue"
            label="Add Exercise"
            onClick={handleAddExercise}
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Exercise History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Exercise</th>
                  <th className="text-left p-2">Category</th>
                  <th className="text-left p-2">Sets x Reps</th>
                  <th className="text-left p-2">Weight</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.exercises.map(ex => (
                  <tr key={ex.id} className="border-t">
                    <td className="p-2">{ex.date}</td>
                    <td className="p-2 font-medium">{ex.name}</td>
                    <td className="p-2">{ex.category}</td>
                    <td className="p-2">{ex.sets}x{ex.reps}</td>
                    <td className="p-2">{ex.weight}kg</td>
                    <td className="p-2 space-x-2">
                      <Button
                        color="blue"
                        label="Start Rest"
                        onClick={() => startRestTimer(ex.restTime || 60)}
                        cn="text-sm px-2 py-1"
                      />
                      <Button
                        color="red"
                        label="Delete"
                        onClick={() => deleteExercise(ex.id)}
                        cn="text-sm px-2 py-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Nutrition Component
  const Nutrition = () => {
    const [newMeal, setNewMeal] = useState({
      name: '',
      type: 'Breakfast',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
    
    const handleAddMeal = () => {
      if (!newMeal.name) return;
      addMeal(newMeal);
      setNewMeal({
        name: '',
        type: 'Breakfast',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      });
    };
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Add New Meal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Meal Name</label>
              <Input2
                type="text"
                value={newMeal.name}
                onChange={(e) => setNewMeal({...newMeal, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Meal Type</label>
              <SelectDefault
                value={newMeal.type}
                onChange={(e) => setNewMeal({...newMeal, type: e.target.value})}
                options={[
                  { value: 'Breakfast', label: 'Breakfast' },
                  { value: 'Snack', label: 'Snack' },
                  { value: 'Lunch', label: 'Lunch' },
                  { value: 'Dinner', label: 'Dinner' }
                ]}
              />
            </div>
            
            <div>
              <label className="block mb-2">Calories</label>
              <Input2
                type="number"
                value={newMeal.calories}
                onChange={(e) => setNewMeal({...newMeal, calories: parseInt(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Protein (g)</label>
              <Input2
                type="number"
                value={newMeal.protein}
                onChange={(e) => setNewMeal({...newMeal, protein: parseInt(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Carbs (g)</label>
              <Input2
                type="number"
                value={newMeal.carbs}
                onChange={(e) => setNewMeal({...newMeal, carbs: parseInt(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Fat (g)</label>
              <Input2
                type="number"
                value={newMeal.fat}
                onChange={(e) => setNewMeal({...newMeal, fat: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>
          
          <Button
            cn="mt-4"
            color="blue"
            label="Add Meal"
            onClick={handleAddMeal}
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Today's Nutrition</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Meal</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Calories</th>
                  <th className="text-left p-2">Protein</th>
                  <th className="text-left p-2">Carbs</th>
                  <th className="text-left p-2">Fat</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.meals.filter(m => m.date === new Date().toISOString().split('T')[0]).map(meal => (
                  <tr key={meal.id} className="border-t">
                    <td className="p-2 font-medium">{meal.name}</td>
                    <td className="p-2">{meal.type}</td>
                    <td className="p-2">{meal.calories}</td>
                    <td className="p-2">{meal.protein}g</td>
                    <td className="p-2">{meal.carbs}g</td>
                    <td className="p-2">{meal.fat}g</td>
                    <td className="p-2">
                      <Button
                        color="red"
                        label="Delete"
                        onClick={() => deleteMeal(meal.id)}
                        cn="text-sm px-2 py-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Nutrition Summary</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[todaysNutrition()]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="protein" fill="#8884d8" name="Protein (g)" />
                <Bar dataKey="carbs" fill="#82ca9d" name="Carbs (g)" />
                <Bar dataKey="fat" fill="#ffc658" name="Fat (g)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // Progress Tracker Component
  const ProgressTracker = () => {
    const [newMeasurement, setNewMeasurement] = useState({
      weight: 0,
      height: 0,
      bodyFat: undefined,
      muscleMass: undefined,
      waist: undefined,
      hips: undefined,
      chest: undefined,
      arms: undefined,
      thighs: undefined
    });
    
    const handleAddMeasurement = () => {
      if (!newMeasurement.weight || !newMeasurement.height) return;
      addBodyMeasurement(newMeasurement);
      setNewMeasurement({
        weight: 0,
        height: 0,
        bodyFat: undefined,
        muscleMass: undefined,
        waist: undefined,
        hips: undefined,
        chest: undefined,
        arms: undefined,
        thighs: undefined
      });
    };
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Add Body Measurement</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2">Weight (kg)</label>
              <Input2
                type="number"
                value={newMeasurement.weight || ''}
                onChange={(e) => setNewMeasurement({...newMeasurement, weight: parseFloat(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Height (cm)</label>
              <Input2
                type="number"
                value={newMeasurement.height || ''}
                onChange={(e) => setNewMeasurement({...newMeasurement, height: parseFloat(e.target.value) || 0})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Body Fat (%)</label>
              <Input2
                type="number"
                value={newMeasurement.bodyFat || ''}
                onChange={(e) => setNewMeasurement({...newMeasurement, bodyFat: parseFloat(e.target.value) || undefined})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Muscle Mass (kg)</label>
              <Input2
                type="number"
                value={newMeasurement.muscleMass || ''}
                onChange={(e) => setNewMeasurement({...newMeasurement, muscleMass: parseFloat(e.target.value) || undefined})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Waist (cm)</label>
              <Input2
                type="number"
                value={newMeasurement.waist || ''}
                onChange={(e) => setNewMeasurement({...newMeasurement, waist: parseFloat(e.target.value) || undefined})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Hips (cm)</label>
              <Input2
                type="number"
                value={newMeasurement.hips || ''}
                onChange={(e) => setNewMeasurement({...newMeasurement, hips: parseFloat(e.target.value) || undefined})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Chest (cm)</label>
              <Input2
                type="number"
                value={newMeasurement.chest || ''}
                onChange={(e) => setNewMeasurement({...newMeasurement, chest: parseFloat(e.target.value) || undefined})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Arms (cm)</label>
              <Input2
                type="number"
                value={newMeasurement.arms || ''}
                onChange={(e) => setNewMeasurement({...newMeasurement, arms: parseFloat(e.target.value) || undefined})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Thighs (cm)</label>
              <Input2
                type="number"
                value={newMeasurement.thighs || ''}
                onChange={(e) => setNewMeasurement({...newMeasurement, thighs: parseFloat(e.target.value) || undefined})}
              />
            </div>
          </div>
          
          <Button
            cn="mt-4"
            color="blue"
            label="Add Measurement"
            onClick={handleAddMeasurement}
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Body Measurements History</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Weight</th>
                  <th className="text-left p-2">Height</th>
                  <th className="text-left p-2">Body Fat</th>
                  <th className="text-left p-2">Muscle Mass</th>
                </tr>
              </thead>
              <tbody>
                {data.bodyMeasurements.map(m => (
                  <tr key={m.id} className="border-t">
                    <td className="p-2">{m.date}</td>
                    <td className="p-2">{m.weight} kg</td>
                    <td className="p-2">{m.height} cm</td>
                    <td className="p-2">{m.bodyFat || '-'}%</td>
                    <td className="p-2">{m.muscleMass || '-'} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Weight Progress</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.bodyMeasurements.map(m => ({
                  date: m.date,
                  weight: m.weight,
                  bodyFat: m.bodyFat
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (kg)" />
                <Line yAxisId="right" type="monotone" dataKey="bodyFat" stroke="#82ca9d" name="Body Fat (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // Goals Component
  const Goals = () => {
    const [newGoal, setNewGoal] = useState({
      title: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      completed: false,
      category: 'Exercise'
    });
    
    const handleAddGoal = () => {
      if (!newGoal.title) return;
      addGoal(newGoal);
      setNewGoal({
        title: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        completed: false,
        category: 'Exercise'
      });
    };
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Add New Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Goal Title</label>
              <Input2
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block mb-2">Category</label>
              <SelectDefault
                value={newGoal.category}
                onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
                options={[
                  { value: 'Exercise', label: 'Exercise' },
                  { value: 'Nutrition', label: 'Nutrition' },
                  { value: 'Body', label: 'Body' },
                  { value: 'Sleep', label: 'Sleep' },
                  { value: 'Other', label: 'Other' }
                ]}
              />
            </div>
            
            <div>
              <label className="block mb-2">Start Date</label>
              <Input2
                type="date"
                value={newGoal.startDate}
                onChange={(e) => setNewGoal({...newGoal, startDate: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block mb-2">End Date</label>
              <Input2
                type="date"
                value={newGoal.endDate}
                onChange={(e) => setNewGoal({...newGoal, endDate: e.target.value})}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2">Description</label>
              <textarea
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
              />
            </div>
          </div>
          
          <Button
            cn="mt-4"
            color="blue"
            label="Add Goal"
            onClick={handleAddGoal}
          />
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Current Goals</h3>
          <div className="space-y-4">
            {data.goals.filter(g => !g.completed).map(goal => (
              <div key={goal.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{goal.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{goal.category}</p>
                    <p className="text-sm">
                      {goal.startDate} to {goal.endDate}
                    </p>
                    <p className="mt-2">{goal.description}</p>
                  </div>
                  <Button
                    color="green"
                    label="Complete"
                    onClick={() => completeGoal(goal.id)}
                    cn="text-sm px-3 py-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Completed Goals</h3>
          <div className="space-y-4">
            {data.goals.filter(g => g.completed).map(goal => (
              <div key={goal.id} className="border p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{goal.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{goal.category}</p>
                    <p className="text-sm">
                      {goal.startDate} to {goal.endDate}
                    </p>
                    <p className="mt-2">{goal.description}</p>
                  </div>
                  <Button
                    color="gray"
                    label="Undo"
                    onClick={() => completeGoal(goal.id)}
                    cn="text-sm px-3 py-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Sleep & Water Component
  const SleepWaterTracker = () => {
    const [newSleepRecord, setNewSleepRecord] = useState({
      hours: 0,
      quality: 'Good',
      notes: ''
    });
    
    const [waterCups, setWaterCups] = useState(0);
    
    const handleAddSleepRecord = () => {
      if (!newSleepRecord.hours) return;
      addSleepRecord(newSleepRecord);
      setNewSleepRecord({
        hours: 0,
        quality: 'Good',
        notes: ''
      });
    };
    
    const handleAddWaterIntake = () => {
      if (!waterCups) return;
      addWaterIntake({ cups: waterCups });
      setWaterCups(0);
    };
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-4">Sleep Tracker</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Hours Slept</label>
                <Input2
                  type="number"
                  value={newSleepRecord.hours || ''}
                  onChange={(e) => setNewSleepRecord({...newSleepRecord, hours: parseFloat(e.target.value) || 0})}
                />
              </div>
              
              <div>
                <label className="block mb-2">Sleep Quality</label>
                <SelectDefault
                  value={newSleepRecord.quality}
                  onChange={(e) => setNewSleepRecord({...newSleepRecord, quality: e.target.value})}
                  options={[
                    { value: 'Excellent', label: 'Excellent' },
                    { value: 'Good', label: 'Good' },
                    { value: 'Fair', label: 'Fair' },
                    { value: 'Poor', label: 'Poor' }
                  ]}
                />
              </div>
              
              <div>
                <label className="block mb-2">Notes</label>
                <textarea
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  value={newSleepRecord.notes}
                  onChange={(e) => setNewSleepRecord({...newSleepRecord, notes: e.target.value})}
                />
              </div>
              
              <Button
                color="blue"
                label="Add Sleep Record"
                onClick={handleAddSleepRecord}
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-4">Water Tracker</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Cups of Water Today</label>
                <Input2
                  type="number"
                  value={waterCups || ''}
                  onChange={(e) => setWaterCups(parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="flex items-center">
                <div className="w-1/2">
                  <p>Today's Intake: {data.waterIntakes.find(w => w.date === new Date().toISOString().split('T')[0])?.cups || 0} cups</p>
                  <p>Target: {data.settings.waterTarget} cups</p>
                </div>
                <div className="w-1/2 flex justify-end">
                  <Button
                    color="blue"
                    label="Add Water Intake"
                    onClick={handleAddWaterIntake}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Sleep History</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data.sleepRecords.map(s => ({
                  date: s.date,
                  hours: s.hours,
                  quality: s.quality
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="hours" stroke="#8884d8" name="Hours" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

  // Tools Component
  const Tools = () => {
    const [gender, setGender] = useState('male');
    const [weight, setWeight] = useState(70);
    const [height, setHeight] = useState(175);
    const [age, setAge] = useState(30);
    const [activityLevel, setActivityLevel] = useState('moderate');
    
    const bmr = calculateBMR(gender, weight, height, age);
    const tdee = calculateTDEE(bmr, activityLevel);
    
    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">BMR & TDEE Calculator</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Gender</label>
              <SelectDefault
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' }
                ]}
              />
            </div>
            
            <div>
              <label className="block mb-2">Weight (kg)</label>
              <Input2
                type="number"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div>
              <label className="block mb-2">Height (cm)</label>
              <Input2
                type="number"
                value={height}
                onChange={(e) => setHeight(parseFloat(e.target.value) || 0)}
              />
            </div>
            
            <div>
              <label className="block mb-2">Age</label>
              <Input2
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 0)}
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block mb-2">Activity Level</label>
              <SelectDefault
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                options={[
                  { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
                  { value: 'light', label: 'Lightly active (light exercise 1-3 days/week)' },
                  { value: 'moderate', label: 'Moderately active (moderate exercise 3-5 days/week)' },
                  { value: 'active', label: 'Very active (hard exercise 6-7 days/week)' },
                  { value: 'veryActive', label: 'Extra active (very hard exercise & physical job)' }
                ]}
              />
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <h4 className="font-bold mb-2">Results</h4>
            <p>BMR (Basal Metabolic Rate): <span className="font-bold">{Math.round(bmr)} kcal/day</span></p>
            <p>TDEE (Total Daily Energy Expenditure): <span className="font-bold">{Math.round(tdee)} kcal/day</span></p>
            
            <div className="mt-4">
              <h5 className="font-bold mb-2">Calorie Needs Based on Goals:</h5>
              <p>Weight Loss (0.5kg/week): <span className="font-bold">{Math.round(tdee - 500)} kcal/day</span></p>
              <p>Weight Maintenance: <span className="font-bold">{Math.round(tdee)} kcal/day</span></p>
              <p>Weight Gain (0.5kg/week): <span className="font-bold">{Math.round(tdee + 500)} kcal/day</span></p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-bold text-lg mb-4">Macronutrient Calculator</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <h4 className="font-bold mb-2">Moderate Carb</h4>
              <p>Protein: {Math.round(tdee * 0.3 / 4)}g (30%)</p>
              <p>Carbs: {Math.round(tdee * 0.4 / 4)}g (40%)</p>
              <p>Fat: {Math.round(tdee * 0.3 / 9)}g (30%)</p>
            </div>
            
            <div className="p-4 bg-green-100 dark:bg-green-900 rounded-lg">
              <h4 className="font-bold mb-2">High Protein</h4>
              <p>Protein: {Math.round(tdee * 0.4 / 4)}g (40%)</p>
              <p>Carbs: {Math.round(tdee * 0.3 / 4)}g (30%)</p>
              <p>Fat: {Math.round(tdee * 0.3 / 9)}g (30%)</p>
            </div>
            
            <div className="p-4 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <h4 className="font-bold mb-2">Low Carb</h4>
              <p>Protein: {Math.round(tdee * 0.4 / 4)}g (40%)</p>
              <p>Carbs: {Math.round(tdee * 0.1 / 4)}g (10%)</p>
              <p>Fat: {Math.round(tdee * 0.5 / 9)}g (50%)</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render the app
  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Fitness Dashboard</h1>
          <Button
            onClick={() => setDarkMode(!darkMode)}
            label={darkMode ? '☀️' : '🌙'}
            cn="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          />
        </header>
        
        <nav className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              cn={`px-4 py-2 rounded ${activeTab === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              label="Dashboard"
              onClick={() => setActiveTab('dashboard')}
            />
            <Button
              cn={`px-4 py-2 rounded ${activeTab === 'exercises' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              label="Exercises"
              onClick={() => setActiveTab('exercises')}
            />
            <Button
              cn={`px-4 py-2 rounded ${activeTab === 'nutrition' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              label="Nutrition"
              onClick={() => setActiveTab('nutrition')}
            />
            <Button
              cn={`px-4 py-2 rounded ${activeTab === 'progress' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              label="Progress"
              onClick={() => setActiveTab('progress')}
            />
            <Button
              cn={`px-4 py-2 rounded ${activeTab === 'goals' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              label="Goals"
              onClick={() => setActiveTab('goals')}
            />
            <Button
              cn={`px-4 py-2 rounded ${activeTab === 'sleep' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              label="Sleep & Water"
              onClick={() => setActiveTab('sleep')}
            />
            <Button
              cn={`px-4 py-2 rounded ${activeTab === 'tools' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
              label="Tools"
              onClick={() => setActiveTab('tools')}
            />
          </div>
        </nav>
        
        <main>
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'exercises' && <Exercises />}
          {activeTab === 'nutrition' && <Nutrition />}
          {activeTab === 'progress' && <ProgressTracker />}
          {activeTab === 'goals' && <Goals />}
          {activeTab === 'sleep' && <SleepWaterTracker />}
          {activeTab === 'tools' && <Tools />}
        </main>
      </div>
    </div>
  );
};

export default FitnessDashboard;