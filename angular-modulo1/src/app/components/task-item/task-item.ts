import { Component, Input, HostBinding, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Task } from '../task-list/task-list';
@Component({
  selector: 'app-task-item',
  imports: [CommonModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css'
})
export class TaskItem {
 @Input({ required: true }) 
    @Input() task!: Task;

  @HostBinding('class.completed') get isCompleted() {
    return this.task?.completed;
  }

  @HostBinding('class.high-priority') get isHighPriority() {
    return this.task?.priority === 'alta' && !this.task?.completed;
  }

  toggleCompletion() {
    if (this.task) {
      this.task.completed = !this.task.completed;
    }
  }

  get badgeClass() {
    return this.task?.completed ? 'bg-success' : 'bg-warning';
  }

  get statusText() {
    return this.task?.completed ? 'Completada' : 'Pendiente';
  }
}
