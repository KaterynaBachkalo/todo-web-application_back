import type { IncomingMessage, ServerResponse } from "http";
import app from "../src/app";

const handler = (req: IncomingMessage, res: ServerResponse) => {
  return (app as any)(req as any, res as any);
};

export default handler;
