import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import React, { useState, useEffect } from "react";
import Column from "./components/Column";
import Nav from "./components/Nav";
import { dataContext } from "./context";
import { ColumnElements, ColumnType, Item } from "./Types";
import { useGetColumnData, usePostColumnData } from "./features/queries";

function App() {
  const { data, error, status, isError } = useGetColumnData();

  if (isError) {
    if (error instanceof Error) {
      return <h2 className="text-4xl text-center">{error.message}</h2>;
    }
  }

  const { mutate } = usePostColumnData();
  const [columns, setColumns] = useState<ColumnType>({});

  useEffect(() => {
    if (status === "success") {
      setColumns(data.data);
    }
  }, [status, data?.data]);

  const onDragEnd = (result: DropResult): void => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceColumn: ColumnElements = columns[source.droppableId];
    const sourceItems: Item[] = [...sourceColumn.items];
    const [removed]: Item[] = sourceItems.splice(source.index, 1);
    if (source.droppableId !== destination.droppableId) {
      const destColumn: ColumnElements = columns[destination.droppableId];
      const destItems: Item[] = [...destColumn.items];

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
      sourceItems.splice(destination.index, 0, removed);
      setColumns((prevColumns: ColumnType) => ({
        ...prevColumns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
      }));
    }
    mutate(columns);
  };

  return status === "success" ? (
    <dataContext.Provider value={{ columns, setColumns }}>
      <div className="pt-2 sm:pt-0">
        <Nav />
        <div className="grid grid-flow-col gap-5 justify-center md:grid-flow-row md:justify-start ">
          <DragDropContext onDragEnd={onDragEnd}>
            {Object.entries(columns).map(([columnId, column], index) => (
              <Column column={column} columnId={columnId} index={index} key={columnId} />
            ))}
          </DragDropContext>
        </div>
      </div>
    </dataContext.Provider>
  ) : (
    <h2 className="text-4xl text-center">Loading...</h2>
  );
}

export default App;
