import { Router, Request, Response } from "express";

const calendarRoutes = Router();

calendarRoutes.get("/", async (req: any, res: Response) => {
  return res.status(200).json({
    ok: true,
  });
});

export default calendarRoutes;
