import React, { Component } from "react";
import { NewDraft } from "./new_draft";
import { JoinDraft } from "./join_draft";

type Page = "main" | "pick"

interface AppState {
 page: Page;
}

export class App extends Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {page: "main"};
  }
  
  render = (): JSX.Element => {
    if (this.state.page === "pick") {
      return <p>hi</p>
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

  handleShow = (id: number, drafter: string | undefined): void => {
    console.log(id, drafter);
  }

}
