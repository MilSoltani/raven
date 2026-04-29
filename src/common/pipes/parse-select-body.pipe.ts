import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

type AllowedRelations = Record<string, readonly string[]>;

interface ParseSelectBodyOptions {
  allowedColumns: string[];
  allowedRelations: AllowedRelations;
  requiredColumns?: string[];
}

type PrismaSelect = Record<string, true | { select: Record<string, true> }>;

@Injectable()
export class ParseSelectBodyPipe implements PipeTransform {
  private allowedColumns: Set<string>;
  private allowedRelations: AllowedRelations;
  private requiredColumns: Set<string>;

  constructor(options: ParseSelectBodyOptions) {
    this.allowedColumns = new Set(options.allowedColumns);
    this.allowedRelations = options.allowedRelations;
    this.requiredColumns = new Set(options.requiredColumns ?? []);
  }

  transform(value: unknown): PrismaSelect | undefined {
    if (!value || !Array.isArray(value)) {
      return this.buildRequiredOnly();
    }

    const select: PrismaSelect = {};

    for (const part of value) {
      if (typeof part !== 'string') {
        throw new BadRequestException('Select values must be strings');
      }

      const isScalar = this.allowedColumns.has(part);
      const relationFields = this.allowedRelations[part];

      if (isScalar) {
        select[part] = true;
        continue;
      }

      if (relationFields) {
        select[part] = {
          select: this.buildSelect(relationFields),
        };
        continue;
      }

      throw new BadRequestException(`Field "${part}" is not allowed`);
    }

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

  private buildRequiredOnly(): PrismaSelect | undefined {
    if (!this.requiredColumns.size) return undefined;

    const select: PrismaSelect = {};
    for (const col of this.requiredColumns) {
      select[col] = true;
    }
    return select;
  }
}
