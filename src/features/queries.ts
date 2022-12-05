import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { ColumnType } from "../Types";

const getColumns = () => {
  return axios.get("https://api.trello-clone.com/api/columns");
};

export const useGetColumnData = () => {
  return useQuery("columns", getColumns);
};

const postColumns = (column: ColumnType) => {
  return axios.post("https://api.trello-clone.com/api/columns", column);
};

export const usePostColumnData = () => {
  return useMutation(postColumns);
};
