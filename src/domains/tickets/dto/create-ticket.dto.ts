import {
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  IsEnum,
} from 'class-validator';
import {
  TicketPriority,
  TicketStatus,
} from 'src/infrastructure/database/generated/prisma/enums';

export class CreateTicketDto {
  @IsInt()
  creatorId!: number;

  @IsOptional()
  @IsInt()
  agentId?: number;

  @IsString()
  @MaxLength(512)
  subject!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;
}
