import { ICustomer } from "../../src/domain/customerEntity";
import { AddCustomerDTO } from "../../src/application/dto/addCustomerDTO";
import { GetCustomerDTO } from "../../src/application/dto/getCustomerDTO";
import { CustomersService } from "../../src/application/customersService";
import { Body, Controller, Get, Post, Res, Query, Route, SuccessResponse, TsoaResponse, Middlewares } from "tsoa";
import { authMiddleware } from "../middlewares/auth";

@Route("/customer")
export class CustomersController extends Controller {
    @SuccessResponse("200", "Found")
    @Get("/")
    @Middlewares(authMiddleware)
    public async getCustomer(@Res() success: TsoaResponse<200, ICustomer>, @Res() error: TsoaResponse<500, { status: string, message: string }>, @Query() firstName: string): Promise<void> {
        try {
            const getCustomerDTO = GetCustomerDTO.createDTO({ firstName });
            const customersService = new CustomersService();
            const httpResponse = await customersService.getCustomer(getCustomerDTO);

            success(200, httpResponse.body as ICustomer);
        } catch (err) {
            error(500, { status: "error", message: (err as Error).message });
        }
    }

    @SuccessResponse("201", "Created")
    @Post("/")
    public async addCustomer(@Body() body: AddCustomerDTO, @Res() success: TsoaResponse<200, ICustomer>, @Res() error: TsoaResponse<500, { status: string, message: string }>): Promise<void> {
        try {
            const addCustomerDTO = AddCustomerDTO.createDTO(body);
            const customersService = new CustomersService();
            const response = await customersService.addCustomer(addCustomerDTO);

            success(200, response.body as ICustomer);
        } catch (err) {
            error(500, { status: "error", message: (err as Error).message });
        }
    }
}
