import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

export type AllowedRelations = Record<string, readonly string[]>;

export interface ParseSelectOptions {
  allowedColumns: string[];
  allowedRelations: AllowedRelations;
  requiredColumns?: string[];
}

export type PrismaSelect = Record<
  string,
  true | { select: Record<string, true> }
>;

@Injectable()
export abstract class BaseParseSelectPipe implements PipeTransform {
  protected allowedColumns: Set<string>;
  protected allowedRelations: AllowedRelations;
  protected requiredColumns: Set<string>;

  constructor(options: ParseSelectOptions) {
    this.allowedColumns = new Set(options.allowedColumns);
    this.allowedRelations = options.allowedRelations;
    this.requiredColumns = new Set(options.requiredColumns ?? []);
  }

  // The common processing logic
  protected processFields(fields: string[]): PrismaSelect | undefined {
    const select: PrismaSelect = {};

    for (const part of fields) {
      const isScalar = this.allowedColumns.has(part);
      const relationFields = this.allowedRelations[part];

      if (isScalar) {
        select[part] = true;
        continue;
      }

      if (relationFields) {
        select[part] = { select: this.buildSelect(relationFields) };
        continue;
      }

      throw new BadRequestException(`Field "${part}" is not allowed`);
    }

    // Add required columns
    for (const col of this.requiredColumns) {
      select[col] = true;
    }

    return Object.keys(select).length ? select : undefined;
  }

  private buildSelect(fields: readonly string[]): Record<string, true> {
    const res: Record<string, true> = {};
    for (const f of fields) res[f] = true;
    return res;
  }

  protected buildRequiredOnly(): PrismaSelect | undefined {
    if (!this.requiredColumns.size) return undefined;
    const select: PrismaSelect = {};
    for (const col of this.requiredColumns) select[col] = true;
    return select;
  }

  abstract transform(value: unknown): PrismaSelect | undefined;
}

@Injectable()
export class ParseSelectBodyPipe extends BaseParseSelectPipe {
  transform(value: unknown): PrismaSelect | undefined {
    if (!value || !Array.isArray(value)) return this.buildRequiredOnly();

    if (!value.every((item): item is string => typeof item === 'string')) {
      throw new BadRequestException(
        'Select values must be an array of strings',
      );
    }

    return this.processFields(value);
  }
}

@Injectable()
export class ParseSelectQueryPipe extends BaseParseSelectPipe {
  transform(value: unknown): PrismaSelect | undefined {
    if (!value || typeof value !== 'string') return this.buildRequiredOnly();

    const parts = value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);
    return this.processFields(parts);
  }
}
