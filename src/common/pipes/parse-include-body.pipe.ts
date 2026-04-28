import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

type AllowedRelations = Record<string, readonly string[]>;

type PrismaInclude = Record<string, { select: Record<string, true> }>;

@Injectable()
export class ParseIncludeBodyPipe implements PipeTransform {
  constructor(private allowedRelations: AllowedRelations) {}

  transform(value: unknown): PrismaInclude | undefined {
    if (!value || !Array.isArray(value)) {
      return undefined;
    }

    const include: PrismaInclude = {};

    for (const relation of value) {
      if (typeof relation !== 'string') {
        throw new BadRequestException(`Invalid include value`);
      }

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
