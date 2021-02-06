import { Injectable } from '@nestjs/common';
// eslint-disable-next-line prettier/prettier
import { Task, TaskStatus} from './task.model'
import * as uuid from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // eslint-disable-next-line prettier/prettier
    const {title, description} = createTaskDto;

    const task: Task = {
      id: uuid.v1(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }
}
