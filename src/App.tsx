import { useDocument, useLiveQuery } from 'use-fireproof'
import { newGame, move } from './core'
import './App.css'


function App() {
  const response = useLiveQuery('date', {limit: 1, descending: true})
  const games = response.docs
  const [game, setGame, saveGame] = useDocument(() => ({
    tiles: newGame(),
    date: Date.now()
  }))


  const makeMove = (n, game) => {
    const newTiles = move(n, game.tiles);
    useLiveQuery.database.put({
      ...game,
      tiles: newTiles
    })
  }

  return (
    <>
      {games.map((game) => (
        <div key={game._id} id="tileGame">
          {game.tiles.map((n) =>
            <button
              key={n+1}
              id={`tile-${n+1}`}
              disabled={n == 8}
              onClick={(e) => makeMove(n, game)}
              >
            </button>
          )}
        </div>
      ))}
      <button id="newGame" onClick={async () => { await saveGame() }}>
        New Game
      </button>
    </>
  )
}

export default App;