export class Customers {
  _id: string;
  ci: string;
  name: string;
  lastname: string;
  gender: string;
  birth: Date;
  address: string;
  phone: string;
}

export interface Customer {
  name: string;
  lastname: string;
  phone: string;
}

export interface Contract {
  property: string;
  contractType: string;
  startDate: string;
  endDate: string;
  terms: string;
  price: number;
}

export interface Contracts2 {
  customer: Customer;
  contracts: Contract[];
}

export interface Contract {
  customerName: string;
  customerLastname: string;
  customerPhone: string;
  property: string;
  contractType: string;
  startDate: string;
  endDate: string;
  terms: string;
  price: number;
}
