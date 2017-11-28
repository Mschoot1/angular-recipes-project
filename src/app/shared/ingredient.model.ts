export class Ingredient {
  get _id(): string {
    return this.__id;
  }

  set _id(value: string) {
    this.__id = value;
  }
  constructor(public name: string, public amount: number) {
  }
  private __id: string;
}
