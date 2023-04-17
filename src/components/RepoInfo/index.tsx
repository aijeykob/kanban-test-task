import React from "react";
import {Repo} from "../../types";

interface RepoInfoProps {
    repoData: Repo | null;
}

const RepoInfo: React.FC<RepoInfoProps> = ({repoData}) => {
    const repoUrl = repoData && repoData.html_url;
    const ownerUrl = repoData && repoData.owner && repoData.owner.html_url;
    return (
        <div className="repo-info" data-cy="repo-info">
            {repoData && (
                <>
                    {ownerUrl && (
                        <a href={ownerUrl} target="_blank" rel="noopener noreferrer">
                            {repoData.owner.login}
                        </a>
                    )}
                    {" > "}
                    <a href={repoUrl} target="_blank" rel="noopener noreferrer">
                        {repoData.name}
                    </a>
                    <span className="star-info">
                        <span className="star-icon">⭐</span>
                        {Math.round(repoData.stargazers_count / 1000)} K stars
                    </span>
                </>
            )}
        </div>
    );
};

export default RepoInfo;
