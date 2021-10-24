import React from "react";
import { connect } from "react-redux";
import { campaign } from "../_actions";
import CampaignSingle from "./CampaignSingle";
import Loading from "./Loader";
function mapDispatchToProps(dispatch) {
  return {
    loadDashBoard: (article) => dispatch(campaign.loadDashboard(article)),
  };
}
class CampaignSummary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loadDashBoard();
  }

  render() {
    let container = [];
    this.props.campaigns.map((data, index) => {
      return container.push(<CampaignSingle key={index} data={data} />);
    });

    return (
      <div className="row">{this.props.loading ? <Loading /> : container}</div>
    );
  }
}

function mapStateToProps(state) {
  const { campaigns, loading } = state.campaign;
  return {
    loading,
    campaigns,
  };
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignSummary);
export { connectedApp as CampaignSummary };
