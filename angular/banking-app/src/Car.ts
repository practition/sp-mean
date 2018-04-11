export class Car {
  make: string;
  model: string;

  constructor(make: string, model: string) {
    this.make = make;
    this.model = model;
  }
}

export class CarImproved {
  constructor(public make: string, public model: string) {}
}
