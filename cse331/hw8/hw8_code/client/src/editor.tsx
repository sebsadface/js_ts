import React, { Component } from "react";
import { Square, Path  } from './square';
import { SquareElem } from "./square_draw";


interface EditorProps {
  /** Initial state of the file. */
  initialState: Square;
}


interface EditorState {
  /** The root square of all squares in the design */
  root: Square;

  /** Path to the square that is currently clicked on, if any */
  selected?: Path;
}


export class Editor extends Component<EditorProps, EditorState> {

  constructor(props: any) {
    super(props);

    this.state = { root: props.initialState };
  }

  render = (): JSX.Element => {
    // TODO: add some editing tools here
    return <SquareElem width={600} height={600}
                      square={this.state.root} selected={this.state.selected}
                      onClick={this.handleClick}></SquareElem>;
  };

  handleClick = (path: Path): void => {
    // TODO: remove this code, do something with the path to the selected square
    console.log(path);
    alert("Stop that!");
  }

  handleSplit = (): void => {
    // TODO: implement
  };

  handleMerge = (): void => {
    // TODO: implement
  };

  handleColorChange = (): void => { // TODO: you may want to add parameter(s)
    // TODO: implement
  };
}
