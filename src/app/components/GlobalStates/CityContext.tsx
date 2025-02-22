"use client";

import React, { createContext, useContext, useState } from "react";

interface CityContaxtType {
  city: string;
  setCity: (city: string) => void;
}

export const cityContaxt = createContext<CityContaxtType | undefined>(
  undefined
);

export default function CityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [city, setCity] = useState("المكلا اليمن");
  return (
    <cityContaxt.Provider value={{ city, setCity }}>
      {children}
    </cityContaxt.Provider>
  );
}

export const useCity = () => {
  const context = useContext(cityContaxt);
  if (!context) throw new Error("useCity must be inside a cityProvider");
  return context;
};
