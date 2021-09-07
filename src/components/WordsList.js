import React from "react";
import "./words-list.css";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import FirstWord from "./FirstWord";

const WordsLlist = ({ words_list, setWordsList, is_start, is_game_over }) => {
  const getGameState = ({ is_start, is_game_over }) => {
    if (is_game_over) return "Game Over!";
    else if (!is_start) return "Press 'Start' to play!";
  };
  const [game_state, setGameState] = React.useState(() => {
    return getGameState({ is_start, is_game_over });
  });

  const removeWord = ({ word }) => {
    const wordIndex = words_list.findIndex((word_item) => word_item === word);
    const new_list = [...words_list];
    if (wordIndex > -1) {
      new_list.splice(wordIndex, 1);
    }
    setWordsList(new_list);
  };

  const gameStateEffect = () => {
    setGameState(() => {
      return getGameState({ is_start, is_game_over });
    });
  };
  React.useEffect(gameStateEffect, [is_game_over, is_start]);

  return (
    <List component="nav" aria-label="main mailbox folders">
      {is_start && !is_game_over ? (
        words_list.map((word, index) => {
          if (index === 0)
            return (
              <FirstWord
                word={words_list[0]}
                removeWord={removeWord}
                key={word}
              />
            );
          else {
            return (
              <ListItem key={word}>
                <ListItemText primary={word} />
              </ListItem>
            );
          }
        })
      ) : (
        <div>{game_state}</div>
      )}
    </List>
  );
};
export default WordsLlist;
