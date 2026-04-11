
import React, { useState } from "react";

type GameState = {
  turn: number;
  food: number;
  health: number;
  population: number;
  reputation: number;
  burnout: number;
  legacy: number;
  hardened: boolean;
  iso: boolean;
  hydroponics: boolean;
  marketStorms: number;
  status: "BLACK_SHEEP" | "GOAT";
  grit: number;
  grace: number;
  guardians: number;
  growingPains: number;
  log: string[];
  gameOver: boolean;
};

const initialState: GameState = {
  turn: 1,
  food: 50,
  health: 50,
  population: 5,
  reputation: 10,
  burnout: 0,
  legacy: 0,
  hardened: false,
  iso: false,
  hydroponics: false,
  marketStorms: 0,
  status: "BLACK_SHEEP",
  grit: 5,
  grace: 5,
  guardians: 0,
  growingPains: 0,
  log: ["Welcome to Pioneer: The GOAT Edition!"],
  gameOver: false,
};

function randomEvent() {
  const events = ["fire", "flood", "sabotage", "scandal", "none"];
  return events[Math.floor(Math.random() * events.length)];
}

function getJasmineQuote() {
  const quotes = [
    "I don't back down, I double down.",
    "If you come for the truth, you better come correct.",
    "Justice isn't a trend—it's a calling.",
    "I speak for the people, not for the powerful.",
    "You can't silence a voice built on purpose.",
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export default function PlayPioneerGame() {
  const [state, setState] = useState<GameState>(initialState);

  function nextTurn() {
    if (state.gameOver) return;
    let log: string[] = [];
    let {
      turn,
      food,
      health,
      population,
      reputation,
      burnout,
      legacy,
      hardened,
      iso,
      hydroponics,
      marketStorms,
      status,
      grit,
      grace,
      guardians,
      growingPains,
    } = state;

    // Black Sheep actions
    grace += 1;
    log.push(`Mapped new territory. Grace increased.`);
    guardians += 1;
    grit += 1;
    log.push(`Guardian built! Total: ${guardians}. Grit increased.`);
    const pain = Math.floor(Math.random() * 3);
    growingPains += pain;
    if (pain) log.push(`Endured ${pain} growing pains this turn.`);

    // Feed population
    if (food >= population * 5) {
      food -= population * 5;
      health += 5;
      legacy += 2;
      log.push(`Population fed. Health improved. Legacy score increased.`);
    } else {
      health -= 10;
      burnout += 1;
      log.push(`Not enough food! Health decreased. Burnout increased.`);
    }

    // Adversity event
    const event = randomEvent();
    if (event === "fire") {
      food = Math.max(0, food - 10);
      health -= 5;
      burnout += 3;
      log.push("Adversity: Fire! Food lost, health and burnout affected.");
    } else if (event === "flood") {
      hydroponics = false;
      health -= 5;
      log.push("Adversity: Flood! Hydroponics offline, health affected.");
    } else if (event === "sabotage") {
      hardened = false;
      reputation -= 2;
      log.push("Adversity: Sabotage! Defenses down, reputation decreased.");
    } else if (event === "scandal") {
      reputation -= 5;
      burnout += 2;
      log.push("Adversity: Scandal! Reputation and burnout affected.");
    } else {
      log.push("No adversity event this turn.");
    }

    // Harden, Hydroponics, ISO
    if (!hardened) {
      hardened = true;
      reputation += 2;
      log.push("Settlement hardened. Reputation increased.");
    }
    if (!hydroponics) {
      hydroponics = true;
      food += 50;
      reputation += 3;
      log.push("Hydroponic system online. Food security improved. Reputation increased.");
    }
    if (!iso) {
      iso = true;
      reputation += 5;
      log.push("Achieved ISO 27001 compliance! Reputation increased.");
    }

    // Market Storm
    if (!hardened) {
      health -= 10;
      marketStorms += 1;
      burnout += 2;
      log.push("Market Storm hit! Health reduced. Burnout increased.");
    } else {
      log.push("Market Storm resisted!");
    }

    // Burnout warning
    if (burnout >= 10) {
      log.push("Warning: Settlement is burning out! Take action to recover.");
    }

    // Population growth
    if (health > 60 && food > population * 10) {
      population += 1;
      legacy += 1;
      log.push("Population grew! Legacy score increased.");
    }

    // Jasmine Crockett actions
    const jasmineQuote = getJasmineQuote();
    reputation += 4;
    burnout = Math.max(0, burnout - 3);
    log.push(`Jasmine Crockett says: "${jasmineQuote}" Reputation up, burnout down.`);
    if (burnout > 0) {
      burnout = Math.max(0, burnout - 2);
      reputation += 1;
      log.push("Jasmine calls out injustice! Burnout reduced, reputation up.");
    } else {
      log.push("Jasmine is on watch—no injustice slips by.");
    }
    if (health > 30) {
      legacy += 3;
      log.push("Jasmine empowers the community! Legacy score increased.");
    }

    // Evolution
    if (iso && hydroponics && status === "BLACK_SHEEP") {
      status = "GOAT";
      log.push("You have evolved into the GOAT! Billion-Dollar Blueprint unlocked.");
    }

    // Endgame check
    let gameOver = false;
    if (health <= 0 || burnout >= 20) {
      log.push(`Game Over! Final Legacy Score: ${legacy}. Reputation: ${reputation}. Burnout: ${burnout}.`);
      gameOver = true;
    }

    setState({
      turn: turn + 1,
      food,
      health,
      population,
      reputation,
      burnout,
      legacy,
      hardened,
      iso,
      hydroponics,
      marketStorms,
      status,
      grit,
      grace,
      guardians,
      growingPains,
      log: [...log, ...state.log].slice(0, 20),
      gameOver,
    });
  }

  function resetGame() {
    setState(initialState);
  }

  return (
    <main className="max-w-2xl mx-auto py-16 px-4 text-center">
      <h1 className="text-3xl font-bold mb-6 text-emerald-700">Pioneer: The GOAT Edition</h1>
      <div className="mb-6 flex flex-wrap justify-center gap-4 text-left text-base">
        <div className="bg-slate-100 text-slate-900 rounded-lg px-4 py-2 shadow">
          <strong>Turn:</strong> {state.turn}
        </div>
        <div className="bg-slate-100 text-slate-900 rounded-lg px-4 py-2 shadow">
          <strong>Status:</strong> {state.status}
        </div>
        <div className="bg-slate-100 text-slate-900 rounded-lg px-4 py-2 shadow">
          <strong>Food:</strong> {state.food}
        </div>
        <div className="bg-slate-100 text-slate-900 rounded-lg px-4 py-2 shadow">
          <strong>Health:</strong> {state.health}
        </div>
        <div className="bg-slate-100 text-slate-900 rounded-lg px-4 py-2 shadow">
          <strong>Population:</strong> {state.population}
        </div>
        <div className="bg-slate-100 text-slate-900 rounded-lg px-4 py-2 shadow">
          <strong>Reputation:</strong> {state.reputation}
        </div>
        <div className="bg-slate-100 text-slate-900 rounded-lg px-4 py-2 shadow">
          <strong>Burnout:</strong> {state.burnout}
        </div>
        <div className="bg-slate-100 text-slate-900 rounded-lg px-4 py-2 shadow">
          <strong>Legacy:</strong> {state.legacy}
        </div>
      </div>
      <div className="mb-8">
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg shadow transition disabled:opacity-50"
          onClick={nextTurn}
          disabled={state.gameOver}
        >
          {state.gameOver ? "Game Over" : "Next Turn"}
        </button>
        {state.gameOver && (
          <button
            className="ml-4 bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-lg shadow transition"
            onClick={resetGame}
          >
            Restart
          </button>
        )}
      </div>
      <div className="bg-slate-900/80 rounded-lg p-4 text-left max-h-96 overflow-y-auto shadow-inner border border-emerald-900 mb-4">
        <h2 className="text-lg font-bold text-emerald-300 mb-2">Game Log</h2>
        <ul className="list-disc pl-5 space-y-1 text-slate-100">
          {state.log.map((entry, idx) => (
            <li key={idx}>{entry}</li>
          ))}
        </ul>
      </div>
      <div className="text-sm text-slate-500 mt-8">
        Powered by Sanders Viopro Labs
      </div>
    </main>
  );
}
