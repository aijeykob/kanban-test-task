import {FETCH_ISSUES_SUCCESS, FETCH_ISSUES_FAILURE} from "../actions/actions";
import {Issue} from "../../types";

interface IssuesState {
    error: Error | null;
    data: Issue[] | null;
}

const initialState: IssuesState = {
    error: null,
    data: null
};

type IssuesAction =
    | {type: typeof FETCH_ISSUES_SUCCESS; payload: Issue[]}
    | {type: typeof FETCH_ISSUES_FAILURE; payload: Error};

export default function issuesReducer(state = initialState, action: IssuesAction): IssuesState {
    switch (action.type) {
        case FETCH_ISSUES_SUCCESS:
            return {
                ...state,
                error: null,
                data: action.payload
            };
        case FETCH_ISSUES_FAILURE:
            return {
                ...state,
                error: action.payload,
                data: null
            };
        default:
            return state;
    }
}
