import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import React, { useState, useEffect } from "react";
import dataset from "./dataset";
import Column from "./components/Column";
import Nav from "./components/Nav";
import { dataContext } from "./context";
import { ColumnType } from "./Types";

function App() {
  const [columns, setColumns] = useState<ColumnType>(() => {
    const items: ColumnType = JSON.parse(
      localStorage.getItem("dataColumns") || JSON.stringify(dataset.columns)
    );
    return items;
  });

  useEffect(() => {
    localStorage.setItem("dataColumns", JSON.stringify(columns));
  }, [columns]);

  const onDragEnd = (result: DropResult) => {
    console.log(result);

    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn = columns[source.droppableId];
    const sourceItems = [...sourceColumn.items];

    if (source.droppableId !== destination.droppableId) {
      const destColumn = columns[destination.droppableId];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setColumns((prevColumns: ColumnType) => ({
        ...prevColumns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      }));
    } else {
      const [removed] = sourceItems.splice(source.index, 1);
      sourceItems.splice(destination.index, 0, removed);
      setColumns((prevColumns: ColumnType) => ({
        ...prevColumns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
      }));
    }
  };

  return (
    <dataContext.Provider value={{ columns, setColumns }}>
      <div className="w-full px-14 pt-2 md:px-8 sm:px-2 sm:pt-0">
        <Nav />
        <div className=" grid grid-flow-col	gap-5  justify-center  md:grid-flow-row md:justify-start md:w-full ">
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(columns).map(([columnId, column], index) => (
              <Column column={column} columnId={columnId} index={index} key={columnId} />
            ))}
          </DragDropContext>
        </div>
      </div>
    </dataContext.Provider>
  );
}

export default App;
