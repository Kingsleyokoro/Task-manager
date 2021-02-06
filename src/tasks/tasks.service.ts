import { Injectable } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import { Task, TaskStatus} from './task.model'
import * as uuid from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
