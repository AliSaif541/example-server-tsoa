import { ICustomer } from "../../domain/customerEntity";

export interface IAddCustomerDTO extends Omit<ICustomer, "customerId"> {}

export class AddCustomerDTO implements IAddCustomerDTO {
    firstName: string;
    lastName: string;

    constructor(dto) {
        this.firstName = dto.firstName;
        this.lastName = dto.lastName;
    }

    static createDTO(dto: unknown) {
        return new AddCustomerDTO(dto as IAddCustomerDTO);
    }
}
