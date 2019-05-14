import * as actionTypes from "./actionTypes";
import { localSetItem, queryFuzzy } from "../../Utils/Utils";

const defautValue = {
  inputValue: "",
  allList: [],
  list: [],
  updateListValue: ""
};

export default (state = defautValue, action) => {
  switch (action.type) {
    case actionTypes.INIT_INPUT_VALUE:
      let newState = JSON.parse(JSON.stringify(state));
      newState.allList = [...action.value];
      newState.list = [...newState.allList];
      return newState;
    case actionTypes.GET_INPUT_VALUE:
      let newState1 = JSON.parse(JSON.stringify(state));
      newState1.inputValue = action.value;
      return newState1;
    case actionTypes.ADD_INPUT_VALUE:
      let newState2 = JSON.parse(JSON.stringify(state));
      newState2.allList.push(state.inputValue);
      localSetItem("allList", newState2.allList);
      newState2.list = [...newState2.allList];
      newState2.inputValue = "";
      return newState2;
    case actionTypes.DELETE_INPUT_VALUE:
      let newState3 = JSON.parse(JSON.stringify(state));
      const index = state.allList.findIndex(item => action.value === item);
      newState3.allList.splice(index, 1);
      localSetItem("allList", newState3.allList);
      newState3.list = [...newState3.allList];
      newState3.inputValue = "";
      return newState3;
    case actionTypes.SELECT_INPUT_VALUE:
      let newState4 = JSON.parse(JSON.stringify(state));
      if (!action.value) {
        newState4.list = [...state.allList];
        return newState4;
      } else {
        newState4.list = [...queryFuzzy(newState4.allList, action.value)];
        return newState4;
      }
    case actionTypes.CLICK_LIST:
      let newState5 = JSON.parse(JSON.stringify(state));
      newState5.updateListValue = state.allList[action.value];
      return newState5;
    case actionTypes.UPDATE_LIST_VALUE:
      let newState6 = JSON.parse(JSON.stringify(state));
      newState6.updateListValue = action.value;
      return newState6;
    case actionTypes.SAVE_LIST_VALUE:
      let newState7 = JSON.parse(JSON.stringify(state));
      newState7.allList[action.value] = state.updateListValue;
      localSetItem("allList", newState7.allList);
      newState7.list = [...newState7.allList];
      return newState7;
    default:
      return state;
  }
};
