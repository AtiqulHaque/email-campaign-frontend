import React from "react";
import DateTimePicker from "react-datetime-picker";
import { Toaster } from 'react-hot-toast';
import { connect } from "react-redux";
import { ErrorComponent } from "../components/ErrorComponent";
import { campaign } from "../_actions";
let moment = require("moment");

function mapDispatchToProps(dispatch) {
  return {
    createCampaign: (data, callback) =>
      dispatch(campaign.createCampaign(data, callback)),
  };
}

let getDefaultStates = () =>{
  return {
    campaigns_name: "",
    email_subject: "",
    email_body: "",
    schedule_time: new Date(),
    personalize_text: "",
    attachments: {},
    is_schedule: 0,
    textareaCursor : 0
  };
}

class CampaignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = getDefaultStates();

    this.handleSubmit           = this.handleSubmit.bind(this);
    this.changeHandler          = this.changeHandler.bind(this);
    this.handleInputChanged     = this.handleInputChanged.bind(this);
    this.handleScheduleChanged  = this.handleScheduleChanged.bind(this);
    this.handleDatetimeChanged  = this.handleDatetimeChanged.bind(this);
    this.handleSelectBox        = this.handleSelectBox.bind(this);
    this.handleTextArea         = this.handleTextArea.bind(this);
  }

  handleSelectBox(event) {
    if(event.target.value){
      let value = this.state.email_body.substring(0, this.state.textareaCursor);
      this.setState({
        [`email_body`]: value + event.target.value,
      });
    }
  }

  handleInputChanged(event) {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  }

  handleTextArea(event) {
    this.setState({
      [`${event.target.name}`]: event.target.value,
      textareaCursor : event.target.selectionStart
    });
  }

  handleScheduleChanged(event) {
    let isSchedule = this.state.is_schedule ? 0 : 1

    this.setState({
      is_schedule: isSchedule,
    });
  }

  handleDatetimeChanged(value) {
    this.setState({
      schedule_time: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
   
    formData.append("campaigns_name", this.state.campaigns_name);
    formData.append("is_schedule", this.state.is_schedule);
    formData.append("body", this.state.email_body);
    formData.append("subject", this.state.email_subject);
    formData.append(
      "scheduleDateTime",
      moment(this.state.schedule_time).format("YYYY-MM-DD hh:mm:ss a")
    );
    for (const key in this.state.attachments) {
      if (Object.hasOwnProperty.call(this.state.attachments, key)) {
        const element = this.state.attachments[key];
        formData.append("attachments", element);
      }
    }

    this.props.createCampaign(
      formData,
      function () {
        this.setState(getDefaultStates());
      }.bind(this)
    );

    return false;
  }

  changeHandler(event) {
    this.setState({ attachments: event.target.files });
  }
  

  render() {
  
    let DatePicker = () => {
      if (this.state.is_schedule) {
        return (
          <DateTimePicker
            minDate={new Date()}
            value={this.state.schedule_time}
            onChange={this.handleDatetimeChanged}
          />
        );
      } else {
        return "";
      }
    };

    return (
      <div className="row">
        <div className="col-md-6">
          <form className="was-validation" onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Campain Name
              </label>
              <input
                name="campaigns_name"
                type="text"
                value={this.state.campaigns_name}
                className="form-control"
                onChange={this.handleInputChanged}
                aria-describedby="emailHelp"
              />
              <ErrorComponent
                errors={this.props.errors}
                name="campaigns_name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Email Subject
              </label>
              <input
                type="text"
                value={this.state.email_subject}
                name="email_subject"
                className="form-control"
                onChange={this.handleInputChanged}
                id="exampleInputPassword1"
              />
              <ErrorComponent errors={this.props.errors} name="subject" />
            </div>
            <div className="mb-3">

            <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">
                      Email Body
                    </label>                
                  </div>  
                  <div className="col-md-6 mb-2">
                    <select onChange={this.handleSelectBox}  className="form-control">
                        <option value="">Select personalize text</option>
                        <option value="{{name}}">Name</option>
                        <option value="{{email}}">Email</option>
                    </select>
                  </div>
                </div>
              <textarea
               value={this.state.email_body}
                name="email_body"
                onChange={this.handleTextArea}
                className="form-control"
                rows="10"
              ></textarea>
              <ErrorComponent errors={this.props.errors} name="body" />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Is Schedule time
              </label>
              <input
                onChange={this.handleScheduleChanged}
                name="is_schedule"
                type="checkbox"
                className="form-check-input  inputCheck"
                value={this.state.is_schedule}
              />
              <br />
              {DatePicker()}
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Add contact CSV
              </label>
              <input
                onChange={this.changeHandler}
                type="file"
                multiple
                className="form-control-file"
                id="exampleFormControlFile1"
              />
              <ErrorComponent errors={this.props.errors} name="Attachments" />
            </div>
            <div className="mb-5">
            <button type="submit" className="btn btn-primary">
              {this.props.buttonText}
            </button>
            </div>
           
          </form>
          <Toaster />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { campaigns, loading, buttonText, errors } = state.campaign;
  return {
    loading,
    campaigns,
    buttonText,
    errors,
  };
}

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(CampaignForm);

export { connectedApp as CampaignForm };
