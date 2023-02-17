import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface RequestExt extends Request {
    session?: JwtPayload
}