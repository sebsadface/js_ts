import React, { Component} from 'react';


interface NewDraftProps {
  onShow: (id: number, drafter: string | undefined) => void;
}

interface NewDraftState {
  id?: number;
  drafter?: string;
  rounds?: number;
  options?: string;
  drafters?: string;  
}

export class NewDraft extends Component<NewDraftProps, NewDraftState> {

  constructor(props: NewDraftProps) {
    super(props);
    this.state = {};
  }

  render = (): JSX.Element => {
    return (<table cellPadding={5} cellSpacing={0}>
              <tr>
                <td>
                  <h2>Create New Draft</h2>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="drafterCreate">Drafter: </label> 
                 <input type="text" id="drafterCreate" name="drafterCreate" value={this.state.drafter} 
                        placeholder="Kevin"
                        minLength={0} maxLength={128} size={35} spellCheck={true}
                        onChange={this.handleDrafter}></input>
                </td>
              </tr>
              <tr>
                <td>
                   <label htmlFor="rounds">Rounds: </label>
                  <input type="number" id="rounds" name="rounds" value={this.state.rounds} placeholder='3'
                          min={0} max={1024} required onChange={this.handleRounds}></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="options">Options (one per line): </label>
                  <br></br>
                  <textarea id="options" name="options" value={this.state.options} 
                  placeholder= 'Snickers\nPayday\nTwizzlers\nGummy Bears\nHot Tomales\nSkittles\nSour Patch Kids'
                  minLength={1} maxLength={4096} required spellCheck={true}
                  autoFocus rows={30} cols={35} onChange={this.handleOptions}></textarea>
                </td>
                <td>
                   <label htmlFor="drafters">Drafters (one per line, in order): </label>
                   <br></br>
                  <textarea id="drafters" name="drafters" value={this.state.drafters}
                  placeholder= 'Kevin\nJames'
                  minLength={1} maxLength={4096} required spellCheck={true}
                  autoFocus rows={30} cols={35} onChange={this.handleDrafters}></textarea>
                </td>
              </tr>
              <tr>
                <td>
                  <button name="create" onClick={this.handleCreate}>Create</button>
                </td>
              </tr>
            </table>)
  }


  handleDrafter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({drafter: event.target.value});
  }

  handleRounds = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({rounds: parseInt(event.target.value)});
  }

  handleOptions = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({options: event.target.value});
  }

  handleDrafters = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({drafters: event.target.value});
  }

  handleCreate = (): void => {
  }
}
