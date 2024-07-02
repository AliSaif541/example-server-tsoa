import { ICustomer } from "../domain/customerEntity";
import { v4 as uuidv4 } from "uuid";

export const placeHolderCustomers: ICustomer[] = [
    { firstName: "John", lastName: "Doe", customerId: uuidv4() },
    { firstName: "Jane", lastName: "Smith", customerId: uuidv4() },
    { firstName: "Michael", lastName: "Brown", customerId: uuidv4() },
    { firstName: "Emily", lastName: "Johnson", customerId: uuidv4() },
    { firstName: "Chris", lastName: "Davis", customerId: uuidv4() },
    { firstName: "Sarah", lastName: "Martinez", customerId: uuidv4() },
    { firstName: "Robert", lastName: "Clark", customerId: uuidv4() },
    { firstName: "Karen", lastName: "Roberts", customerId: uuidv4() },
    { firstName: "George", lastName: "Turner", customerId: uuidv4() },
    { firstName: "Ashley", lastName: "Phillips", customerId: uuidv4() },
    { firstName: "Brian", lastName: "Campbell", customerId: uuidv4() },
    { firstName: "Betty", lastName: "Parker", customerId: uuidv4() },
    { firstName: "Edward", lastName: "Evans", customerId: uuidv4() },
    { firstName: "Helen", lastName: "Edwards", customerId: uuidv4() }
];
