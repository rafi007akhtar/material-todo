export interface CategoryType {
  name: string;
  numberOfTasks: number;
  selected?: boolean;
}

export type CategoriesType = Array<CategoryType>;
