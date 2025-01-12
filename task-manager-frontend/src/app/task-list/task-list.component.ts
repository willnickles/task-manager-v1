import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Import Router for navigation
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  token: string = ''; // Store the JWT token
  isLoading: boolean = false; // To track loading state
  errorMessage: string = ''; // To store any error messages

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || ''; // Fetch token from localStorage if available
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    this.isLoading = true;
    try {
      const tasks = await this.taskService.getTasks(this.token);
      this.tasks = tasks;
    } catch (error) {
      this.errorMessage = 'Error loading tasks. Please try again later.';
      console.error('Error loading tasks:', error);
    } finally {
      this.isLoading = false;
    }
  }

  async deleteTask(id: number): Promise<void> {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      try {
        await this.taskService.deleteTask(id, this.token);
        // Remove the deleted task from the tasks array
        this.tasks = this.tasks.filter(task => task.id !== id);
      } catch (error) {
        this.errorMessage = 'Error deleting task. Please try again later.';
        console.error('Error deleting task:', error);
      }
    }
  }

  navigateToCreateTask(): void {
    this.router.navigate(['/task/create']); // Navigate to task creation page
  }
}
