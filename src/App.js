// Css
import './App.css';

//Hooks
import {useCallback, useEffect, useState} from 'react'

//Palavras
import {wordsList} from './data/words'

//Components
import StartScreen from './components/StartScreen';
import GameOver from './components/GameOver';
import Game from './components/Game';

function App() {
  const [words] = useState(wordsList)

  const stages = useCallback([
    {id: 1, stage: 'start'},
    {id: 2, stage: 'game'},
    {id: 3, stage: 'gameover'}
  ], [])

  const chancesGame = 5

  const [gameStage, setGameStage] = useState(stages[0].stage)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCattegory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState([])
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [chances, setChances] = useState(chancesGame)
  const [score, setScore] = useState(0)

  const pickedWordAndCattegory = useCallback(() => {
    // pegar uma categoria aleatoria
    const categories = Object.keys(wordsList)
    const category = categories[Math.floor(Math.random() * categories.length)]

    // pegar uma palavra aleatoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return {word, category}
  }, [words])

  //Iniciar o jogo
  const startGame = useCallback(() => {
    // clear all states
    clearStates()

    const {word, category} = pickedWordAndCattegory()

    //array de letras
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    //setar states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].stage)
  }, [pickedWordAndCattegory, stages])

  //verificar letras
  const veriffyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase()

    // se a letra já estiver sido digitada antes
    if(wrongLetters.includes(letter) || guessedLetters.includes(letter)) {
      return
    }

    // processando letras válidas e inválidas
    if(letters.includes(letter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizeLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizeLetter
      ])

      setChances((actualChances) => actualChances - 1)
    }
  }

  const clearStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

  useEffect(() => {
    if(chances <= 0) {
      // reset all states
      clearStates();

      // vai para o gameover
      setGameStage(stages[2].stage);
    }
  }, [chances, stages]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    if(uniqueLetters.length === guessedLetters.length && uniqueLetters.length !== 0) {
      // aumenta a pontuação
      setScore((actualScore) => actualScore += 100)
      
      // reseta para a próxima palavra
      startGame()
    }
  }, [guessedLetters, letters, startGame]);

  //restart no game
  const reset = () => {
    // resetar o score
    setScore(0)

    //resetar as chances
    setChances(chancesGame)

    setGameStage(stages[0].stage)
  }

  
  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game 
      veriffyLetter={veriffyLetter} 
      pickedWord={pickedWord} 
      pickedCattegory={pickedCattegory} 
      letters={letters} 
      guessedLetters={guessedLetters} 
      wrongLetters={wrongLetters} 
      chances={chances} 
      score={score} />}
      {gameStage === 'gameover' && <GameOver reset={reset} score={score}/>}
    </div>
  );
}

export default App;
