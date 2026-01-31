export type TopoType = 'province' | 'city' | 'island' | 'water';

export interface TopoLocation {
  id: string;
  name: string;
  type: TopoType;
  label?: string; // The letter or number from the homework
}

export const topoData: TopoLocation[] = [
  // Provincies (A-D)
  { id: 'groningen-prov', name: 'Groningen', type: 'province', label: 'A' },
  { id: 'friesland-prov', name: 'Friesland', type: 'province', label: 'B' },
  { id: 'drenthe-prov', name: 'Drenthe', type: 'province', label: 'C' },
  { id: 'flevoland-prov', name: 'Flevoland', type: 'province', label: 'D' },

  // Eilanden / Natuur (a-f)
  { id: 'oostvaardersplassen', name: 'Oostvaardersplassen', type: 'island', label: 'a' },
  { id: 'texel', name: 'Texel', type: 'island', label: 'b' },
  { id: 'vlieland', name: 'Vlieland', type: 'island', label: 'c' },
  { id: 'terschelling', name: 'Terschelling', type: 'island', label: 'd' },
  { id: 'ameland', name: 'Ameland', type: 'island', label: 'e' },
  { id: 'schiermonnikoog', name: 'Schiermonnikoog', type: 'island', label: 'f' },

  // Steden (1-9)
  { id: 'groningen-city', name: 'Groningen', type: 'city', label: '1' },
  { id: 'leeuwarden', name: 'Leeuwarden', type: 'city', label: '2' },
  { id: 'assen', name: 'Assen', type: 'city', label: '3' },
  { id: 'lelystad', name: 'Lelystad', type: 'city', label: '4' },
  { id: 'almere', name: 'Almere', type: 'city', label: '5' },
  { id: 'sneek', name: 'Sneek', type: 'city', label: '6' },
  { id: 'heerenveen', name: 'Heerenveen', type: 'city', label: '7' },
  { id: 'delfzijl', name: 'Delfzijl', type: 'city', label: '8' },
  { id: 'emmen', name: 'Emmen', type: 'city', label: '9' },

  // Wateren (I-III)
  { id: 'ijsselmeer', name: 'IJsselmeer', type: 'water', label: 'I' },
  { id: 'noordzee', name: 'Noordzee', type: 'water', label: 'II' },
  { id: 'waddenzee', name: 'Waddenzee', type: 'water', label: 'III' },
];
