import React, { useState } from 'react';
import Map from './Map';
import QuestionCard from './QuestionCard';
import type { TopoLocation } from '../topoData';
import { topoData } from '../topoData';
import { Trophy, RefreshCw, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playCorrectSound, playWrongSound, playVictorySound, playClickSound } from '../utils/sounds';

const GameContainer: React.FC = () => {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [shuffledQuestions, setShuffledQuestions] = useState<TopoLocation[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [correctIds, setCorrectIds] = useState<string[]>([]);
  const [wrongId, setWrongId] = useState<string | undefined>(undefined);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const startGame = () => {
    const shuffled = [...topoData].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
    setCorrectCount(0);
    setWrongCount(0);
    setCorrectIds([]);
    setGameState('playing');
  };

  // Bereken cijfer op schaal 1-10 (Nederlandse schoolschaal)
  // Formule: basis is percentage goed, met strafpunten voor foute antwoorden
  const calculateGrade = () => {
    const totalQuestions = shuffledQuestions.length;
    if (totalQuestions === 0) return 1;
    
    // Basis score: percentage correct
    const baseScore = (correctCount / totalQuestions) * 10;
    
    // Straf voor foute antwoorden: -0.2 per fout antwoord (max 2 punten aftrek)
    const penalty = Math.min(wrongCount * 0.2, 2);
    
    // Eindcijfer tussen 1 en 10
    const grade = Math.max(1, Math.min(10, baseScore - penalty));
    
    // Afronden op 1 decimaal
    return Math.round(grade * 10) / 10;
  };

  // Huidige voortgang als cijfer (voor tijdens het spelen)
  const getCurrentGrade = () => {
    const answeredQuestions = currentIndex;
    if (answeredQuestions === 0) return '-';
    
    const baseScore = (correctCount / answeredQuestions) * 10;
    const penalty = Math.min(wrongCount * 0.2, 2);
    const grade = Math.max(1, Math.min(10, baseScore - penalty));
    
    return (Math.round(grade * 10) / 10).toFixed(1);
  };

  const handleLocationClick = (location: TopoLocation) => {
    if (gameState !== 'playing' || feedback) return;

    const currentTarget = shuffledQuestions[currentIndex];

    if (location.id === currentTarget.id) {
      setFeedback('correct');
      setCorrectCount(c => c + 1);
      setCorrectIds(prev => [...prev, location.id]);
      playCorrectSound(); // Okidoki geluid!
      
      setTimeout(() => {
        setFeedback(null);
        if (currentIndex < shuffledQuestions.length - 1) {
          setCurrentIndex(i => i + 1);
        } else {
          setGameState('finished');
          playVictorySound(); // Fanfare aan het eind!
        }
      }, 2000); // 2 seconden voor het poppetje
    } else {
      setFeedback('wrong');
      setWrongId(location.id);
      setWrongCount(w => w + 1);
      playWrongSound(); // Honk geluid!

      setTimeout(() => {
        setFeedback(null);
        setWrongId(undefined);
      }, 2000); // 2 seconden voor het poppetje
    }
  };

  const finalGrade = calculateGrade();
  const gradeColor = finalGrade >= 5.5 ? 'text-green-600' : 'text-red-600';
  const gradeBorderColor = finalGrade >= 5.5 ? 'border-green-500' : 'border-red-500';

  // Bepaal de kwalificatie op basis van het cijfer
  const getGradeLabel = (grade: number) => {
    if (grade < 5.5) return { label: 'Onvoldoende', color: 'text-red-600', bg: 'bg-red-100' };
    if (grade < 6.5) return { label: 'Matig', color: 'text-orange-600', bg: 'bg-orange-100' };
    if (grade < 7.5) return { label: 'Voldoende', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (grade < 8.5) return { label: 'Goed', color: 'text-green-600', bg: 'bg-green-100' };
    return { label: 'Zeer goed', color: 'text-emerald-600', bg: 'bg-emerald-100' };
  };

  const gradeLabel = getGradeLabel(finalGrade);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-2 tracking-tighter">
            THIJS <span className="text-blue-600">TOPO</span> GAME
          </h1>
          <p className="text-slate-500 font-medium">Oefen je topografie voor school!</p>
        </header>

        <AnimatePresence mode="wait">
          {gameState === 'start' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl shadow-2xl p-12 text-center border-4 border-slate-900"
            >
              <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="w-12 h-12 text-blue-600 fill-current" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Klaar voor de start?</h2>
              <p className="text-slate-600 mb-8 text-lg">
                Weet jij waar alle provincies, steden en wateren liggen?
              </p>
              <button
                onClick={() => { playClickSound(); startGame(); }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-black text-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-200"
              >
                START DE GAME!
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QuestionCard
                currentLocation={shuffledQuestions[currentIndex]}
                currentGrade={getCurrentGrade()}
                totalQuestions={shuffledQuestions.length}
                currentIndex={currentIndex}
                correctCount={correctCount}
                wrongCount={wrongCount}
              />
              
              <div className="relative">
                <Map
                  onLocationClick={handleLocationClick}
                  correctIds={correctIds}
                  wrongId={wrongId}
                />
                
                <AnimatePresence>
                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.5 }}
                      className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-50`}
                    >
                      <motion.div
                        initial={{ rotate: -20, scale: 0 }}
                        animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5 }}
                        className="text-9xl mb-4"
                      >
                        {feedback === 'correct' 
                          ? ['🎉', '🥳', '😎', '🤩', '💪', '🦸', '🧙‍♂️', '🤠', '👽', '🤖'][Math.floor(Math.random() * 10)]
                          : ['😅', '🙈', '🤪', '😬', '🫠', '🥴', '🤡', '👀', '💀', '🙃'][Math.floor(Math.random() * 10)]
                        }
                      </motion.div>
                      <span className={`text-6xl font-black px-8 py-4 rounded-3xl shadow-2xl ${
                        feedback === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {feedback === 'correct' ? 'GOED!' : 'FOUT!'}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {gameState === 'finished' && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-3xl shadow-2xl p-12 text-center border-4 ${gradeBorderColor}`}
            >
              <Trophy className={`w-24 h-24 mx-auto mb-6 ${finalGrade >= 5.5 ? 'text-yellow-400' : 'text-slate-400'}`} />
              <h2 className="text-4xl font-black mb-2">
                {finalGrade >= 5.5 ? 'GEFELICITEERD!' : 'BLIJVEN OEFENEN!'}
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Je hebt alle vragen beantwoord!
              </p>
              
              <div className="bg-slate-50 rounded-2xl p-8 mb-8">
                <div className="text-sm text-slate-500 uppercase font-bold mb-1">Jouw Cijfer</div>
                <div className={`text-7xl font-black ${gradeColor}`}>
                  {finalGrade.toFixed(1)}
                </div>
                <div className={`inline-block mt-3 px-4 py-1 rounded-full font-bold ${gradeLabel.color} ${gradeLabel.bg}`}>
                  {gradeLabel.label}
                </div>
                <div className="mt-4 text-slate-500 text-sm">
                  {correctCount} van {shuffledQuestions.length} goed · {wrongCount} foute klikken
                </div>
              </div>
              
              {finalGrade < 5.5 && (
                <p className="text-slate-500 mb-6 italic">
                  Een 5,5 of hoger is voldoende. Probeer het nog eens!
                </p>
              )}
              
              <button
                onClick={() => { playClickSound(); startGame(); }}
                className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-10 py-4 rounded-2xl font-black text-xl mx-auto transition-all hover:scale-105"
              >
                <RefreshCw className="w-6 h-6" />
                OPNIEUW SPELEN
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameContainer;
