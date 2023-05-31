import React, { Component} from 'react';


interface JoinDraftProps {
  onShow: (id: number, drafter: string | undefined) => void;
}

interface JoinDraftState {
  id?: number;
  drafter?: string;
}

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
                        placeholder="Kevin"
                        minLength={0} maxLength={128} size={35} spellCheck={true}
                        onChange={this.handleDrafter}></input>
                </td>
              </tr>
              <tr>
                <td>
                     <label htmlFor="id">Draft ID: </label>
                     <input type="number" id="id" name="id" value={this.state.id} placeholder='0'
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


  handleDrafter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({drafter: event.target.value});
  }

  handleId = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({id: parseInt(event.target.value)});
  }

  handleJoin = (): void => {
  }
}
