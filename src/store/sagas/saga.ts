import {call, put, takeLatest} from "redux-saga/effects";
import {fetchRepoInfo} from "./functionsForSaga";
import {fetchRepoInfoFailure, fetchRepoInfoSuccess, FETCH_REPO_INFO_REQUEST} from "../actions/actions";

function* fetchRepoInfoSaga(action) {
    try {
        const repoInfo = yield call(fetchRepoInfo, action.payload);
        yield put(fetchRepoInfoSuccess(repoInfo));
    } catch (error) {
        yield put(fetchRepoInfoFailure(error));
    }
}

export default function* repoSaga() {
    yield takeLatest(FETCH_REPO_INFO_REQUEST, fetchRepoInfoSaga);
}
