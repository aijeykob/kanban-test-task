import {Repo, Issue} from "../../types";

export const FETCH_REPO_INFO_REQUEST = "FETCH_REPO_INFO_REQUEST";
export const FETCH_REPO_INFO_SUCCESS = "FETCH_REPO_INFO_SUCCESS";
export const FETCH_REPO_INFO_FAILURE = "FETCH_REPO_INFO_FAILURE";

export const FETCH_ISSUES_REQUEST = "FETCH_ISSUES_REQUEST";
export const FETCH_ISSUES_SUCCESS = "FETCH_ISSUES_SUCCESS";
export const FETCH_ISSUES_FAILURE = "FETCH_ISSUES_FAILURE";

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

export interface FetchIssuesRequestAction {
    type: typeof FETCH_ISSUES_REQUEST;
    payload: string;
}

export interface FetchIssuesSuccessAction {
    type: typeof FETCH_ISSUES_SUCCESS;
    payload: Issue[]; // Замените any на подходящий тип для данных события.
}

export interface FetchIssuesFailureAction {
    type: typeof FETCH_ISSUES_FAILURE;
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

export const fetchIssuesRequest = (repoUrl: string): FetchIssuesRequestAction => ({
    type: FETCH_ISSUES_REQUEST,
    payload: repoUrl
});

export const fetchIssuesSuccess = (issues): FetchIssuesSuccessAction => ({
    type: FETCH_ISSUES_SUCCESS,
    payload: issues
});

export const fetchIssuesFailure = (error: Error): FetchIssuesFailureAction => ({
    type: FETCH_ISSUES_FAILURE,
    payload: error
});
