import React from 'react';
import type { TopoLocation } from '../topoData';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionCardProps {
  currentLocation: TopoLocation;
  currentGrade: string;
  totalQuestions: number;
  currentIndex: number;
  correctCount: number;
  wrongCount: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  currentLocation, 
  currentGrade, 
  totalQuestions, 
  currentIndex,
  correctCount,
  wrongCount
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border-b-8 border-blue-600 mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">
          Vraag {currentIndex + 1} van {totalQuestions}
        </span>
        <div className="flex gap-3">
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-sm">
            ✓ {correctCount}
          </div>
          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold text-sm">
            ✗ {wrongCount}
          </div>
          <div className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-bold">
            Cijfer: {currentGrade}
          </div>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLocation.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center"
        >
          <h2 className="text-2xl font-black text-slate-800 mb-2">
            Waar ligt {currentLocation.type === 'province' && 'de provincie '}
            {currentLocation.type === 'city' && 'de stad '}
            {currentLocation.type === 'water' && 'het water '}
            {currentLocation.type === 'island' && (currentLocation.id === 'oostvaardersplassen' ? 'het natuurgebied ' : 'het eiland ')}
            <span className="text-blue-600 underline decoration-wavy">{currentLocation.name}</span>?
          </h2>
          <p className="text-slate-500 italic">
            Klik op de juiste plek op de kaart
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default QuestionCard;
