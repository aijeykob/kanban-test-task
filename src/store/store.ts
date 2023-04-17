import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import repoReducer from "./reducers/repoReducer";
import issuesReducer from "./reducers/issuesReducer"; // Импортируйте issuesReducer
import rootSaga from "./sagas/saga";

const rootReducer = combineReducers({
    repo: repoReducer,
    issues: issuesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const sagaMiddleware = createSagaMiddleware();

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
