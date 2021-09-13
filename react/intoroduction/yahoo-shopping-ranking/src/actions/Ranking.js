import fetchJsomp from 'fetch-jsonp';
import qs from 'qs';

const API_URL = 'https://shopping.yahooapis.jp/ShoppingWebService/V1/json/categoryRanking'
const APP_ID = process.env.REACT_APP_APP_ID
console.log("APP_ID", APP_ID)

const startRequest = categoryID => ({
  type: 'START_REQUEST',
  payload: { categoryID },
});

const receiveData = (categoryID, error, response) => ({
  type: 'RECEVE_DATA',
  payload: { categoryID, error, response },
});

const finishRequest = categoryID => ({
  type: 'FINISH_REQUEST',
  payload: { categoryID },
});

export const fetchRanking = categoryID => {
  return async dispatch => {
    dispatch(startRequest(categoryID));

    const queryString = qs.stringify({
      appid: APP_ID,
      categoryID: categoryID,
    });

    try {
      const response = await fetchJsomp(`${API_URL}?${queryString}`);
      const data = await response.json();
      dispatch(receiveData(categoryID, null, data));
    } catch (err) {
      dispatch(receiveData(categoryID, err));
    }
    dispatch(finishRequest(categoryID));
  };
};
