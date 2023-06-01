import React, { Component } from "react";
import { NewDraft } from "./new_draft";
import { JoinDraft } from "./join_draft";
import { DraftDetails } from "./details";

type Page = "main" | "details"

interface AppState {
 page: Page;
 id?: number;
 drafter?: string;
}

// Top-level component that displays the appropriate page.
export class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {page: "main", id: 0};
  }
  
  render = (): JSX.Element => {
    if (this.state.page === "details" && this.state.id !== undefined) {
      return (<DraftDetails id={this.state.id} drafter={this.state.drafter} onBack={this.handleBack}></DraftDetails>);
    } else {
      return (
              <table cellPadding={10} cellSpacing={0}>
                <tr>
                  <td valign="top">
                    <NewDraft onShow={this.handleShow}/>
                  </td>
                  <td></td>
                  <td valign="top">
                    <JoinDraft onShow={this.handleShow}/>
                  </td>
                </tr>
              </table>);
    }
  };

  handleBack = (): void => {
    this.setState({page: "main"});
  }

  handleShow = (id: number, drafter: string | undefined): void => {
    this.setState({page: "details", id: id, drafter: drafter});
  }

}
