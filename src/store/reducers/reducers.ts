import {FETCH_REPO_INFO_REQUEST, FETCH_REPO_INFO_SUCCESS, FETCH_REPO_INFO_FAILURE} from "../actions/actions";
import {Repo} from "../../types";

interface RepoState {
    loading: boolean;
    error: Error | null;
    data: Repo | null;
}

const initialState: RepoState = {
    loading: false,
    error: null,
    data: null
};

type RepoAction =
    | {type: typeof FETCH_REPO_INFO_REQUEST}
    | {type: typeof FETCH_REPO_INFO_SUCCESS; payload: Repo}
    | {type: typeof FETCH_REPO_INFO_FAILURE; payload: Error};

export default function repoReducer(state = initialState, action: RepoAction): RepoState {
    switch (action.type) {
        case FETCH_REPO_INFO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                data: null
            };
        case FETCH_REPO_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload
            };
        case FETCH_REPO_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: null
            };
        default:
            return state;
    }
}
