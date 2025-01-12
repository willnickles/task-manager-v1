import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get the task id from the route parameter
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token') || ''; // Fetch token from localStorage
  
    // Fetch the task details from the service
    this.taskService.getTaskDetail(Number(id), token).then((data) => {
      this.task = data;
    }).catch(error => console.error('Error fetching task detail:', error));
  }
}
