import { CustomerEntity } from "../domain/customerEntity";
import { placeHolderCustomers } from "../infrastructure/customersData";
import { GetCustomerDTO } from "./dto/getCustomerDTO";
import HttpResponse from "./utils/httpResponse";
import { AddCustomerDTO } from "./dto/addCustomerDTO";

export class CustomersService {
    getCustomer(getCustomerDto: GetCustomerDTO) {
        const customer = placeHolderCustomers.find(
            (customer) => customer.firstName === getCustomerDto.firstName
        );

        if (customer) return HttpResponse.ok(CustomerEntity.createCustomer(customer));

        return HttpResponse.notFound();
    }

    addCustomer(addCustomerDto: AddCustomerDTO) {
        const customerEntity = CustomerEntity.createCustomer(addCustomerDto);

        if (customerEntity.customerId) {
            return HttpResponse.ok(customerEntity);
        }

        return HttpResponse.error({
            message: "error creating customer"
        });
    }
}
