import * as uuid from "uuid";
import { ColumnType } from "./Types";
const dataColumns: ColumnType = {
  [uuid.v4()]: {
    name: "Requested",
    items: [],
  },
  [uuid.v4()]: {
    name: "To do",
    items: [],
  },
  [uuid.v4()]: {
    name: "In Progress",
    items: [],
  },
  [uuid.v4()]: {
    name: "Done",
    items: [],
  },
};

const dataset = { columns: dataColumns };
export default dataset;
