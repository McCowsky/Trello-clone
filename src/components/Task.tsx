import { Draggable } from "@hello-pangea/dnd";
import React, { useContext } from "react";
import { dataContext } from "../context";
import { FiTrash2 } from "react-icons/fi";
import { ColumnType } from "../Types";

const Task = (props: any) => {
  const { columns, setColumns } = useContext(dataContext);

  const deleteTask = (id: string, columnId: string, index: number) => {
    const currentColumn = columns[columnId];
    currentColumn.items.splice(index, 1);

    setColumns((prevColumns: ColumnType) => ({
      ...prevColumns,
      [columnId]: {
        ...currentColumn,
        items: currentColumn.items,
      },
    }));
  };

  const changeTaskContent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentColumn = columns[props.columnId];
    currentColumn.items[props.index].content = event.target.value;
    setColumns((prevColumns: ColumnType) => ({
      ...prevColumns,
      [props.columnId]: {
        ...currentColumn,
        items: [...currentColumn.items],
      },
    }));
  };
  return (
    <Draggable key={props.item.id} draggableId={props.item.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-6   min-w-[150px] w-[88%]  aspect-[5/3] flex relative shadow-[0_10px_0px_0px_rgba(0,0,0,0.15)] text-black rounded-xl md:mr-3"
          //min-h-[50px]
          style={{
            background: snapshot.isDragging ? "gray" : "white",
            ...provided.draggableProps.style,
          }}
        >
          <textarea
            placeholder="+ Add some text"
            onChange={changeTaskContent}
            value={props.item.content}
            className="mx-5 mt-2 mb-8 md:my-8 md:mb-6 md:mt-2 md:mx-2 w-full resize-none lg:text-xs "
            style={{ background: snapshot.isDragging ? "gray" : "white" }}
          ></textarea>
          <button
            className="absolute bottom-[2px] right-3 z-20 "
            onClick={() => {
              deleteTask(props.item.id, props.columnId, props.index);
            }}
          >
            <FiTrash2 size={props.directionHorizontal ? "1.8em" : "1.2em"} />
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
