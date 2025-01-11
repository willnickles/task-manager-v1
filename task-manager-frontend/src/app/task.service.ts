import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // Adjust if necessary

  constructor() {}

  async login(username: string, password: string): Promise<void> {
    try {
      const response = await axios.post(`${this.apiUrl}/token/`, {
        username,
        password,
      });
      const token = response.data.access; // Assuming the token is in 'access' field
      localStorage.setItem('token', token); // Store the token in localStorage
      console.log('Token stored in localStorage:', token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }


  // Example: Get token method (if needed later)
  getToken(): string | null {
    return localStorage.getItem('token'); // Retrieve token from localStorage
  }

  // Task list API
  // TaskService: Ensure Authorization header is set properly
async getTasks(token: string): Promise<any> {
  try {
    const response = await axios.get(`${this.apiUrl}/tasks/`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Ensure 'Bearer' is included with the token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}


  // Task detail API
  async getTaskDetail(id: number, token: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/tasks/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching task details:', error);
      throw error;
    }
  }

  // Create a new task
  async createTask(task: any, token: string): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}/tasks/`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  // Update an existing task
  async updateTask(id: number, task: any, token: string): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}/tasks/${id}/`, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  // Delete a task
  async deleteTask(id: number, token: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}/tasks/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  // Add other API calls as needed...
}
