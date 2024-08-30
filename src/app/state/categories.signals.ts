import { signal } from '@angular/core';
import { CategoryType, CategoriesType } from '../models/category.model';

const initCategories: Array<CategoryType> = [];

export const allCategories = signal<CategoriesType>([
  { name: 'Default', numberOfTasks: 0, selected: true },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
  { name: 'test 2', numberOfTasks: 0 },
]);
