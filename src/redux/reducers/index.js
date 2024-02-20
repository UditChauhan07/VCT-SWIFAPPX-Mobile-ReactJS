import {combineReducers} from "redux";
import companyReducer from "./api/apiCalls"

const rootReducer=combineReducers({companyReducer})
export default rootReducer;