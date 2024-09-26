"use client"
import React, { createContext, useContext, useState } from 'react';
import {DateRange} from "react-day-picker";

interface TravellersType {
    adults: number;
    children: number;
}

interface SearchContextType {
    travellers: TravellersType | null;
    dateRange: DateRange | null;
    location: { id: string; name: string } | null;
    setTravellers: (travellers: TravellersType) => void; // Updated type
    setDateRange: (dateRange: DateRange | null) => void;
    setLocation: (location: { id: string; name: string }) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearchContext must be used within a SearchProvider');
    }
    return context;
};

export const SearchProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [location, setLocation] = useState<{ id: string; name: string } | null>(null);
    const [dateRange, setDateRange] = useState<DateRange | null>(null);
    const [travellers, setTravellers] = useState<TravellersType | null>(null);

    const search = () => {
        // Implement your search logic here
        console.log('Searching with:', { location, dateRange, travellers });
    };

    return (
        <SearchContext.Provider value={{ location, dateRange, travellers, setLocation, setDateRange, setTravellers }}>
            {children}
        </SearchContext.Provider>
    );
};
