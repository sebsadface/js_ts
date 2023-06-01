import React, { Component} from 'react';


interface JoinDraftProps {
  onShow: (id: number, drafter: string | undefined) => void;
}

interface JoinDraftState {
  id?: number;
  drafter?: string;
}

// Allows a user to join an existing draft.
export class JoinDraft extends Component<JoinDraftProps, JoinDraftState> {

  constructor(props: JoinDraftProps) {
    super(props);
    this.state = {};
  }

  render = (): JSX.Element => {
    return (<table cellPadding={5} cellSpacing={0}>
              <tr>
                <td>
                  <h2>Join Existing Draft</h2>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="drafterJoin">Drafter: </label> 
                 <input type="text" id="drafterJoin" name="drafterJoin" value={this.state.drafter} 
                        minLength={0} maxLength={128} size={35} spellCheck={true}
                        onChange={this.handleDrafter}></input>
                </td>
              </tr>
              <tr>
                <td>
                     <label htmlFor="id">Draft ID: </label>
                     <input type="number" id="id" name="id" value={this.state.id}
                                min={0} max={1024} required onChange={this.handleId}></input>
                </td>
              </tr>
              <tr>
                <td>
                    <button name="join" onClick={this.handleJoin}>Join</button>
                </td>
              </tr>
            </table>)
  }


  // Handle changes to the Drafter fields by updating the state.
  handleDrafter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({drafter: event.target.value});
  }

  // Handle changes to the Draft id fields by updating the state.
  handleId = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({id: parseInt(event.target.value)});
  }

  // Handle the join button by sending a id check request to the server.
  handleJoin = (): void => {
    if (this.state.id === undefined) {
      console.error("Join draft failed: id undefined");
      alert("Please enter a Draft ID");
      return;
    }

    const url: string = "/api/idcheck?id=" + encodeURIComponent(this.state.id);
    fetch(url).then(this.handleJoinResponse, this.handleServerError); 
    
  }

  // Handle the response to a join request.
  handleJoinResponse = (res: Response): void => {
    if (res.status === 200) {
        res.text().then(this.handleJoinSuccess).catch(this.handleServerError);
    } else {
        this.handleServerError(res);
    }
  }

  // Handle the response to a join request, jump to the details page if join succeeds.
  handleJoinSuccess = (val: any): void => {
    if (typeof val !== "string" || val === null) {
        console.error("Join draft failed: invalid response to checkid", val);
        return;
    }

    if (this.state.id === undefined) {
        console.error(" (this.state.id undefined) this should be impossible");
        return;
    }

    if (val === "true") {
        this.props.onShow(this.state.id, this.state.drafter);
    } else if (val === "false"){
        alert("Draft ID " + this.state.id + " does not exist");
    } else {
        console.error("this should be impossible, idcheck is neither true nor false", val);
    }
  }

  // Handle server errors by logging to the console.
  handleServerError = (res: Response): void => {
    console.error("unknown error from server:", res.statusText);
  }
}
