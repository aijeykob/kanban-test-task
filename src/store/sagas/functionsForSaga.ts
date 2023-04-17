import {Issue, Repo} from "../../types";
import axios from "axios";
import {urlPattern, githubApiBaseUrl} from "../../helpers";

export const fetchRepoInfo = async (repoUrl: string): Promise<Repo> => {
    if (!urlPattern.test(repoUrl)) {
        throw new Error("Invalid URL format");
    }
    try {
        const repoResponse = await axios.get<Repo>(`${githubApiBaseUrl}${repoUrl.replace(urlPattern, "$4/$5")}`);
        return repoResponse.data;
    } catch (error) {
        const message = error.response.data.message || "An error occurred";
        throw new Error(message);
    }
};

export const fetchIssues = async (repoUrl: string): Promise<Issue[]> => {
    if (!urlPattern.test(repoUrl)) {
        throw new Error("Invalid URL format");
    }
    const perPage = 100; // 100 is the maximum allowed by the GitHub API
    const apiUrl = `${githubApiBaseUrl}${repoUrl.replace(urlPattern, "$4/$5")}/issues?per_page=${perPage}`;
    try {
        const response = await axios.get<Issue[]>(apiUrl);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
};
