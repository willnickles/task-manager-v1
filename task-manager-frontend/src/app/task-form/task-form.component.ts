import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task = { 
    title: '', 
    description: '', 
    completed: false  // Add the completed field with a default value
  }; 
  isEditing = false;
  taskId: number | null = null;

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    
    // If you are editing a task, fetch the details based on ID
    if (this.taskId) {
      this.isEditing = true;
      this.taskService.getTaskDetail(this.taskId, token).then((data) => {
        this.task = data;
      });
    }
  }

  save(): void {
    const token = localStorage.getItem('token') || '';

    if (this.isEditing) {
      // Call service to update task if it's editing an existing task
      this.taskService.updateTask(this.taskId!, this.task, token).then(() => {
        this.router.navigate(['/tasks']);
      }).catch(error => console.error('Error updating task:', error));
    } else {
      // Create a new task
      this.taskService.createTask(this.task, token).then(() => {
        this.router.navigate(['/tasks']);
      }).catch(error => {
        console.error('Error creating task:', error);
      });
    }
  }
}
