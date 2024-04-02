import { combineReducers } from "redux";
import {companyModule} from "./company/company.reducer";
import {userModule} from "./user/user.reducer";

const rootReducer = combineReducers({ companyModule,userModule });
export default rootReducer;
