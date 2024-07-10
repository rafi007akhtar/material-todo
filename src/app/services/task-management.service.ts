import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task, Tasks } from '../models/task.model';
import { CategoriesType, CategoryType } from '../models/category.model';
import { initCategories } from '../data/dummy-data';

@Injectable({
  providedIn: 'root',
})
export class TaskManagementService {
  userTasks: Tasks = [];
  userTasks$ = new Subject<Tasks>();

  allCategories = [...initCategories];
  allCategories$ = new Subject<CategoriesType>();
  selectedCategory$ = new Subject<CategoryType>();

  constructor() {}

  setTasks(tasks: Tasks) {
    this.userTasks = tasks;
    this.userTasks$.next(this.userTasks);
  }

  addTask(task: Task) {
    this.userTasks = [...this.userTasks, task];
    this.userTasks$.next(this.userTasks);
  }

  setCategories(categories: CategoriesType) {
    this.allCategories = categories;
    this.allCategories$.next(this.allCategories);
  }

  setSelectedCategory(name: string) {
    for (let category of this.allCategories) {
      if (category.name === name) {
        this.selectedCategory$.next(category);
        break;
      }
    }
  }

  getSelectedCategorySync(): CategoryType {
    const selectedCat = this.allCategories.find((val) => val.selected === true);
    return selectedCat as CategoryType;
  }

  addNewCategory(newCategoryName: string) {
    const newCategory: CategoryType = {
      name: newCategoryName,
      numberOfTasks: 0,
      selected: false,
    };
    this.setCategories([...this.allCategories, newCategory]);
  }
}
