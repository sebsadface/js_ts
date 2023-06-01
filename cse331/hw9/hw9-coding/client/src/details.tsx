import React, { Component} from 'react';

interface DraftDetailsProps {
  id: number;
  drafter?: string;
  onBack: () => void;
}

interface DraftDetailsState {
    picks?: ReadonlyArray<JSX.Element>;
    availableOps?: ReadonlyArray<JSX.Element>;
    currentRound?: number;
    complete: boolean;
    currentPick: string;
    currentDrafter?: string;
}

export class DraftDetails extends Component<DraftDetailsProps, DraftDetailsState> {

  constructor(props: DraftDetailsProps) {
    super(props);
    this.state = {complete: false, currentPick: "--Please pick an item--"};
  }

  componentDidMount = (): void => {
    this.handleRefresh();
    this.autoRefresh();
  }

  render = (): JSX.Element => {
    if (this.state.picks === undefined) {
        return <p>Loading...</p>;
    } else {
        return (<table cellPadding={3} cellSpacing={0}>
                <tr>
                    <td colSpan={3}>
                        <h2>Status of Draft {this.props.id}</h2>
                    </td>
                </tr>
                    <tr>
                        <td>
                            <th>Num</th>
                        </td>
                        <td>
                            <th>Pick</th>
                        </td>
                        <td>
                            <th>Drafter</th>
                        </td>
                    </tr>
                    {this.state.picks}
                    <tr><td colSpan={3}></td></tr>
                    <tr><td colSpan={3}></td></tr>
                    <tr><td colSpan={3}></td></tr>
                    <tr><td colSpan={3}></td></tr>
                    {this.displayStatus()}
                </table>);
    }
  }

  autoRefresh = (): void => {
    setInterval(this.handleRefresh, 5000);
  }
   
  displayStatus = (): JSX.Element[] => {
    if (this.state.complete) {
        return ([
            <tr>
                <td colSpan={3}>
                    Draft is complete!
                </td>
            </tr>
        ]);
    } if (this.props.drafter === undefined || this.state.currentDrafter !== this.props.drafter) {
       return ([
        <tr>
            <td colSpan={3}>
                Round: {this.state.currentRound}
            </td>
        </tr>,
        <tr>
            <td colSpan={3}>
                Waiting for {this.state.currentDrafter} to pick...
            </td>
        </tr>,
        <tr></tr>,
        <tr>
            <td colSpan={3}>
                <button name="refresh" onClick={this.handleRefresh}>Refresh</button>
            </td>
            <td></td>
            <td>
                <button name="back" onClick={this.props.onBack}>Back</button>
            </td>
        </tr>
       ]);
    } else {
        return ([
            <tr>
                <td colSpan={3}>
                    Round: {this.state.currentRound}
                </td>
            </tr>,
            <tr>
                <td colSpan={3}>It's your pick!</td>
            </tr>,
            <tr></tr>,
            <tr>
                <td colSpan={3}>
                    <select id="options" name="options" onChange={this.handleSelect}>
                        <option value={this.state.currentPick}>{this.state.currentPick}</option>
                        {this.state.availableOps}
                    </select>
                </td>
                <td>
                    <button name="pick" onClick={this.handlePick}>Draft</button>
                </td>
                <td>
                    <button name="back" onClick={this.props.onBack}>Back</button>
                </td>
            </tr>
        ]);
    }
  }

  handlePick = (): void => {
    if (this.state.currentPick === "--Please pick an item--") {
        console.error("Draft failed: no item selected");
        alert("Please select an item to draft");
        return;
    }

    if (this.props.drafter === undefined) {
        console.error("(should be impossible) picked with no drafter");
        return;
    }

    const url: string = "/api/pick?id=" + encodeURIComponent(this.props.id) + 
                        "&drafter=" + encodeURIComponent(this.props.drafter) + 
                        "&option=" + encodeURIComponent(this.state.currentPick);

    fetch(url).then(this.handleList).catch(this.handleServerError);
  }

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({currentPick: event.target.value});
  }

  handleRefresh = (): void => {
    const url: string = "/api/list?id=" + encodeURIComponent(this.props.id);
    fetch(url).then(this.handleList).catch(this.handleServerError);
  }

  handleList = (res: Response): void => {
    if (res.status === 200) {
      res.json().then(this.handleListJson).catch(this.handleServerError);
    } else {
      this.handleServerError(res);
    }
  }

  handleListJson = (val: any): void => {
    if (typeof val !== "object" || val === null) {
      console.error("bad data from server /list: not a record", val);
      return;
    }

    if (!('id' in val) || !('rounds' in val) || !('drafters' in val) || 
        !('options' in val) || !('picks' in val) || !('availableOps' in val)|| 
        !('currentDrafter' in val) || !('complete' in val) || !('currentRound' in val)) {
        console.error("bad data from server /list: missing fields", val);
        return;
    }

    const picks: JSX.Element[] = [];
    for (const pick of val.picks) {
        picks.push(
            <tr>
                <td>
                    {pick.num}
                </td>
                <td>
                    {pick.option}
                </td>
                <td>
                    {pick.drafter}
                </td>
            </tr>
        )
    }
    const availableOps: JSX.Element[] = [];
    for (const op of val.availableOps) {
        availableOps.push(<option value={op}>{op}</option>);
    }

    this.setState({picks: picks, availableOps: availableOps, currentRound: val.currentRound,
                   complete: val.complete, currentDrafter: val.currentDrafter});
  }

  handleServerError = (res: Response): void => {
    console.error("unknown error talking to server: ", res.statusText);
  }
}
