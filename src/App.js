import React from "react";
import "./App.css";

import faker from "faker";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";

const App = () => {
  const word = faker.random.word();
  const [new_word, setNewWord] = React.useState(word);
  const [words_list, setWordsList] = React.useState([]);
  const [is_start, setStart] = React.useState(false);
  const interval = React.useRef({});

  const newWordEffect = () => {
    const new_list = [...words_list];
    new_list.push(new_word);
    setWordsList(new_list);
  };
  React.useEffect(newWordEffect, [new_word]);

  const startEffect = () => {
    if (!is_start) return;
    interval.current.timer = setInterval(() => {
      setNewWord(() => faker.random.word());
    }, 1000);
  };
  React.useEffect(startEffect, [is_start]);

  const wordsListEffect = () => {
    console.log("WORDSLIST", words_list, words_list.length);
    if (words_list.length >= 10) {
      clearInterval(interval.current.timer);
    }
  };
  React.useEffect(wordsListEffect, [words_list]);

  console.log("WORDS", words_list);
  return (
    <div className="App">
      <Button
        onClick={() => {
          setStart(true);
        }}
        variant="contained"
        color="primary"
      >
        Start
      </Button>

      <List component="nav" aria-label="main mailbox folders">
        {words_list.map((word) => (
          <ListItem button>
            <ListItemText primary={word} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};
export default App;
