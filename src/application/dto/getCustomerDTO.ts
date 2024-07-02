export interface IGetCustomerDTO {
    firstName: string;
}

export class GetCustomerDTO implements IGetCustomerDTO {
    firstName: string;

    constructor(dto) {
        this.firstName = dto.firstName;
    }

    static createDTO(dto: unknown) {
        return new GetCustomerDTO(dto as IGetCustomerDTO);
    }
}
