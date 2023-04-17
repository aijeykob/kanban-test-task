import React from "react";
import {Draggable} from "react-beautiful-dnd";

import {Issue} from "../../types";
import {getTimeDifferenceString} from "../../helpers";

interface IssueItemProps {
    item: Issue;
    index: number;
}

const IssueItem: React.FC<IssueItemProps> = React.memo(function IssueItem({item, index}) {
    const {title, number, created_at, user, comments} = item;
    const currentDate = new Date();
    const createdAt = new Date(created_at);

    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div
                    data-cy="issue-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        userSelect: "none",
                        padding: 16,
                        borderRadius: 15,
                        margin: "0 0 8px 0",
                        minHeight: "50px",
                        backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                        color: "white",
                        ...provided.draggableProps.style
                    }}
                >
                    <p style={{fontWeight: "bold", wordWrap: "break-word"}}>{title}</p>
                    <p>
                        <p>
                            #{number} opened {getTimeDifferenceString(currentDate, createdAt)}
                        </p>
                    </p>
                    <p>
                        {user.login} | Comments: {comments}
                    </p>
                </div>
            )}
        </Draggable>
    );
});

export default IssueItem;
