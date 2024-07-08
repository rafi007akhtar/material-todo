import { signal } from '@angular/core';

export interface CategoryType {
  name: string;
  numberOfTasks: number;
}

export type CategoriesType = Array<CategoryType>;

const initCategories: Array<CategoryType> = [];

export const allCategories = signal<CategoriesType>([
  { name: 'test 1', numberOfTasks: 0 },
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
