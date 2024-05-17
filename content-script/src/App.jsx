/// <reference types="chrome" />
/// <reference types="vite-plugin-svgr/client" />
import { ReactComponent as DeadIcon } from "./svg/dead.svg";

import {
  Button,
  Dialog,
  DialogContent,
  TextField,
  IconButton,
} from "@mui/material";
import { useState } from "react";

function App() {
  const [cursorPosition, setPosition] = useState({
    x: 0 + "px",
    y: 0 + "px",
  });
  const [display, setDisplay] = useState(false);
  const [highlightedText, setHighlightedText] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [explanted, setExplanted] = useState(false);

  function selected(e) {
    setDisplay(false);
    const targetDiv = window.getSelection();
    if (!modalOpen && targetDiv != null && targetDiv.toString().length > 0) {
      cursorPosition.x = e.pageX + "px";
      cursorPosition.y = e.pageY + 40 + "px";

      setPosition({
        x: e.pageX + "px",
        y: e.pageY + 40 + "px",
      });

      console.log(targetDiv.toString());
      setHighlightedText(targetDiv.toString());
      setDisplay(true);
    }
  }

  document.onmouseup = selected;

  const onClick = () => {
    setDisplay(false);
    setModalOpen(true);
  };
  const onClickExplanted = () => {
    setExplanted(true);
    onClick();
  };
  const handleClose = () => {
    setModalOpen(false);
    setExplanted(false);
  };

  const createNew = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/subject", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        text: text ? text : highlightedText,
      }),
    });
    setTitle("");
    setHighlightedText("");
    setText("");
    setModalOpen(false);
  };

  const ExplantedButton = () => {
    const styles = {
      margin: "0 1rem",
      zIndex: 20000000000000,
      backgroundColor: "#5916DF",
      position: "absolute",
      bottom: "20%",
    };

    return explanted ? (
      <Button variant="contained" onClick={handleClose} style={styles}>
        <DeadIcon style={{height: '16px !important', width: '16px !important', top: "-1px",
    position: "relative"}}/> I found a mistake
      </Button>
    ) : (
      <IconButton
        ria-label="delete"
        color="error"
        onClick={onClickExplanted}
        style={styles}
      >
        <DeadIcon />
      </IconButton>
    );
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={onClick}
        style={{
          zIndex: 20000000000000,
          left: cursorPosition.x,
          top: cursorPosition.y,
          position: "absolute",
          display: display ? "inline-flex" : "none",
          padding: "7.5px 24px",
          justifyContent: "center",
          alignItems: "center",
          gap: "4px",
          borderRadius: "47px",
          background: "#5916DF",
          boxShadow: "0px 3px 14px 0px rgba(0, 0, 0, 0.18)",
          fontSize: "13px",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "normal",
        }}
      >
        <DeadIcon style={{height: '16px !important', width: '16px !important',
    position: "relative"}}/> I found a mistake
      </Button>
      <Dialog open={modalOpen} onClose={handleClose}>
        <form
          onSubmit={createNew}
          style={{
            display: "flex",
            width: "296px",
            padding: "10px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "20px",
            borderRadius: "7px",
            background: "#FFF",
            boxShadow: "0px 8px 17px 0px rgba(0, 0, 0, 0.07)",
          }}
        >
          <DialogContent>
            <div
              style={{
                width: "220px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="text"
                fullWidth
                variant="standard"
              />
              {explanted && (
                <TextField
                  onChange={(e) => setText(e.target.value)}
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Text"
                  type="text"
                  fullWidth
                  variant="standard"
                />
              )}
              <div
                style={{
                  display: "flex",
                  marginTop: "30px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  style={{
                    display: "flex",
                    padding: "7.5px 24px",
                    width: "90px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "47px",
                    border: "1px solid #8B4FFF",
                    color: "#5916DF",
                  }}
                  type="button"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  style={{
                    display: "flex",
                    padding: "7.5px 24px",
                    width: "90px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "4px",
                    borderRadius: "47px",
                    background: "#5916DF",
                    color: "white",
                  }}
                  type="submit"
                >
                  Send
                </Button>
              </div>
            </div>
          </DialogContent>
        </form>
      </Dialog>
      <ExplantedButton />
    </>
  );
}

export default App;
