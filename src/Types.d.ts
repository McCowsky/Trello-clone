export interface ColumnType {
  [x: string]: ColumnElements;
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

export interface ColumnElements {
  name: string;
  items: { id: string; content: string }[];
}

export interface Item {
  id: string;
  content: string;
}

export interface ItemProps {
  item: Item;
  index: number;
  key: string;
  columnId: string;
  directionHorizontal: boolean;
}
