import React, { useEffect, useState } from 'react';
import { api } from '../api/client';
import { Filter, ChevronDown, MapPin, Check } from 'lucide-react';

const VENUES = [

    "Boat Club",
    "COEP Main Ground",
    "Hostel Ground",
    "Meta Canteen",
    "North Campus",
    "South Campus"
];

const SportFilter = ({ selectedSport, onSelectSport, onSearchVenue, selectedVenue }) => {
    const [sports, setSports] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const loadSports = async () => {
            const data = await api.getSports();
            // Sort sports alphabetically
            const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
            setSports(sorted);
        };
        loadSports();
    }, []);

    const handleSportSelect = (sportName) => {
        onSelectSport(sportName);
        setIsOpen(false);
    };

    const handleVenueSelect = (venueName) => {
        // Toggle venue: if already selected, clear it
        const newVenue = selectedVenue === venueName ? '' : venueName;
        onSearchVenue(newVenue);
        setIsOpen(false);
    };

    const getLabel = () => {
        if (selectedSport && selectedVenue) return `${selectedSport} • ${selectedVenue}`;
        if (selectedSport) return selectedSport;
        if (selectedVenue) return selectedVenue;
        return 'Filter Sports & Venue';
    };

    return (
        <div className="mb-6">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between bg-white/5 border border-white/10 p-3 rounded-lg text-sm font-bold text-white uppercase tracking-wider hover:bg-white/10 transition-all"
                >
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-orange-400" />
                        <span className="truncate max-w-[250px]">{getLabel()}</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-white/10 rounded-lg shadow-2xl z-50 max-h-[80vh] overflow-y-auto custom-scrollbar">

                        {/* VENUES SECTION */}
                        <div className="p-2 border-b border-white/10">
                            <h4 className="text-[10px] uppercase font-black text-gray-500 tracking-widest px-2 mb-2">Select Venue</h4>
                            <div className="flex flex-col gap-1">
                                {VENUES.map(venue => (
                                    <button
                                        key={venue}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleVenueSelect(venue);
                                        }}
                                        className={`w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white/5 transition-colors rounded flex items-center justify-between ${selectedVenue === venue ? 'bg-orange-500 text-white' : 'text-gray-400'}`}
                                    >
                                        <span className="truncate">{venue}</span>
                                        {selectedVenue === venue && <Check size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* SPORTS SECTION */}
                        <div className="p-2">
                            <h4 className="text-[10px] uppercase font-black text-gray-500 tracking-widest px-2 mb-2 mt-2">Select Sport</h4>
                            <button
                                onClick={() => handleSportSelect('')}
                                className={`w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white/5 transition-colors rounded ${selectedSport === '' ? 'text-orange-400 bg-white/5' : 'text-gray-400'}`}
                            >
                                All Sports
                            </button>
                            {sports.map(sport => (
                                <button
                                    key={sport.id}
                                    onClick={() => handleSportSelect(sport.name)}
                                    className={`w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-white/5 transition-colors rounded ${selectedSport === sport.name ? 'text-orange-400 bg-white/5' : 'text-gray-400'}`}
                                >
                                    {sport.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SportFilter;
