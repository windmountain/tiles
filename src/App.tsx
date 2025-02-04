import { rawConnect } from "@fireproof/cloud";
import { useFireproof } from 'use-fireproof'
import { newGame, move, isAdjacentTo8, isSolved } from './core'
import './App.css'


function App() {
  const { database, useLiveQuery, useDocument } = useFireproof("tiles2");
  rawConnect(database, "zachs-tiles")
  const response = useLiveQuery('date', { limit: 1, descending: true })
  const games = response.docs
  const [game, setGame, saveGame] = useDocument(() => ({
    tiles: newGame(),
    date: Date.now()
  }))


  const makeMove = (n, game) => {
    const newTiles = move(n, game.tiles);
    database.put({
      ...game,
      tiles: newTiles
    })
  }

  return (
    <div className="games">

      {games.map((game) => (
        <div className="game" id={game._id}>
          {isSolved(game.tiles) && <h1>Solved!</h1>}
          <div key={game._id} id="tileGame">
            {game.tiles.map((n) =>
              <button
                key={n + 1}
                id={`tile-${n + 1}`}
                disabled={n == 8 || !isAdjacentTo8(n, game.tiles) || isSolved(game.tiles)}
                onClick={(e) => makeMove(n, game)}
              >
              </button>
            )}
          </div>
        </div>
      ))}
      <button id="newGame" onClick={async () => { await saveGame() }}>
        New Game
      </button>
    </div>
  )
}

export default App;