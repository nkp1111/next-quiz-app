"use client";

import React, { createContext, useContext, useState, useEffect } from 'react'
import getCountryData from "@/lib/getCountryData"

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [countryData, setCountryData] = useState([]);
  useEffect(() => {
    getCountryData().then(data => {
      setCountryData(data);
    })
  }, []);

  return (
    <AppContext.Provider
      value={{
        score,
        setScore,
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext);
