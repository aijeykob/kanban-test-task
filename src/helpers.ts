export function getTimeDifferenceString(currentDate, createdAt) {
    const timeDifference = Math.abs(currentDate.getTime() - createdAt.getTime());
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return `${daysDifference} day${daysDifference !== 1 ? "s" : ""} ago`;
}

export const urlPattern = /^(https?:\/\/)?(www\.)?(github\.com)\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9-]+)\/?$/;

export const githubApiBaseUrl = "https://api.github.com/repos/";

export const initialColumns = {
    toDo: {name: "To do", items: []},
    inProgress: {name: "In Progress", items: []},
    done: {name: "Done", items: []}
};
