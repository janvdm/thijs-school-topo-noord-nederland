// Sound effects using Web Audio API

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
};

// Klik geluid voor buttons en map items
export const playClickSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.setValueAtTime(600, now + 0.05);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.setValueAtTime(0.01, now + 0.08);
    
    osc.start(now);
    osc.stop(now + 0.08);
  } catch (e) {
    console.log('Audio not supported');
  }
};

// Vrolijk "okidoki" geluid voor goed antwoord
export const playCorrectSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Eerste toon (hoger)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.setValueAtTime(659.25, now + 0.1); // E5
    osc1.frequency.setValueAtTime(783.99, now + 0.2); // G5
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc1.start(now);
    osc1.stop(now + 0.4);

    // Tweede toon (nog hoger, vrolijk)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.setValueAtTime(1046.50, now + 0.3); // C6
    gain2.gain.setValueAtTime(0.2, now + 0.3);
    gain2.gain.setValueAtTime(0.01, now + 0.5);
    osc2.start(now + 0.3);
    osc2.stop(now + 0.5);
  } catch (e) {
    console.log('Audio not supported');
  }
};

// Honk geluid voor fout antwoord
export const playWrongSound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Lage "honk" toon
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.setValueAtTime(100, now + 0.15);
    osc.frequency.setValueAtTime(80, now + 0.3);
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.setValueAtTime(0.2, now + 0.15);
    gain.gain.setValueAtTime(0.01, now + 0.4);
    
    osc.start(now);
    osc.stop(now + 0.4);

    // Tweede korte honk
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(120, now + 0.2);
    osc2.frequency.setValueAtTime(80, now + 0.35);
    
    gain2.gain.setValueAtTime(0.25, now + 0.2);
    gain2.gain.setValueAtTime(0.01, now + 0.45);
    
    osc2.start(now + 0.2);
    osc2.stop(now + 0.45);
  } catch (e) {
    console.log('Audio not supported');
  }
};

// Victory fanfare voor aan het eind
export const playVictorySound = () => {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const startTime = now + i * 0.15;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.setValueAtTime(0.01, startTime + 0.3);
      
      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  } catch (e) {
    console.log('Audio not supported');
  }
};
