import { createContext } from "react";
import dataset from "./dataset";
import { ColumnContextType } from "./Types";

const iColumnContextState = {
  columns: dataset.columns,
  setColumns: () => {},
};

export const dataContext = createContext<ColumnContextType>(iColumnContextState);
