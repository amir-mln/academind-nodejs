import type { Request, Response } from "express";

export default function getFallbackPage(_: Request, res: Response) {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/404" });
}
