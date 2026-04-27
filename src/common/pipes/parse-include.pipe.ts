import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

type AllowedRelations = Record<string, readonly string[]>;

type PrismaInclude = Record<string, { select: Record<string, true> }>;

@Injectable()
export class ParseIncludePipe implements PipeTransform {
  private allowedRelations: AllowedRelations;

  constructor(allowedRelations: AllowedRelations) {
    this.allowedRelations = allowedRelations;
  }

  transform(value: unknown): PrismaInclude | undefined {
    if (!value || typeof value !== 'string') {
      return undefined;
    }

    const requested = value
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);

    const include: PrismaInclude = {};

    for (const relation of requested) {
      const fields = this.allowedRelations[relation];

      if (!fields) {
        throw new BadRequestException(`Include "${relation}" is not allowed`);
      }

      include[relation] = {
        select: this.buildSelect(fields),
      };
    }

    return include;
  }

  private buildSelect(fields: readonly string[]): Record<string, true> {
    return fields.reduce<Record<string, true>>((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
  }
}
