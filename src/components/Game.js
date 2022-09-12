import './Game.css'
import {useState, useRef} from 'react'

const Game = ({veriffyLetter, pickedWord, pickedCattegory, letters, guessedLetters, wrongLetters, chances, score}) => {
  const [letter, setLetter] = useState("")

  const inputRef = useRef(null) 

  const handleSubmit = (e) => {
    e.preventDefault()
    veriffyLetter(letter)

    setLetter("")

    inputRef.current.focus()
  }

  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <p>Você ainda tem {chances} tentativa(s)</p>
      <h3 className="tip">
        A dica da palavra é: <span>{pickedCattegory}</span>
      </h3>
      <div className="wordContainer">
        {letters.map((letter, i) => (
          guessedLetters.includes(letter) ? (
          <span key={i} className="letters">{letter}</span>
          ) : (
            <span key={i} className="blankSquare"></span>
          )
        )) }
      </div>
      <div className="letterContainer">
        <p>Tente adivinhar uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name="letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={inputRef}/>
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras já utilizadas:</p>
        {wrongLetters.map((letter, i) => <span key={i}>{letter}, </span>)}
      </div>
    </div>
    
  )
}

export default Game