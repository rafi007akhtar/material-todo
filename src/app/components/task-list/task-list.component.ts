import { Component, OnDestroy, OnInit } from '@angular/core';
import { Task, Tasks } from '../../models/task.model';
import { Subscription } from 'rxjs';
import { TaskManagementService } from '../../services/task-management.service';
import { CategoryType } from '../../models/category.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit, OnDestroy {
  allTasks: Tasks = [];
  tasksToShow: Tasks = [];
  selectedCategory!: CategoryType;

  allTasksSup: Subscription | undefined;
  selectedCategorySup: Subscription | undefined;

  constructor(private tms: TaskManagementService) {}

  ngOnInit(): void {
    this.selectedCategory = this.tms.getSelectedCategorySync();

    this.selectedCategorySup = this.tms.selectedCategory$.subscribe((cat) => {
      this.selectedCategory = cat;
      this.updateTasksToShow();
    });

    this.allTasksSup = this.tms.userTasks$.subscribe((tasks) => {
      this.allTasks = tasks;
      this.updateTasksToShow();
    });
  }

  updateTasksToShow() {
    this.tasksToShow = this.allTasks
      .filter((task) => task.categoryName === this.selectedCategory.name)
      .sort((taskA: Task) => (!!taskA.completed ? 1 : -1));
  }

  ngOnDestroy(): void {
    this.allTasksSup?.unsubscribe();
  }
}
