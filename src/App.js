import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [animate, setAnimate] = useState(false);

  // On active l'animation à chaque changement de count
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timeout);
  }, [count]);

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="title">🧮 Compteur élégant</h1>
        <div className={`count ${animate ? "animate" : ""}`}>{count}</div>
        <div className="buttons">
          <button
            className="btn increment"
            onClick={() => setCount(count + 1)}
            aria-label="Incrémenter"
          >
            ➕ Incrémenter
          </button>
          <button
            className="btn decrement"
            onClick={() => setCount(count - 1)}
            aria-label="Décrémenter"
          >
            ➖ Décrémenter
          </button>
          <button
            className="btn reset"
            onClick={() => setCount(0)}
            aria-label="Réinitialiser"
          >
            🔄 Réinitialiser
          </button>
        </div>
      </div>
      <footer className="footer">Réalisé avec React 💙</footer>
    </div>
  );
}
