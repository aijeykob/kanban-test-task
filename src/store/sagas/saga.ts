import {call, put, takeLatest} from "redux-saga/effects";
import {fetchRepoInfo, fetchIssues} from "./functionsForSaga";
import {
    fetchRepoInfoFailure,
    fetchRepoInfoSuccess,
    fetchIssuesSuccess,
    fetchIssuesFailure,
    FETCH_REPO_INFO_REQUEST,
    FETCH_ISSUES_REQUEST
} from "../actions/actions";

function* fetchRepoInfoSaga(action) {
    try {
        const repoInfo = yield call(fetchRepoInfo, action.payload);
        yield put(fetchRepoInfoSuccess(repoInfo));
    } catch (error) {
        yield put(fetchRepoInfoFailure(error));
    }
}

function* fetchIssuesSaga(action) {
    try {
        const issues = yield call(fetchIssues, action.payload);
        yield put(fetchIssuesSuccess(issues));
    } catch (error) {
        yield put(fetchIssuesFailure(error));
    }
}

export default function* rootSaga() {
    yield takeLatest(FETCH_REPO_INFO_REQUEST, fetchRepoInfoSaga);
    yield takeLatest(FETCH_ISSUES_REQUEST, fetchIssuesSaga);
}
