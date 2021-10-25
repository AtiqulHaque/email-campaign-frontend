import React from "react";
export default class CampaignSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let status = "";
    let class_prefix = "";
    if (this.props.data.status === 0) {
      status = "Going To Process";
      class_prefix = "card border-left-danger shadow h-100 py-2";
    } else if (this.props.data.status === 1) {
      status = "Processing";
      class_prefix = "card border-left-warning shadow h-100 py-2";
    } else {
      status = "Finished";
      class_prefix = "card border-left-success shadow h-100 py-2";
    }
    return (
      <a
        href={"/campaign-contacts/" + this.props.data.unique_identifier}
        id={this.props.data.unique_identifier}
        style={{ textDecoration: "none" }}
        className="col-xl-3 col-md-6 mb-4 linkable"
      >
        <div className={class_prefix}>
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs font-weight-bold text-primary text-uppercase mb-1 campaign_status">
                  {status}
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {this.props.data.campaigns_name} (
                  {this.props.data.total_contacts})
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-envelope-open-text fa-2x text-gray-300" />
              </div>
            </div>
          </div>
        </div>
      </a>
    );
  }
}
