import axios from "axios";

import {USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_PERFORMANCE, USER_MAIN_DATA} from '../assets/mockedData';

const baseURL = "http://localhost:3000";
const prod = true;

/**
 * Calls the relevant function, according to the type of data we expect
 * @param {string} type - the type of data we want to get.
 * @param {Object} id - The  ID of the user.
 */
async function GetData(type, id) {
  let data;
  switch (type) {
    case "GetDailyActivity":
      data = GetDailyActivity({id});
      break;
    case "GetAverageSession":
      data = GetAverageSessionData({id});
      break;
    case "GetPerfData":
      data = GetPerformanceData({id});
      break;
    case "GetScoreData":
      data = GetScore({id});
      break;
    case "GetTotalsData":
      data = GetTotals({id});
      break;
    case "GetUser":
      data= GetUser({id});
      break;
    default:
      console.error("Aucun type trouvé");
      break;
  }
  return data;
}

/**
 * Fetches the user main data, either from a production version (API based) or a development version (mocked data).
 * @param {Object} id - The  ID of the user.
 */
async function GetUser({id}) {

  if (prod) {
    const { data } = await axios.get(`${baseURL}/user/${id}`).then(response => response);
    return data;
  } else {
    let index = USER_MAIN_DATA.findIndex(u => u.id.toString() === id.toString());
    return {data: USER_MAIN_DATA[index]};
  }
}

/**
 * Fetches the user activity data, either from a production version (API based) or a development version (mocked data).
 * @param {Object} id - The  ID of the user.
 */
async function GetDailyActivity({id}) {
  if (prod) { 
    const { data } = await axios.get(`${baseURL}/user/${id}/activity`).then(response => response);
    return data;
  } else {
    let index = USER_ACTIVITY.findIndex(u => u.userId.toString() === id.toString());
    return {data: USER_ACTIVITY[index]};
  }
}

/**
 * Fetches the user's average sessions data, either from a production version (API based) or a development version (mocked data).
 * @param {Object} id - The  ID of the user.
 */
async function GetAverageSessionData({id}) {
  if (prod) {
    const { data } = await axios.get(`${baseURL}/user/${id}/average-sessions`).then(response => response);
    return data;
  } else {
    let index = USER_AVERAGE_SESSIONS.findIndex(u => u.userId.toString() === id.toString());
    return {data: USER_AVERAGE_SESSIONS[index]};
  }
}

/**
 * Fetches the user performance data, either from a production version (API based) or a development version (mocked data).
 * @param {Object} id - The  ID of the user.
 */
async function GetPerformanceData({id}) {
  if (prod) { 
    const { data } = await axios.get(`${baseURL}/user/${id}/performance`).then(response => response);
    return data;
  } else {
    let index = USER_PERFORMANCE.findIndex(u => u.userId.toString() === id.toString());
    return {data: USER_PERFORMANCE[index]};
  }
}

/**
 * Fetches the user's score from user's main data, either from a production version (API based) or a development version (mocked data).
 * @param {Object} id - The  ID of the user.
 */
async function GetScore({id}) {
  if (prod) {
    const { data } = await axios.get(`${baseURL}/user/${id}`).then(response => response);
    return data;
  } else {
    let index = USER_MAIN_DATA.findIndex(u => u.id.toString() === id.toString());
    return {data: USER_MAIN_DATA[index]};
  }

}

/**
 * Fetches the user stats, either from a production version (API based) or a development version (mocked data).
 * @param {Object} id - The  ID of the user.
 */
async function GetTotals({id}) {
  if (prod) {
    const { data } = await axios.get(`${baseURL}/user/${id}`).then(response => response);
    return data;
  } else {
    let index = USER_MAIN_DATA.findIndex(u => u.id.toString() === id.toString());
    return {data: USER_MAIN_DATA[index]};
  }
}

export default GetData;