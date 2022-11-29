import Task from "./Task";
import { Droppable } from "@hello-pangea/dnd";
import { dataContext } from "../context";
import React, { useContext, useState, useEffect } from "react";
import * as uuid from "uuid";
import { ColumnProps, ColumnType } from "../Types";

const Column = (props: ColumnProps) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  function getWindowSize() {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
  let directionHorizontal: boolean = false;
  if (windowSize.innerWidth <= 867) {
    directionHorizontal = false;
  } else {
    directionHorizontal = true;
  }

  const { columns, setColumns } = useContext(dataContext);

  const addTask = (id: string) => {
    const sourceItemsPlusNew = [...columns[id].items, { id: uuid.v4(), content: "" }];

    setColumns((prevColumns: ColumnType) => ({
      ...prevColumns,
      [id]: {
        ...columns[id],
        items: sourceItemsPlusNew,
      },
    }));
  };

  const changeColumnName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const columnName = event.target.value;

    setColumns((prevColumns: ColumnType) => ({
      ...prevColumns,
      [props.columnId]: {
        ...columns[props.columnId],
        name: columnName,
      },
    }));
  };

  return (
    <div
      className="md:overflow-auto my-0 mx-auto w-full mr-5"
      //max-w-[423px] md:max-w-none
      key={props.columnId}
    >
      <div className="bg-[#F3F5F6] overflow-auto max-h-[calc(100vh-180px)]  ">
        {/* w-full md:w-auto  md:flex md:flex-col*/}
        <input
          maxLength={18}
          value={columns[props.columnId].name}
          onChange={changeColumnName}
          type="text"
          className="text-2xl font-semibold self-start text-[#313131] mt-5 md:my-3 md:pl-5 w-[88%] md:mx-0 block my-0 mx-auto bg-[#F3F5F6] lg:text-lg "
          //md:w-auto
        />
        <div className="w-full md:w-auto bg-[#F3F5F6] md:flex md:flex-row">
          <Droppable
            direction={directionHorizontal ? "vertical" : "horizontal"}
            droppableId={props.columnId}
            key={props.columnId}
          >
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver ? "lightblue" : "#F3F5F6",
                }}
                className="flex flex-col items-center md:flex-row pt-3 md:pt-0  md:pl-5 "
                //max-w-[423px] min-w-[175px]  md:max-w-full     md:min-w-0
              >
                {props.column.items.map((item: any, index: any) => (
                  <Task
                    item={item}
                    index={index}
                    key={item.id}
                    columnId={props.columnId}
                    directionHorizontal={directionHorizontal}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button
            className="block  min-w-[150px] w-[88%] my-0 mx-auto md:mx-0 md:w-0 aspect-[5/3]  border-dashed	border-[1px] border-black bg-white mb-5 hover:bg-[lightgray] lg:text-sm md:mr-5"
            //min-h-[50px] text-center
            onClick={() => {
              addTask(props.columnId);
            }}
          >
            + Add new card
          </button>
        </div>
      </div>
    </div>
  );
};

export default Column;
