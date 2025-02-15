import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { Location } from '@angular/common'; // Import Location service

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {
  task: any;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location // Inject Location service
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const token = localStorage.getItem('token') || ''; // Fetch token from localStorage
  
    this.taskService.getTaskDetail(Number(id), token).then((data) => {
      this.task = data;
    }).catch(error => console.error('Error fetching task detail:', error));
  }

  // Go Back functionality
  goBack(): void {
    this.location.back();
  }
}
