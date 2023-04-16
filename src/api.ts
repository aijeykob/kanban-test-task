import axios from "axios";
import {Issue} from "./types";

export const fetchIssues = async (repoUrl: string): Promise<Issue[]> => {
    const urlPattern = /^(https?:\/\/)?(www\.)?(github\.com)\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)\/?$/;
    if (!urlPattern.test(repoUrl)) {
        throw new Error("Invalid URL format");
    }
    const perPage = 100; // 100 is the maximum allowed by the GitHub API
    const apiUrl = `https://api.github.com/repos/${repoUrl.replace(urlPattern, "$4/$5")}/issues?per_page=${perPage}`;
    try {
        const response = await axios.get<Issue[]>(apiUrl);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
};
