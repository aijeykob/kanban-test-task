import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchIssues} from "./api";
import {toast} from "react-toastify";
import RepoForm from "components/Header";
import RepoInfo from "components/RepoInfo";
import IssueBoard from "components/IssueBoard";

import "./app.css";
import {RootState} from "./store/store";
import {fetchRepoInfoRequest} from "./store/actions/actions";

const initialColumns = {
    toDo: {name: "To do", items: []},
    inProgress: {name: "In Progress", items: []},
    done: {name: "Done", items: []}
};

function App() {
    const dispatch = useDispatch();
    const [repoUrl, setRepoUrl] = useState("");
    const [currentRepoUrl, setCurrentRepoUrl] = useState("");
    const [columns, setColumns] = useState(initialColumns);

    const repoData = useSelector((state: RootState) => state.repo.data);
    const repoError = useSelector((state: RootState) => state.repo.error);

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
        async function fetchData() {
            try {
                const issues = await fetchIssues(currentRepoUrl);
                const newTaskStatus = {
                    toDo: {
                        name: "To do",
                        items: issues
                            .filter((issue) => issue.state === "open" && !issue.assignee)
                            .map((issue) => ({...issue, id: String(issue.id)}))
                    },
                    inProgress: {
                        name: "In Progress",
                        items: issues
                            .filter((issue) => issue.state === "open" && issue.assignee)
                            .map((issue) => ({...issue, id: String(issue.id)}))
                    },
                    done: {
                        name: "Done",
                        items: issues
                            .filter((issue) => issue.state === "closed")
                            .map((issue) => ({...issue, id: String(issue.id)}))
                    }
                };
                setColumns(newTaskStatus);
            } catch (error) {
                console.error("Error fetching issues:", error);
            }
        }

        const issueBoardState = JSON.parse(localStorage.getItem("issueBoardState")) || {};
        if (currentRepoUrl) dispatch(fetchRepoInfoRequest(currentRepoUrl));
        if (
            currentRepoUrl &&
            issueBoardState[currentRepoUrl] &&
            Object.keys(issueBoardState[currentRepoUrl]).length > 0
        ) {
            setColumns(issueBoardState[currentRepoUrl]);
        } else {
            if (currentRepoUrl) {
                fetchData();
            }
        }
    }, [currentRepoUrl, dispatch]);

    const loadIssues = () => {
        if (repoUrl !== currentRepoUrl) {
            setColumns(initialColumns);
        }
        setCurrentRepoUrl(repoUrl);
    };

    const handleUrlChange = (e) => {
        let url = e.target.value.trim();
        if (url.endsWith("/")) {
            url = url.slice(0, -1);
        }
        setRepoUrl(url);
    };

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
