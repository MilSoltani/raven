import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class PrismaQueryPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (!value || typeof value !== 'object') {
      return value;
    }

    return this.parseValues(value as Record<string, unknown>);
  }

  private parseValues(obj: Record<string, unknown>): Record<string, unknown> {
    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

      const val = obj[key];

      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        this.parseValues(val as Record<string, unknown>);
      } else if (val === 'true') {
        obj[key] = true;
      } else if (val === 'false') {
        obj[key] = false;
      } else if (
        typeof val === 'string' &&
        val.trim() !== '' &&
        !isNaN(Number(val))
      ) {
        obj[key] = Number(val);
      } else if (val === 'null') {
        obj[key] = null;
      }
    }
    return obj;
  }
}
