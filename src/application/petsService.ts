import { PetEntity } from "../domain/petEntitiy";
import { placeHolderPets } from "../infrastructure/petsData";
import { GetPetsDTO } from "./dto/getPetsDTO";
import HttpResponse from "./utils/httpResponse";
import { AddPetsDTO } from "./dto/addPetsDTO";
import { GetAPetDTO } from "./dto/getAPetDTO";

export class petsService {
    getPets(getPetsDto: GetPetsDTO) {
        const petEntities: PetEntity[] = [];

        for (const pet of placeHolderPets) {
            if (getPetsDto.name && getPetsDto.name !== pet.name) continue;
            if (getPetsDto.species && getPetsDto.species !== pet.species) continue;
            petEntities.push(PetEntity.createPet(pet));
        }

        if (petEntities.length > 0) return HttpResponse.ok(petEntities);

        return HttpResponse.notFound();
    }

    getAPet(getAPetDto: GetAPetDTO) {
        const pet = placeHolderPets.find(p => p.name === getAPetDto.name);

        if (pet) {
            return HttpResponse.ok(PetEntity.createPet(pet));
        }

        return HttpResponse.notFound();
    }

    addPets(addPetsDto: AddPetsDTO) {
        const petEntity = PetEntity.createPet(addPetsDto);

        if (petEntity.petId) {
            return HttpResponse.ok(petEntity);
        }

        return HttpResponse.error({
            message: "error creating pet"
        });
    }
}
