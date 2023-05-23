import React, { ChangeEvent, Component } from "react";
import { Square, Path, retrieveSq, replaceSq, split, solid, Color } from './square';
import { SquareElem } from "./square_draw";
import { nil, cons } from "./list";


interface EditorProps {
  /** Initial state of the file. */
  initialState: Square;
  onSave: (root: Square) => void;
  onClose: (root: Square) => void;
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
    if (this.state.selected) {
      const selectedsq: Square = retrieveSq(this.state.root, this.state.selected);
      if (selectedsq.kind === "solid") {
        return (<table cellPadding={10} cellSpacing={10}>
                  <tr>
                    <td>
                      <SquareElem width={600} height={600}
                        square={this.state.root} selected={this.state.selected}
                        onClick={this.handleClick}></SquareElem>
                    </td>
                    <td>
                      <table>
                        <tr>
                          <th colSpan={3}><h2>Tools</h2></th>
                        </tr>
                        <tr>
                          <td>
                            <button name="split" onClick={this.handleSplit}>Split</button>
                          </td>
                          <td>
                            <button name="merge" onClick={this.handleMerge}>Merge</button>
                          </td>
                          <td>
                            <select name="color" id="color-select" onChange={this.handleColorChange}>
                              <option value={selectedsq.color}>{selectedsq.color}</option>
                              <option value="white">white</option>
                              <option value="red">red</option>
                              <option value="orange">orange</option>
                              <option value="yellow">yellow</option>
                              <option value="green">green</option>
                              <option value="blue">blue</option>
                              <option value="purple">purple</option>
                            </select>
                          </td>
                        </tr>
                        <tr></tr>
                        <tr>
                          <td>
                            <button name="save" onClick={() => this.props.onSave(this.state.root)}>Save</button>
                          </td>
                          <td>
                            <button name="close" onClick={() => this.props.onClose(this.state.root)}>Close</button>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>);
      } else {
        return <p><b>Error: Invalid Selection</b></p>;
      }
    } else {
      return (<table cellPadding={10} cellSpacing={10}>
                <tr>
                  <td>
                    <SquareElem width={600} height={600}
                        square={this.state.root} selected={this.state.selected}
                        onClick={this.handleClick}></SquareElem>
                  </td>
                  <td>
                    <table>
                        <tr>
                          <th colSpan={3}><h2>Tools</h2></th>
                        </tr>
                        <tr>
                          <td>
                            <button name="save" onClick={() => this.props.onSave(this.state.root)}>Save</button>
                          </td>
                          <td></td>
                          <td>
                            <button name="close" onClick={() => this.props.onClose(this.state.root)}>Close</button>
                          </td>
                        </tr>
                  </table>
                  </td>
                </tr>
              </table>);
    }
  };

  handleClick = (path: Path): void => {
    // TODO: remove this code, do something with the path to the selected square
    this.setState({selected: path});
  }
  
  handleSplit = (): void => {
    // TODO: implement
    if (this.state.selected === undefined) {
      console.error("handleSplit failed: nothing is selected", this.state.selected);
      return;
    }
    const target: Square = retrieveSq(this.state.root, this.state.selected);
    const newroot: Square = replaceSq(this.state.root, this.state.selected, split(target, target, target, target));
    this.setState({root: newroot, selected: undefined});
  };

  handleMerge = (): void => {
    // TODO: implement
    if (this.state.selected === undefined) {
      console.error("handleMerge failed: nothing is selected", this.state.selected);
      return;
    }
    const selected: Square = retrieveSq(this.state.root, this.state.selected);
    const targetPath: Path = getParent(this.state.selected);
    const newroot: Square = replaceSq(this.state.root, targetPath, selected);
    this.setState({root: newroot, selected: undefined});
  };

  handleColorChange = (evt: ChangeEvent<HTMLSelectElement>): void => { // TODO: you may want to add parameter(s)
    // TODO: implement
    if (this.state.selected === undefined) {
      console.error("handleColorChange failed: nothing is selected", this.state.selected);
      return;
    }
    const newroot: Square = replaceSq(this.state.root, this.state.selected, solid(evt.target.value as Color));
    this.setState({root: newroot, selected: undefined});
  };
}

function getParent (path: Path): Path {
  if (path === nil) {
    return path;
  } else if (path.tl === nil) {
    return nil;
  } else if (path.tl.tl === nil) {
    return cons(path.hd, nil);
  } else {
    return cons(path.hd, getParent(path.tl));
  }
}
