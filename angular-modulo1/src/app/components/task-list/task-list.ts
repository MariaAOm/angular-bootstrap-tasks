import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItem } from '../task-item/task-item';
import { CommonModule } from '@angular/common'; 

export interface Task {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  priority: 'alta' | 'media' | 'baja';
}

@Component({
  selector: 'app-task-list',
  imports: [CommonModule,FormsModule, TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
     tasks = signal<Task[]>([
    { 
      id: 1, 
      name: 'Aprender Angular', 
      description: 'Estudiar componentes y directivas', 
      completed: false, 
      priority: 'alta' 
    },
    { 
      id: 2, 
      name: 'Instalar Bootstrap', 
      description: 'Configurar estilos en el proyecto', 
      completed: true, 
      priority: 'media' 
    }
  ]);


  newTask = {
    name: '',
    description: '',
    priority: 'media' as const
  };

  addTask(taskForm: any) {
    if (this.newTask.name.trim() && this.newTask.description.trim()) {
      const newTask: Task = {
        id: this.tasks().length + 1,
        name: this.newTask.name,
        description: this.newTask.description,
        completed: false,
        priority: this.newTask.priority
      };
      
      this.tasks.update(tasks => [...tasks, newTask]);
      
    
      this.newTask.name = '';
      this.newTask.description = '';
      this.newTask.priority = 'media';
      taskForm.resetForm();
    }
  }

  completedTasks = () => this.tasks().filter(task => task.completed).length;
  totalTasks = () => this.tasks().length;
}
