import {Repo} from "../../types";
import axios from "axios";
import {urlPattern} from "../../helpers";

export const fetchRepoInfo = async (repoUrl: string): Promise<Repo> => {
    if (!urlPattern.test(repoUrl)) {
        throw new Error("Invalid URL format");
    }
    try {
        const repoResponse = await axios.get<Repo>(
            `https://api.github.com/repos/${repoUrl.replace(urlPattern, "$4/$5")}`
        );
        return repoResponse.data;
    } catch (error) {
        const message = error.response.data.message || "An error occurred";
        throw new Error(message);
    }
};
