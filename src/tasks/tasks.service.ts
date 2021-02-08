/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// eslint-disable-next-line prettier/prettier

import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskREpository: TaskRepository
    ){}
 // private tasks: Task[] = [];

//   getAllTasks() {
//     return this.tasks;
//   }

 async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>{
    return this.taskREpository.getTasks(filterDto);
}

//   getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
//     const {status, search} = filterDto; //deconstruct the filterDto object

//     let tasks = this.getAllTasks();

//     if(status){
//         tasks = tasks.filter(task => task.status === status);
//     }

//     if(search){
//         tasks = tasks.filter(task =>
//             task.title.includes(search) ||
//             task.description.includes(search),
//             );
//     }

//     return tasks;
//   }
async getTaskById(id: number){
    const found = await this.taskREpository.findOne(id);
    if(!found){
        throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;

}

async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
   return this.taskREpository.createTask(createTaskDto);
}

async deleteTask(id: number): Promise<void>{
    const result = await this.taskREpository.delete(id);

    if(result.affected === 0){
        throw new NotFoundException(`Task with ID "${id}" not found`)
    }
}
//   deleteTask(id: string) {
//     const found = this.getTaskById(id);
//     this.tasks = this.tasks.filter((task) => task.id !== found.id);
//   }

//   updateTaskStatus(id: string, status: TaskStatus) {
//     const task = this.getTaskById(id);
//     task.status = status;
//     return task;
//   }
async updateTaskStatus(id: number, status: TaskStatus ): Promise<Task>{
    const task = await this.getTaskById(id);
    task.status = status;
    await task.save();

    return task;
}

//TODO fix this
async updateTask(id: number): Promise<Task>{
    const newTaskDto = new CreateTaskDto;
    // let oldTask = await this.getTaskById(id);
    const newTask = await this.createTask(newTaskDto);

    const {title, description} = newTaskDto;

    // oldTask = newTask
    // await oldTask.save();

    // return oldTask;

    const task = await this.taskREpository.findOne({where:{id}});

    return this.taskREpository.save({
        id: task.id,
        title: task.title,
        description: task.description
    });


}

//   updateTask(id: string, newTaskDto: CreateTaskDto){
//     const newTask = this.createTask(newTaskDto)

//     let oldTask: Task = this.getTaskById(id);
//     oldTask = newTask

//     return oldTask;
//   }
}
