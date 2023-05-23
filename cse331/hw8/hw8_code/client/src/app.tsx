import React, { ChangeEvent, Component, MouseEvent } from "react";
import { fromJson, solid, split, Square, toJson } from './square';
import { Editor} from './editor';

interface AppState {
  // will probably need something here
  input?: string;
  fileName?: string;
  files?: ReadonlyArray<JSX.Element>;
  square: Square;
}


export class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);

    this.state = {input: undefined, fileName: undefined, square: split(solid("blue"), solid("orange"), solid("purple"), solid("red"))};
  }

  componentDidMount = () =>{
      fetch("/api/list").then(this.handleList).catch(this.handleServerError);
  };
  
  render = (): JSX.Element => {
    // If they wanted this square, then we're done!
    //const sq = split(solid("blue"), solid("orange"), solid("purple"), solid("red"));

    // TODO: replace this code with the commented out code below to use Editor
    // return <SquareElem width={600} height={600} square={sq}
    //           onClick={this.handleClick}/>;

    if (this.state.files === undefined) {
      return <p>Loading...</p>;
    } else if (this.state.fileName) {
      return <Editor initialState={this.state.square} onSave={this.handleSave} onClose={this.handleClose}/>
    } else { 
           return(
            <table>
              <tr><h2>Files</h2></tr>
              <tr>
                <ul>
                  {this.state.files}
                </ul>
              </tr>
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

  handleList = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.handleListJson).catch(this.handleServerError);
    } else {
      this.handleServerError(res);
    }
  }; 

  handleListJson = (vals: any): void => {
    if (typeof vals !== "object" || vals === null || !('names' in vals) ||
        !Array.isArray(vals.names)) {
      console.error("bad data from /list: no names", vals)
      return;
    }

    const files: JSX.Element[] = [];
    for (const val of vals.names) {
      if (val !== undefined) {
        files.push(
          <li key={val}>
            <a href="#" onClick={(evt) => this.handleClick(evt, val)}>{val}</a>
          </li>);
      }
    }
    this.setState({files: files});
  }

  handleClick = (evt: MouseEvent<HTMLAnchorElement>, val: string): void => {
    evt.preventDefault();
    fetch("/api/load?name=" + val).then(this.handleLoad).catch(this.handleServerError);
  };

  handleLoad = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.handleLoadJson).catch(this.handleServerError);
    } else {
      this.handleServerError(res);
    }
  }

  handleLoadJson = (vals: any): void => {
    if (typeof vals !== "object" || vals === null || !('name' in vals) || !('content' in vals)) {
      console.error("bad data from /load: no squares", vals)
      return;
    }
    this.setState({fileName: vals.name, square: fromJson(vals.content)});
  }

  handleCreate = (): void => {
    this.setState({fileName: this.state.input, input: undefined});
  };

  handleFileName = (evt: ChangeEvent<HTMLInputElement>) => {
    this.setState({input: evt.target.value});
  };

  handleSave = (root: Square): void => {
    if (this.state.fileName === undefined) {
      console.error("Save failed: invalid file name");
      return;
    }
    const url: string = "/api/save?name=" + encodeURIComponent(this.state.fileName);

    fetch(url, {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"content": toJson(root)})
    }).then(this.handleSaveResponse)
    .catch(this.handleServerError);
  }

  handleClose = (root: Square): void => {
    this.handleSave(root);
    fetch("/api/list").then(this.handleList).catch(this.handleServerError);
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