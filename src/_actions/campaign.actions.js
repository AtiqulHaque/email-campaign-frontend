import toast from 'react-hot-toast';
import { CampaignConstants } from "../_constants";


export const campaign = {
  loadDashboard,
  createCampaign,
  getCampaignContacts,
};

const BASE_URL = "http://65.0.86.72:3000";

const getCampaignListSuccess = (lists) => ({
  type: CampaignConstants.CAMPAIGN_LIST_SUCCESS,
  payload: lists,
  loading: false,
});

const getCampaignContactList = (lists) => ({
  type: CampaignConstants.CAMPAIGN_CONTACT_LIST_SUCCESS,
  payload: lists,
});

const campaignLoading = (msg) => ({
  type: CampaignConstants.LOADING,
  payload: true,
});

const setButtonText = (msg) => ({
  type: CampaignConstants.CAMPAIGN_SUBMIT_LOADING,
  payload: { buttonText: msg },
});

const campaignSubmitSuccess = (msg) => ({
  type: CampaignConstants.CAMPAIGN_SUBMIT_SUCCESS,
  payload: { buttonText: "Submit" },
  message: "Campaign Creation start",
});

const setValidationError = (payload) => ({
  type: CampaignConstants.CAMPAIGN_SUBMIT_VALIDATION_FAIL,
  payload: payload,
});

function loadDashboard() {
  return (dispatch) => {
    dispatch(campaignLoading());

    fetch(BASE_URL + "/campaign/lists")
      .then((response) => response.json())
      .then((data) => {
        dispatch(getCampaignListSuccess(data.payload));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

function getCampaignContacts(id) {
  return (dispatch) => {
    fetch(BASE_URL + "/campaign/contact/lists/" + id)
      .then((response) => response.json())
      .then((data) => {
        dispatch(getCampaignContactList(data.payload));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

function createCampaign(params, callback) {
  const requestOptions = {
    method: "POST",
    body: params,
  };

  return (dispatch) => {
    dispatch(setButtonText("Please wait & Processing...."));
    
    fetch(BASE_URL + "/campaign/add", requestOptions).then((response) => {
      return response.text().then((text) => {
        const data = JSON.parse(text);

        if (data.status === "validation-error") {
          toast.error('Please check all the fields creafully.');
          dispatch(setButtonText("Submit again"));
          dispatch(setValidationError(data.payload));

          if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
          }
          // If validation error occured then no need 
          // to reamove already submited value
        }

        dispatch(setButtonText("Submit"));
        dispatch(campaignSubmitSuccess());
        toast.success('Campaign successfully created!');
        callback();
      });
    });
  };
}
