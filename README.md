# 🗺️ Thijs Topo Game

Een vrolijke topografie-quiz om te oefenen voor je proefwerk! Weet jij waar Groningen, Friesland, de Waddenzee en alle steden liggen? Speel de game en word een echte kaartkampioen. 🏆

---

## ✨ Wat is dit?

**Thijs Topo Game** is een educatieve quiz voor de noordelijke provincies van Nederland. De kaart is gebaseerd op echt huiswerk — je oefent op dezelfde kaart als in je schrift. Klik de juiste plek aan, krijg direct feedback, en zie je cijfer op een schaal van 1–10 (zoals op school). Met leuke geluidjes en een blij poppetje na elke vraag! 🎉

- **Provincies:** Groningen, Friesland, Drenthe, Flevoland (A–D)
- **Steden:** Groningen, Leeuwarden, Assen, Lelystad, Almere, Sneek, Heerenveen, Delfzijl, Emmen (1–9)
- **Eilanden:** Texel, Vlieland, Terschelling, Ameland, Schiermonnikoog + Oostvaardersplassen (a–f)
- **Wateren:** IJsselmeer, Noordzee, Waddenzee (I–III)

---

## 🛠️ Hoe is dit gemaakt?

De game is gebouwd met een modern web-stack:

| Onderdeel | Tech |
|-----------|------|
| **Framework** | [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build & dev** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Animaties** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Geluiden** | Web Audio API (geen externe bestanden) |

De **kaart** is een echte foto van het huiswerk als achtergrond, met klikbare markers eroverheen. Cijfers worden berekend op de Nederlandse 1–10 schaal, met kwalificaties als *Onvoldoende*, *Matig*, *Voldoende*, *Goed* en *Zeer goed*.

---

## 🚀 Lokaal draaien

```bash
# Dependencies installeren
npm install

# Development server (met hot reload)
npm run dev

# Productie-build maken
npm run build

# Productie-build lokaal bekijken
npm run preview
```

Daarna open je in je browser de URL die in de terminal staat (meestal `http://localhost:5173`).

---

## 🌐 Online spelen

De game kan worden gedeployed op o.a. **Vercel** of **GitHub Pages**, zodat Thijs (of wie dan ook) hem gewoon in de browser kan openen — geen dev server nodig!

---

## 📄 Licentie

Dit project is gemaakt voor Thijs om topo te oefenen. Veel succes met je proefwerk! 🎓✨
