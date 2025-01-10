from django.urls import path
from .views import TaskList, TaskDetail, CompletedTaskList  # Ensure TaskDetail is imported

urlpatterns = [
    path('tasks/', TaskList.as_view(), name='task-list'),
    path('tasks/<int:pk>/', TaskDetail.as_view(), name='task-detail'),
    path('tasks/completed/', CompletedTaskList.as_view(), name='completed-task-list'),
]

