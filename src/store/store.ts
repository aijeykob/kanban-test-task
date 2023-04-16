import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga";
import repoReducer from "./reducers/reducers";
import repoSaga from "./sagas/saga";

const rootReducer = combineReducers({
    repo: repoReducer
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

sagaMiddleware.run(repoSaga);

export default store;
