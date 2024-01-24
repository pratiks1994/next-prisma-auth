"use client";

import { createContext, useContext, useState } from "react";
const filterContext = createContext();

function FilterContextProvider({ children }) {
    const [search, setSearch] = useState("");

    const value = { search, setSearch };

    return <filterContext.Provider value={value}>{children}</filterContext.Provider>;
}

export default FilterContextProvider;

export const useFilterContext = () => useContext(filterContext);
