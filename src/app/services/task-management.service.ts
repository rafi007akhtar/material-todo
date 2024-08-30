import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Task, Tasks } from '../models/task.model';
import { CategoriesType, CategoryType } from '../models/category.model';
import { initCategories } from '../data/dummy-data';

@Injectable({
  providedIn: 'root',
})
export class TaskManagementService {
  userTasks: Tasks = [];
  userTasks$ = new BehaviorSubject<Tasks>(this.userTasks);

  allCategories = [...initCategories];
  allCategories$ = new BehaviorSubject<CategoriesType>(this.allCategories);
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

  updateTaskWithIdTo(newTask: Task) {
    let taskInd = -1;
    let taskToChange: Task;
    for (let ind = 0; ind < this.userTasks.length; ind++) {
      const task = this.userTasks[ind];
      if (task.id === newTask.id) {
        taskInd = ind;
        taskToChange = task;
        break;
      }
    }
    if (taskInd === -1) {
      return;
    }

    this.userTasks.splice(taskInd, 1, newTask);
    this.setTasks(this.userTasks);
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
    const categoryAlreadyExists = !!this.allCategories.filter(
      (cat) => cat.name.toLowerCase() === newCategoryName.toLowerCase()
    ).length;
    if (categoryAlreadyExists) {
      return true;
    }

    const newCategory: CategoryType = {
      name: newCategoryName,
      numberOfTasks: 0,
      selected: false,
    };
    this.setCategories([...this.allCategories, newCategory]);
    return false;
  }
}
