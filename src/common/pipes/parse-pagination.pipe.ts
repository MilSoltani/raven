import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

export interface PaginationOptions {
  defaultLimit?: number;
  maxLimit?: number;
}

export interface PrismaPagination {
  skip: number;
  take: number;
}

@Injectable()
export class ParsePaginationPipe implements PipeTransform<
  unknown,
  PrismaPagination
> {
  private readonly defaultLimit: number;
  private readonly maxLimit: number;

  constructor(options: PaginationOptions = {}) {
    this.defaultLimit = options.defaultLimit ?? 10;
    this.maxLimit = options.maxLimit ?? 100;
  }

  transform(value: unknown): PrismaPagination {
    if (!value || typeof value !== 'object') {
      return {
        skip: 0,
        take: this.defaultLimit,
      };
    }

    const query = value as Record<string, unknown>;

    const page = this.parseNumber(query.page, 1, 'page');
    const limit = this.parseNumber(query.limit, this.defaultLimit, 'limit');

    if (limit > this.maxLimit) {
      throw new BadRequestException(`Limit cannot exceed ${this.maxLimit}`);
    }

    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }

  private parseNumber(
    value: unknown,
    defaultValue: number,
    name: string,
  ): number {
    if (value === undefined || value === null || value === '') {
      return defaultValue;
    }

    const parsed = Number(value);

    if (isNaN(parsed) || !Number.isInteger(parsed) || parsed < 1) {
      throw new BadRequestException(`${name} must be a positive integer`);
    }

    return parsed;
  }
}
