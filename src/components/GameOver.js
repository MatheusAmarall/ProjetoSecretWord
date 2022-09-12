import './GameOver.css'

const GameOver = ({reset, score}) => {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <h2>O seu score foi de: <span>{score}</span> pontos</h2>
      <button onClick={reset}>Reiniciar jogo</button>
    </div>
  )
}

export default GameOver