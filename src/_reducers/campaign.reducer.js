import { CampaignConstants } from "../_constants";

const initialState = {
  loading: false,
  campaigns: [],
  isAvailable: false,
  buttonText: "Create Campaign",
  message: "",
  contacts: [],
  errors: [],
};

export function campaign(state = initialState, action) {
  switch (action.type) {
    case CampaignConstants.LOADING:
      return Object.assign({}, state, {
        loading: action.payload,
      });

    case CampaignConstants.CAMPAIGN_LIST_SUCCESS:
      return Object.assign({}, state, {
        campaigns: action.payload,
        loading: action.loading,
      });
    case CampaignConstants.CAMPAIGN_CONTACT_LIST_SUCCESS:
      return Object.assign({}, state, {
        contacts: action.payload,
      });

    case CampaignConstants.AVAILABLE_SUCCESS:
      return Object.assign({}, state, {
        isAvailable: action.payload.isAvailable,
        buttonText: action.payload.buttonText,
        message: action.payload.message,
      });

    case CampaignConstants.CAMPAIGN_SUBMIT_LOADING:
      return Object.assign({}, state, {
        buttonText: action.payload.buttonText,
      });

    case CampaignConstants.CAMPAIGN_SUBMIT_SUCCESS:
      return Object.assign({}, state, {
        buttonText: state.buttonText,
        errors: action.payload,
        message: action.message,
      });
    case CampaignConstants.AVAILABLE_LOADING:
      return Object.assign({}, state, {
        buttonText: action.payload.buttonText,
      });
    case CampaignConstants.MESSAGE_SET:
      return Object.assign({}, state, {
        message: action.payload.message,
      });
    case CampaignConstants.CAMPAIGN_SUBMIT_VALIDATION_FAIL:
      return Object.assign({}, state, {
        errors: action.payload,
      });

    default:
      return state;
  }
}
