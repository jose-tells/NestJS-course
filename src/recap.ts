class Individual {
  constructor(private age: number, private name: string) {}

  getIndividualInfo() {
    return `Hi! My name is ${this.name} and I'm ${this.age}yo`;
  }
}

const individual = new Individual(24, 'Jose');
individual.getIndividualInfo();
