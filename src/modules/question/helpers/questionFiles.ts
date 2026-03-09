import { Request } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { nanoid } from 'nanoid';
import { normalizeString } from 'src/common/normalizeString';

export const setDestination = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, destination: string) => void,
) => {
  const uploadPath = `./static/${file.fieldname}s`;
  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }

  callback(null, uploadPath);
};

export const sanitizeFileName = (
  req: Request,
  file: Express.Multer.File,
  callback: (error: Error | null, destination: string) => void,
) => {
  const uniqueSuffix = nanoid(10);
  callback(null, `${normalizeString(file.originalname)}-${uniqueSuffix}`);
};
