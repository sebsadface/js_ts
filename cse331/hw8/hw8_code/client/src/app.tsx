import React, { ChangeEvent, Component } from "react";
import { solid, split, Square, toJson } from './square';
import { Editor} from './editor';

interface AppState {
  // will probably need something here
  input?: string;
  fileName?: string;
}


export class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);

    this.state = {input: undefined, fileName: undefined};
  }
  
  render = (): JSX.Element => {
    // If they wanted this square, then we're done!
    const sq = split(solid("blue"), solid("orange"), solid("purple"), solid("red"));

    // TODO: replace this code with the commented out code below to use Editor
    // return <SquareElem width={600} height={600} square={sq}
    //           onClick={this.handleClick}/>;
    if (this.state.fileName) {
      return <Editor initialState={sq} onSave={this.handleSave} onClose={this.handleClose}/>
    } else { 
           return(
            <table>
              <tr><h2>Files</h2></tr>
              <tr>
                <td>
                  <label htmlFor="name">Name: </label> 
                    <input type="text" id="name" name="name" value={this.state.input} placeholder="Input file name here"
                      required
                        minLength={1} maxLength={16}
                        onChange={this.handleFileName}></input>
                </td>
                <td>
                  <button name="create" onClick={this.handleCreate}>Create</button>
                </td>
              </tr>
             </table>
            );
    }
  };
// TODO: add some functions to access routes and handle state changes probably

  handleCreate = (): void => {
    this.setState({fileName: this.state.input, input: undefined});
  };

  handleFileName = (evt: ChangeEvent<HTMLInputElement>) => {
    this.setState({input: evt.target.value});
  };

  handleSave = (root: Square): void => {
    if (this.state.fileName === undefined) {
      console.error("Save failed: invalid file name");
    }

    const url: string = "/api/save?name=" + this.state.fileName;

    fetch(url, {
    method: "POST",
    body: toJson(root)
    }).then(this.handleSaveResponse)
    .catch(this.handleServerError);
  }

  handleClose = (): void => {
    this.setState({fileName: undefined});
  }

  handleSaveResponse = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.handleSaveJson).catch(this.handleServerError);
    } else {
      this.handleServerError(res);
    }
  }

  handleSaveJson = (val: any): void => {
    if (typeof val !== "object" || val === null) {
      console.error("bad data from /save: not a record", val);
    }
  }

  handleServerError = (_: Response): void => {
    console.error("unknown error talking to server");
  }

}