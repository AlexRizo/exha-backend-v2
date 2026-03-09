import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

export type FileFieldsPayload = Record<string, Express.Multer.File[]>;

@Injectable()
export class ParseFileFieldsPipe implements PipeTransform {
  constructor(
    private readonly opts: {
      fields: string[];
      maxSize: number;
      isRequired: boolean;
      mimeTypes?: string[];
    },
  ) {
    this.opts.mimeTypes = this.opts.mimeTypes || [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/bmp',
      'image/tiff',
    ];
  }

  private validateFile(file: Express.Multer.File) {
    const maxBytes = this.opts.maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      throw new BadRequestException(
        `El archivo ${file.originalname} supera el límite de ${this.opts.maxSize}MB`,
      );
    }

    if (!this.opts.mimeTypes!.includes(file.mimetype)) {
      throw new BadRequestException(
        `El archivo ${file.originalname} tiene un formato no permitido (${file.mimetype})`,
      );
    }
  }

  transform(payload: FileFieldsPayload) {
    if (this.opts.isRequired) {
      for (const field of this.opts.fields) {
        if (!payload || !payload[field] || payload[field].length === 0) {
          throw new BadRequestException(
            `El campo de archivo '${field}' es requerido`,
          );
        }
      }
    }

    if (!payload) return {};

    for (const field in payload) {
      if (payload[field]) {
        payload[field].forEach((file) => this.validateFile(file));
      }
    }

    return payload;
  }
}
