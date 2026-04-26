import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseOrderByPipe implements PipeTransform {
  transform(value: any) {
    if (!value || typeof value !== 'string') return undefined;

    try {
      const [path, order] = value.split(':');
      const parts = path.split('.');

      return parts.reverse().reduce(
        (acc, part, i) => ({
          [part]: i === 0 ? order?.toLowerCase() || 'asc' : acc,
        }),
        {},
      );
    } catch {
      throw new BadRequestException(
        'Invalid order format. Expected "field.subfield:asc"',
      );
    }
  }
}
