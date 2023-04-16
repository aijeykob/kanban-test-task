import React, {useCallback} from "react";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {Dispatch, SetStateAction} from "react";
import {Column} from "../../types";
import IssueItem from "./IssueItem";

interface IssueBoardProps {
    columns: Record<string, Column>;
    setColumns: Dispatch<SetStateAction<Record<string, Column>>>;
}

const IssueBoard: React.FC<IssueBoardProps> = ({columns, setColumns}) => {
    const onDragEnd = useCallback((result, columns, setColumns) => {
        if (!result.destination) return;
        const {source, destination} = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            });
        }
    }, []);

    return (
        <div className="wrapper">
            <div className="wrapper-inner">
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([columnId, column]) => {
                        return (
                            <div className="column" key={columnId}>
                                <h2>{column.name}</h2>
                                <div style={{margin: 8}}>
                                    <Droppable droppableId={columnId} key={columnId}>
                                        {(provided, snapshot) => {
                                            return (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className="rounded-border"
                                                    style={{
                                                        background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                                                        padding: 10,
                                                        width: 300,
                                                        overflow: "auto",
                                                        borderRadius: "15px 15px",
                                                        height: "calc(100vh - 200px)"
                                                    }}
                                                >
                                                    {column.items.map((item, index) => {
                                                        return <IssueItem key={item.id} item={item} index={index} />;
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            );
                                        }}
                                    </Droppable>
                                </div>
                            </div>
                        );
                    })}
                </DragDropContext>
            </div>
        </div>
    );
};

export default IssueBoard;
