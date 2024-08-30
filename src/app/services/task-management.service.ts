import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Task, Tasks } from '../models/task.model';
import { CategoriesType, CategoryType } from '../models/category.model';
import { initCategories } from '../data/dummy-data';

@Injectable({
  providedIn: 'root',
})
export class TaskManagementService {
  TASKS_KEY = 'tasks';
  CATEGORIES_KEY = 'categories';

  localTasks = localStorage.getItem(this.TASKS_KEY) || '';
  userTasks: Tasks = this.localTasks.length ? JSON.parse(this.localTasks) : [];
  userTasks$ = new BehaviorSubject<Tasks>(this.userTasks);

  localCategories = localStorage.getItem(this.CATEGORIES_KEY) || '';
  allCategories = this.localCategories.length
    ? JSON.parse(this.localCategories)
    : [...initCategories];
  allCategories$ = new BehaviorSubject<CategoriesType>(this.allCategories);
  selectedCategory$ = new Subject<CategoryType>();

  constructor() {}

  setTasks(tasks: Tasks) {
    this.userTasks = tasks;
    this.userTasks$.next(this.userTasks);
    this.saveTasksToLocal();
  }

  addTask(task: Task) {
    const tasks = [...this.userTasks, task];
    this.setTasks(tasks);
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
    this.saveCategoriesToLocal();
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
    const selectedCat = this.allCategories.find(
      (val: CategoryType) => val.selected === true
    );
    return selectedCat as CategoryType;
  }

  addNewCategory(newCategoryName: string) {
    const categoryAlreadyExists = !!this.allCategories.filter(
      (cat: CategoryType) =>
        cat.name.toLowerCase() === newCategoryName.toLowerCase()
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

  saveTasksToLocal() {
    localStorage.setItem(this.TASKS_KEY, JSON.stringify(this.userTasks));
  }

  saveCategoriesToLocal() {
    localStorage.setItem(
      this.CATEGORIES_KEY,
      JSON.stringify(this.allCategories)
    );
  }
}
