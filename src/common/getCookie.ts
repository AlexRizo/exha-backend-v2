import { Request } from 'express';

export const getCookie = (req: Request, cookie: string): string | null => {
  return req.cookies?.[cookie] as string;
};
