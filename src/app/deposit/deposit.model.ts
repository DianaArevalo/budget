export class Deposit {
    constructor(
      public description: string, 
      public value: number,
      public date: string = new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
    ) {}
  }