// Define the shape of an issue returned from the GitHub API
export interface Issue {
    id: string;
    title: string;
    state: "open" | "closed";
    number: number; // Add this line
    created_at: string; // Add this line too if it's not present
    user: {
        login: string;
    }; // Update this line to match the provided code
    comments: number; // Add this line
    assignee?: {
        login: string;
    };
    repository?: {
        owner: {
            login: string;
        };
    };
}

export type Column = {
    name: string;
    items: Issue[];
};

export interface Repo {
    name: string;
    owner: {
        login: string;
        html_url: string;
    };
    stargazers_count: number;
    html_url: string;
}

export interface IssueBoardState {
    [repoUrl: string]: Column[];
}
