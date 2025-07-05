import React, { useEffect, useState } from "react";
import "./style.css";

const concepts = [
  { id: 1, type: "concept", value: "useState", match: 101 },
  {
    id: 101,
    type: "definition",
    value: "Permet de gérer l'état local dans un composant fonctionnel.",
    match: 1,
  },

  { id: 2, type: "concept", value: "useEffect", match: 102 },
  {
    id: 102,
    type: "definition",
    value: "Exécute une fonction après le rendu du composant.",
    match: 2,
  },

  { id: 3, type: "concept", value: "props", match: 103 },
  {
    id: 103,
    type: "definition",
    value: "Données passées d’un composant parent à un enfant.",
    match: 3,
  },

  { id: 4, type: "concept", value: "JSX", match: 104 },
  {
    id: 104,
    type: "definition",
    value: "Syntaxe qui mélange JavaScript et HTML.",
    match: 4,
  },

  { id: 5, type: "concept", value: "useContext", match: 105 },
  {
    id: 105,
    type: "definition",
    value:
      "Permet de partager des données entre composants sans passer par les props.",
    match: 5,
  },

  { id: 6, type: "concept", value: "useRef", match: 106 },
  {
    id: 106,
    type: "definition",
    value: "Fournit une référence mutable qui persiste entre les rendus.",
    match: 6,
  },

  { id: 7, type: "concept", value: "component", match: 107 },
  {
    id: 107,
    type: "definition",
    value: "Bloc de construction de l'interface utilisateur.",
    match: 7,
  },

  { id: 8, type: "concept", value: "virtual DOM", match: 108 },
  {
    id: 108,
    type: "definition",
    value:
      "Représentation en mémoire du DOM réel utilisée pour des mises à jour efficaces.",
    match: 8,
  },
];

const matchColors = [
  "#81d4fa",
  "#f8bbd0",
  "#c5e1a5",
  "#ffcc80",
  "#d1c4e9",
  "#ffab91",
  "#aed581",
  "#ce93d8",
];

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [pairColors, setPairColors] = useState({});
  const [moves, setMoves] = useState(0);
  const [errorIndexes, setErrorIndexes] = useState([]);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setCards(shuffle(concepts));
    setFlipped([]);
    setMatched([]);
    setPairColors({});
    setMoves(0);
    setErrorIndexes([]);
  };

  const handleClick = (index) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(cards[index].id)
    )
      return;
    setFlipped([...flipped, index]);
    setMoves((prev) => prev + 1);
  };

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      const card1 = cards[first];
      const card2 = cards[second];

      if (card1.match === card2.id || card2.match === card1.id) {
        setMatched((prev) => [...prev, card1.id, card2.id]);

        const pairId = Math.min(card1.id, card2.id);
        setPairColors((prev) => ({
          ...prev,
          [pairId]: matchColors[Object.keys(prev).length % matchColors.length],
        }));
        setTimeout(() => setFlipped([]), 1000);
      } else {
        setErrorIndexes([first, second]);
        setTimeout(() => {
          setFlipped([]);
          setErrorIndexes([]);
        }, 1000);
      }
    }
  }, [flipped, cards]);

  const isFlipped = (index) =>
    flipped.includes(index) || matched.includes(cards[index].id);

  const getCardColor = (card) => {
    const pairId = Math.min(card.id, card.match);
    return pairColors[pairId] || "white";
  };

  const isError = (index) => errorIndexes.includes(index);

  return (
    <div className="app">
      <h1 className="cursive">🧠 Memory Cards – Apprends React</h1>
      <div className="stats">
        <p className="cursive">🧮 Coups : {moves}</p>
        <button onClick={resetGame}>🔁 Rejouer</button>
      </div>

      <div className="grid">
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`card ${isFlipped(index) ? "flipped" : ""} ${
              isError(index) ? "shake" : ""
            }`}
            onClick={() => handleClick(index)}
          >
            <div className="card-inner">
              <div className="card-front">❓</div>
              <div
                className="card-back cursive"
                style={{
                  backgroundColor: matched.includes(card.id)
                    ? getCardColor(card)
                    : "white",
                }}
              >
                {card.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {matched.length === cards.length && (
        <div className="win-message cursive">
          🎉 Bravo ! Tu as terminé en {moves} coups !
        </div>
      )}
    </div>
  );
}
