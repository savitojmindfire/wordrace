import React from "react";
import "./App.css";

import faker from "faker";

import Button from "@material-ui/core/Button";
import WordsList from "./components/WordsList";

const App = () => {
  const word = faker.random.word();
  const [new_word, setNewWord] = React.useState(word);
  const [words_list, setWordsList] = React.useState([]);
  const [is_start, setStart] = React.useState(false);
  const interval = React.useRef({});
  const [is_game_over, setGameOver] = React.useState(false);

  const startEffect = () => {
    if (!is_start) return;
    interval.current.timer = setInterval(() => {
      setNewWord(() => faker.random.word());
    }, 1200);
  };
  React.useEffect(startEffect, [is_start]);

  const newWordEffect = () => {
    const new_list = [...words_list];
    new_list.push(new_word);
    setWordsList(new_list);
  };
  React.useEffect(newWordEffect, [new_word]);

  const wordsListEffect = () => {
    if (words_list.length >= 10) {
      clearInterval(interval.current.timer);
      setGameOver(true);
      setWordsList([]);
      setStart(false);
    }
  };
  React.useEffect(wordsListEffect, [words_list]);

  console.log("WORDS", words_list);
  return (
    <div className="App">
      <Button
        onClick={() => {
          setStart(!is_start);
        }}
        variant="contained"
        color="primary"
      >
        {is_start ? "Stop" : "Start"}
      </Button>

      <WordsList
        words_list={words_list}
        setWordsList={setWordsList}
        is_start={is_start}
        is_game_over={is_game_over}
      />
    </div>
  );
};
export default App;
