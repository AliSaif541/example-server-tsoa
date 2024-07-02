import { Request, Response, NextFunction } from "express";

const TOKEN = "abc-xyz"; 

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"];

    if (token === TOKEN) {
        next();
    } else {
        res.status(401).json({ status: "error", message: "Unauthorized" });
    }
}
