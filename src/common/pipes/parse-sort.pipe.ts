import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

type SortDirection = 'asc' | 'desc';
type OrderBy = Record<string, any>;

interface ParseSortOptions {
  allowedPaths: string[];
  maxDepth?: number;
}

@Injectable()
export class ParseSortPipe implements PipeTransform<
  any,
  OrderBy | OrderBy[] | undefined
> {
  private allowedPaths: Set<string>;
  private maxDepth: number;

  constructor(options: ParseSortOptions) {
    this.allowedPaths = new Set(options.allowedPaths);
    this.maxDepth = options.maxDepth ?? 3;
  }

  transform(value: any): OrderBy | OrderBy[] | undefined {
    if (!value) return undefined;

    if (typeof value === 'string') {
      return this.parseSingle(value);
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      return this.parseObject(value as Record<string, unknown>);
    }

    throw new BadRequestException('Invalid sort format');
  }

  private parseSingle(value: string): OrderBy {
    const [rawPath, rawSort] = value.split(':');
    return this.process(rawPath, rawSort);
  }

  private parseObject(obj: Record<string, unknown>): OrderBy[] {
    const result: OrderBy[] = [];

    for (const [rawPath, rawSort] of Object.entries(obj)) {
      result.push(this.process(rawPath, rawSort));
    }

    return result;
  }

  private process(rawPath: string, rawSort: unknown): OrderBy {
    if (!rawPath) {
      throw new BadRequestException('Missing sort field');
    }

    let direction: SortDirection = 'asc';

    if (rawSort !== undefined) {
      if (typeof rawSort !== 'string') {
        throw new BadRequestException('Sort must be "asc" or "desc"');
      }

      const normalized = rawSort.toLowerCase();

      if (normalized !== 'asc' && normalized !== 'desc') {
        throw new BadRequestException('Sort must be "asc" or "desc"');
      }

      direction = normalized;
    }

    const parts = rawPath.split('.');

    if (parts.length > this.maxDepth) {
      throw new BadRequestException(`Max sorting depth is ${this.maxDepth}`);
    }

    const normalizedPath = parts.join('.');

    if (!this.allowedPaths.has(normalizedPath)) {
      throw new BadRequestException(
        `Sorting by "${normalizedPath}" is not allowed`,
      );
    }

    return this.buildSort(parts, direction);
  }

  private buildSort(parts: string[], direction: SortDirection): OrderBy {
    let result: OrderBy = { [parts[parts.length - 1]]: direction };

    for (let i = parts.length - 2; i >= 0; i--) {
      result = { [parts[i]]: result };
    }

    return result;
  }
}
