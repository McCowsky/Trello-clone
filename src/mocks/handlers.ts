import { rest } from "msw";
import dataset from "../dataset";
import * as uuid from "uuid";

export const handlers = [
  rest.get("https://api.trello-clone.com/api/columns", (req: any, res: any, ctx: any) => {
    return res(
      ctx.status(200),
      ctx.json({
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
      })
    );
  }),

  rest.post(
    "https://api.trello-clone.com/api/columns",
    (req: any, res: any, ctx: any) => {
      return res(
        ctx.status(200),
        ctx.json({
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
        })
      );
    }
  ),
];
