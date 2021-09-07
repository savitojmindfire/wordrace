import React from "react";
import "./first-word.css";

import ListItem from "@material-ui/core/ListItem";

import useTypingGame from "react-typing-game-hook";

const FirstWord = ({ word, removeWord }) => {
  const first_word_ref = React.useRef({});

  const {
    states: {
      charsState,
      length,
      currIndex,
      currChar,
      correctChar,
      errorChar,
      phase,
      startTime,
      endTime,
    },
    actions: { insertTyping, resetTyping, deleteTyping },
  } = useTypingGame(word);

  const handleKey = (key: any) => {
    if (key === "Escape") {
      resetTyping();
    } else if (key === "Backspace") {
      deleteTyping(false);
    } else if (key.length === 1) {
      insertTyping(key);
    }
  };

  React.useEffect(() => {
    first_word_ref.current.focus();
  });

  const correctTypingEffect = () => {
    if (correctChar === word.length) removeWord({ word });
  };

  React.useEffect(correctTypingEffect, [correctTypingEffect]);

  return (
    <ListItem button divider>
      <div
        className="typing-test"
        onKeyDown={(e) => {
          handleKey(e.key);
          e.preventDefault();
        }}
        tabIndex={0}
        ref={first_word_ref}
      >
        {!!word.length &&
          word.split("").map((char, index) => {
            let state = charsState[index];
            let color = state === 0 ? "black" : state === 1 ? "green" : "red";
            return (
              <span
                key={char + index}
                style={{ color }}
                className={currIndex + 1 === index ? "curr-letter" : ""}
              >
                {char}
              </span>
            );
          })}
      </div>
    </ListItem>
  );
};

export default FirstWord;
