import {Repo} from "../../types";

export const FETCH_REPO_INFO_REQUEST = "FETCH_REPO_INFO_REQUEST";
export const FETCH_REPO_INFO_SUCCESS = "FETCH_REPO_INFO_SUCCESS";
export const FETCH_REPO_INFO_FAILURE = "FETCH_REPO_INFO_FAILURE";

export interface FetchRepoInfoRequestAction {
    type: typeof FETCH_REPO_INFO_REQUEST;
    payload: string;
}

export interface FetchRepoInfoSuccessAction {
    type: typeof FETCH_REPO_INFO_SUCCESS;
    payload: Repo;
}

export interface FetchRepoInfoFailureAction {
    type: typeof FETCH_REPO_INFO_FAILURE;
    payload: Error;
}

export const fetchRepoInfoRequest = (repoUrl: string): FetchRepoInfoRequestAction => ({
    type: FETCH_REPO_INFO_REQUEST,
    payload: repoUrl
});

export const fetchRepoInfoSuccess = (repoInfo: Repo): FetchRepoInfoSuccessAction => ({
    type: FETCH_REPO_INFO_SUCCESS,
    payload: repoInfo
});

export const fetchRepoInfoFailure = (error: Error): FetchRepoInfoFailureAction => ({
    type: FETCH_REPO_INFO_FAILURE,
    payload: error
});
