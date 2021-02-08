/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusVaid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusVaid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);

    return idx !== -1;
  }
}
