import React from 'react';
import { topoData } from '../topoData';
import type { TopoLocation } from '../topoData';
import { motion } from 'framer-motion';
import { playClickSound } from '../utils/sounds';

interface MapProps {
  onLocationClick: (location: TopoLocation) => void;
  highlightedId?: string;
  correctIds: string[];
  wrongId?: string;
}

const Map: React.FC<MapProps> = ({ onLocationClick, correctIds, wrongId }) => {
  // Posities zijn in percentages (%) ten opzichte van de afbeelding
  // Gekalibreerd op de uitgeknipte kaart foto
  
  // Provincies - posities gekalibreerd op de foto (in %)
  const provinces = [
    { 
      id: 'groningen-prov', 
      label: 'A',
      // Groningen rechtsboven - label A met streep - naar links
      center: { x: 70, y: 19 }
    },
    { 
      id: 'friesland-prov', 
      label: 'B',
      // Friesland midden - label B met streep
      center: { x: 51, y: 31 }
    },
    { 
      id: 'drenthe-prov', 
      label: 'C',
      // Drenthe rechts - label C met streep
      center: { x: 77, y: 47 }
    },
    { 
      id: 'flevoland-prov', 
      label: 'D',
      // Flevoland linksonder - label D met streep
      center: { x: 40, y: 61 }
    },
  ];

  // Waddeneilanden van west naar oost
  const islands = [
    { id: 'texel', label: 'b', x: 11, y: 28 },            // Texel - naar beneden
    { id: 'vlieland', label: 'c', x: 21, y: 19 },         // Vlieland - naar beneden
    { id: 'terschelling', label: 'd', x: 34, y: 11 },     // Terschelling - langer eiland
    { id: 'ameland', label: 'e', x: 50, y: 10 },          // Ameland - midden
    { id: 'schiermonnikoog', label: 'f', x: 61, y: 10 },  // Schiermonnikoog - bij III
    { id: 'oostvaardersplassen', label: 'a', x: 27, y: 65 }, // a - naar links
  ];

  // Steden - exacte posities van de stippen in de tekening
  const cities = [
    { id: 'groningen-city', label: '1', x: 81, y: 21 },   // Stip 1 in provincie A
    { id: 'leeuwarden', label: '2', x: 46, y: 23 },       // Stip 2 boven in B
    { id: 'assen', label: '3', x: 75, y: 33 },            // Stip 3 - naar rechts
    { id: 'lelystad', label: '4', x: 36, y: 60 },         // Stip 4 in D - naar beneden
    { id: 'almere', label: '5', x: 24, y: 75 },           // Stip 5 - naar links
    { id: 'sneek', label: '6', x: 37, y: 33 },            // Stip 6 west in B
    { id: 'heerenveen', label: '7', x: 49, y: 37 },       // Stip 7 midden in B
    { id: 'delfzijl', label: '8', x: 82, y: 15 },         // Stip 8 - meer naar links
    { id: 'emmen', label: '9', x: 87, y: 51 },            // Stip 9 zuidoost in C
  ];

  // Wateren - labels precies op de tekst
  const waters = [
    { id: 'ijsselmeer', label: 'I', x: 25, y: 41 },       // I links met golfteken
    { id: 'noordzee', label: 'II', x: 7, y: 17 },         // II - naar beneden
    { id: 'waddenzee', label: 'III', x: 68, y: 10 },      // III rechtsboven - naar beneden
  ];

  const handleClick = (id: string) => {
    playClickSound();
    const location = topoData.find(l => l.id === id);
    if (location) onLocationClick(location);
  };

  const getMarkerStyle = (id: string) => {
    if (correctIds.includes(id)) return 'bg-green-500 border-green-700 shadow-green-300';
    if (wrongId === id) return 'bg-red-500 border-red-700 shadow-red-300 animate-pulse';
    return 'bg-white border-slate-400 hover:bg-blue-100 hover:border-blue-500';
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto rounded-2xl shadow-2xl overflow-hidden border-4 border-slate-800">
      {/* De kaart foto als achtergrond */}
      <img 
        src="/kaart.jpeg" 
        alt="Topografie kaart Noord-Nederland" 
        className="w-full h-auto block"
        draggable={false}
      />
      
      {/* Overlay met klikbare elementen */}
      <div className="absolute inset-0">
        {/* Provincies */}
        {provinces.map(prov => (
          <motion.button
            key={prov.id}
            onClick={() => handleClick(prov.id)}
            className={`absolute w-12 h-12 -ml-6 -mt-6 rounded-full border-3 font-black text-xl flex items-center justify-center cursor-pointer transition-all ${getMarkerStyle(prov.id)} shadow-lg`}
            style={{ left: `${prov.center.x}%`, top: `${prov.center.y}%` }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            {prov.label}
          </motion.button>
        ))}

        {/* Eilanden */}
        {islands.map(isl => (
          <motion.button
            key={isl.id}
            onClick={() => handleClick(isl.id)}
            className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 font-bold text-sm flex items-center justify-center cursor-pointer transition-all ${getMarkerStyle(isl.id)} shadow-md`}
            style={{ left: `${isl.x}%`, top: `${isl.y}%` }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.95 }}
          >
            {isl.label}
          </motion.button>
        ))}

        {/* Steden */}
        {cities.map(city => (
          <motion.button
            key={city.id}
            onClick={() => handleClick(city.id)}
            className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 font-bold text-sm flex items-center justify-center cursor-pointer transition-all ${getMarkerStyle(city.id)} shadow-md`}
            style={{ left: `${city.x}%`, top: `${city.y}%` }}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.95 }}
          >
            {city.label}
          </motion.button>
        ))}

        {/* Wateren */}
        {waters.map(water => (
          <motion.button
            key={water.id}
            onClick={() => handleClick(water.id)}
            className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-lg border-2 font-bold text-base flex items-center justify-center cursor-pointer transition-all ${getMarkerStyle(water.id)} shadow-md`}
            style={{ left: `${water.x}%`, top: `${water.y}%` }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
          >
            {water.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Map;
