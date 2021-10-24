import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CampaignContacts } from "./CampaignContacts";
import { CampaignForm } from "./CampaignForm";
import { CampaignSummary } from "./CampaignSummary";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      errors: [],
    };
  }

  render() {
    return (
      <Router>
        <Route path="/" exact component={CampaignSummary} />
        <Route path="/campaign-lists" component={CampaignLists} />
        <Route path="/campaign-add" component={CampaignForm} />
        <Route
          path="/campaign-contacts/:identifier"
          component={CampaignContacts}
        />
      </Router>
    );
  }
}

function CampaignLists() {
  return <h1 className="h3 mb-4 text-gray-800">Blank Page</h1>;
}

export { App };
