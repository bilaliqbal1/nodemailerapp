import { get } from "../../helpers/backend";
import { ALLMAILS } from "../../helpers/url_helper";
import { MAILS, MAILS_FAILED, MAILS_SUCCESS } from "./types";

export const allMails = () => async (dispatch) => {
  try {
    dispatch({
      type: MAILS,
    });
    const result = await get(ALLMAILS);
    return dispatch({
      type: MAILS_SUCCESS,
      payload: result,
    });
  } catch (error) {
    return dispatch({
      type: MAILS_FAILED,
      payload: error,
    });
  }
};
