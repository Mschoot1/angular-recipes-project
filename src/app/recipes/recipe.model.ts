import {Ingredient} from '../shared/ingredient.model';

export class Recipe {
  private _name: string;
  private _description: string;
  private _imagePath: string;
  private _ingredients: Ingredient[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public get name(): string {
    return this._name;
  }

  public set name(n: string) {
    this._name = n;
  }

  public get ingredients(): Ingredient[] {
    return this._ingredients;
  }

  public set ingredients(value: Ingredient[]) {
    this._ingredients = value;
  }

  public get imagePath(): string {
    return this._imagePath;
  }

  public set imagePath(value: string) {
    this._imagePath = value;
  }

  public get description(): string {
    return this._description;
  }

  public set description(value: string) {
    this._description = value;
  }
}
