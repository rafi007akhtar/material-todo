import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tasks } from '../../models/task.model';
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
      console.log({ cat });
      this.selectedCategory = cat;
      console.log('all tasks on radio change:', this.allTasks);
      this.updateTalksToShow();
    });

    this.allTasksSup = this.tms.userTasks$.subscribe((tasks) => {
      this.allTasks = tasks;
      this.updateTalksToShow();
      console.log('all tasks on new task addition:', this.allTasks);
    });
  }

  updateTalksToShow() {
    this.tasksToShow = this.allTasks.filter(
      (task) => task.categoryName === this.selectedCategory.name
    );
  }

  ngOnDestroy(): void {
    this.allTasksSup?.unsubscribe();
  }
}
