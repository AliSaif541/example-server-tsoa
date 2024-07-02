export interface IGetAPetDTO {
    name: string;
}

export class GetAPetDTO implements IGetAPetDTO {
    name: string;

    constructor(dto: IGetAPetDTO) {
        this.name = dto.name;
    }

    static createDTO(dto: unknown) {
        return new GetAPetDTO(dto as IGetAPetDTO);
    }
}
