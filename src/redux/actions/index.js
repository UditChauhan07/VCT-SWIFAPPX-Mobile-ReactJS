import axios from "axios";

export const fetchData = () => {
    return async (dispatch) => {
      dispatch({ type: 'FETCH_DATA_REQUEST' });
      try {
        const response = await axios.post('https://dev.swif.in/api/companies');
        console.log("data",response)
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_DATA_FAILURE', error: error.message });
      }
    };
  };
  
// export 