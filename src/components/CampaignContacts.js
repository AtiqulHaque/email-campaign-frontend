import MaterialTable from "material-table";
import React from "react";
import { connect } from "react-redux";
import { campaign } from "../_actions";
const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "campaign_indentifier",
    headerName: "Campaign Identifier",
    width: 350,
  },
  { field: "created_at", headerName: "Created", width: 200 },
  { field: "status", headerName: "Status", width: 200 },
  { field: "send_at", headerName: "Send at", width: 200 },
];

function mapDispatchToProps(dispatch) {
  return {
    getCampaignContacts: (id) => dispatch(campaign.getCampaignContacts(id)),
  };
}

class CampaignContacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCampaignContacts(this.props.match.params.identifier);
  }

  render() {
    return (
      <div style={{ height: 800, width: "100%" }}>
        
    <MaterialTable title="Employee Details" data={this.props.contacts} columns={columns} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { contacts, loading } = state.campaign;
  return {
    loading,
    contacts,
  };
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignContacts);
export { connectedApp as CampaignContacts };
