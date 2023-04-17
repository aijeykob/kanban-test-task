import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import RepoForm from "components/Header";
import RepoInfo from "components/RepoInfo";
import IssueBoard from "components/IssueBoard";

import "./app.css";
import {RootState} from "./store/store";
import {fetchIssuesRequest, fetchRepoInfoRequest} from "./store/actions/actions";
import {initialColumns} from "./helpers";
import {Issue} from "./types";

function App(): JSX.Element {
    const dispatch = useDispatch();
    const [repoUrl, setRepoUrl] = useState("");
    const [currentRepoUrl, setCurrentRepoUrl] = useState("");
    const [columns, setColumns] = useState(initialColumns);

    const repoData = useSelector((state: RootState) => state.repo.data);
    const repoError = useSelector((state: RootState) => state.repo.error);
    const issuesData = useSelector((state: RootState) => state.issues.data);

    useEffect(() => {
        if (currentRepoUrl && JSON.stringify(initialColumns) !== JSON.stringify(columns)) {
            const issueBoardState = JSON.parse(localStorage.getItem("issueBoardState")) || {};
            issueBoardState[currentRepoUrl] = columns;
            localStorage.setItem("issueBoardState", JSON.stringify(issueBoardState));
        }
    }, [columns, currentRepoUrl]);

    useEffect(() => {
        if (repoError) {
            toast.error(`Error: ${repoError}`);
        }
    }, [repoError]);

    useEffect(() => {
        if (issuesData) {
            const newTaskStatus = {
                toDo: {
                    name: "To do",
                    items: issuesData
                        .filter((issue: Issue) => issue.state === "open" && !issue.assignee)
                        .map((issue: Issue) => ({...issue, id: String(issue.id)}))
                },
                inProgress: {
                    name: "In Progress",
                    items: issuesData
                        .filter((issue: Issue) => issue.state === "open" && issue.assignee)
                        .map((issue: Issue) => ({...issue, id: String(issue.id)}))
                },
                done: {
                    name: "Done",
                    items: issuesData
                        .filter((issue: Issue) => issue.state === "closed")
                        .map((issue: Issue) => ({...issue, id: String(issue.id)}))
                }
            };
            setColumns(newTaskStatus);
        }
    }, [issuesData]);

    useEffect(() => {
        if (currentRepoUrl) {
            dispatch(fetchRepoInfoRequest(currentRepoUrl));
        }

        const issueBoardState = JSON.parse(localStorage.getItem("issueBoardState")) || {};

        if (
            currentRepoUrl &&
            issueBoardState[currentRepoUrl] &&
            Object.keys(issueBoardState[currentRepoUrl]).length > 0
        ) {
            setColumns(issueBoardState[currentRepoUrl]);
        } else {
            if (currentRepoUrl) {
                dispatch(fetchIssuesRequest(currentRepoUrl));
            }
        }
    }, [currentRepoUrl, dispatch]);

    const loadIssues = useCallback(() => {
        if (repoUrl !== currentRepoUrl) {
            setColumns(initialColumns);
        }
        setCurrentRepoUrl(repoUrl);
    }, [repoUrl, currentRepoUrl]);

    const handleUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let url = e.target.value.trim();
        if (url.endsWith("/")) {
            url = url.slice(0, -1);
        }
        setRepoUrl(url);
    }, []);

    return (
        <div>
            <div className="container">
                <RepoForm loadIssues={loadIssues} handleUrlChange={handleUrlChange} />
            </div>
            <div className="container repo-info-container">
                <RepoInfo repoData={repoData} />
            </div>
            <IssueBoard columns={columns} setColumns={setColumns} />
        </div>
    );
}

export default App;
