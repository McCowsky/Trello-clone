export interface ColumnType {
  [x: string]: Column;
}

export interface ColumnContextType {
  columns: ColumnType;
  setColumns: React.Dispatch<React.SetStateAction<ColumnType>>;
}

export interface ColumnProps {
  columnId: string;
  column: Column;
  index: number;
}

export interface Column {
  name: string;
  items: { id: string; content: string }[];
}
