import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

interface ParseFilterOptions {
  allowedPaths: string[];
  maxDepth?: number;
}

const OPERATORS = new Set(['contains', 'in', 'not', 'gt', 'gte', 'lt', 'lte']);

@Injectable()
export class ParseFilterPipe implements PipeTransform {
  private allowedPaths: Set<string>;
  private maxDepth: number;

  constructor(options: ParseFilterOptions) {
    this.allowedPaths = new Set(options.allowedPaths);
    this.maxDepth = options.maxDepth ?? 3;
  }

  transform(value: unknown): unknown {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return value;
    }

    return this.parseValues(value as Record<string, unknown>, []);
  }

  private parseValues(
    obj: Record<string, unknown>,
    pathStack: string[],
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

      const newPath = [...pathStack, key];
      const val = obj[key];

      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        const inner = val as Record<string, unknown>;
        const keys = Object.keys(inner);

        const isOperatorObject = keys.some((k) => OPERATORS.has(k));

        if (isOperatorObject) {
          this.validatePath(newPath);
          result[key] = this.normalizeOperatorObject(inner);
          continue;
        }

        result[key] = this.parseValues(inner, newPath);
        continue;
      }

      this.validatePath(newPath);
      result[key] = this.normalizeValue(val);
    }

    return result;
  }

  private validatePath(path: string[]) {
    if (path.length > this.maxDepth) {
      throw new BadRequestException(`Max depth is ${this.maxDepth}`);
    }

    const normalized = path.join('.');

    if (!this.allowedPaths.has(normalized)) {
      throw new BadRequestException(`Field "${normalized}" is not allowed`);
    }
  }

  private normalizeOperatorObject(obj: Record<string, unknown>) {
    const result: Record<string, unknown> = {};

    for (const key in obj) {
      const val = obj[key];

      if (key === 'in' && typeof val === 'string') {
        result[key] = val.split(',').map((v) => this.normalizeValue(v.trim()));
        continue;
      }

      result[key] = this.normalizeValue(val);
    }

    return result;
  }

  private normalizeValue(val: unknown): unknown {
    if (val === 'true') return true;
    if (val === 'false') return false;
    if (val === 'null') return null;

    if (typeof val === 'string') {
      let trimmed = val.trim();

      if (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ) {
        trimmed = trimmed.slice(1, -1);
      }

      if (trimmed !== '' && !Number.isNaN(Number(trimmed))) {
        return Number(trimmed);
      }

      return trimmed;
    }

    return val;
  }
}
