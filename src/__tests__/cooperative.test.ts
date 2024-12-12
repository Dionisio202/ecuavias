import { Cooperative } from '../interfaces/Cooperatives.interface';
import { addCooperative, deleteCooperative, getCooperativeByID, getCooperatives, updateCooperative } from "../services/cooperatives.service";
import * as dotenv from 'dotenv';

dotenv.config();

describe("Pruebas del servicio de cooperativas.", () => {

    beforeAll(() => {
        expect(process.env.VITE_SUPABASE_URL).toBeDefined();
        expect(process.env.VITE_SUPABASE_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test("Prueba de inserción de una cooperativa", async () => {
        const cooperative: Cooperative = {
            name: "Coop1",
            ruc: "0300912821001",
            address: "Ambato",
            website_url: "website.com",
            logo_url: "logo.rul.com",
            buses_qty: 32,
            created_by: "71f55d49-efbb-4f7d-9e60-fd48327ddfcf"
        };
        const response = await addCooperative(cooperative);
        expect(response).toBe(true);
    });

    test('Prueba de recuperación de todas las cooperativas registradas', async () => {
        const result = await getCooperatives();
        console.log(result);
        expect(Array.isArray(result)).toBe(true);
        (result as Cooperative[]).forEach((cooperative) => {
            expect(cooperative).toHaveProperty("id_coop");
            expect(cooperative).toHaveProperty("name");
            expect(cooperative).toHaveProperty("ruc");
            expect(cooperative).toHaveProperty("address");
            expect(cooperative).toHaveProperty("website_url");
        })
    });

    test('Prueba de recuperación de una cooperativa en especifico en base a un identificador.', async () => {
        const id_coop: string = "1002e4ed-169e-4116-9e03-e413b0b33236";
        const result = await getCooperativeByID(id_coop);
        console.log(result);
        expect(result).toHaveProperty("id_coop");
        expect(result).toHaveProperty("name");
        expect(result).toHaveProperty("ruc");
        expect(result).toHaveProperty("address");
        expect(result).toHaveProperty("website_url");
    });

    test('Prueba de actualización de una cooperativa.', async () => {
        const cooperative: Cooperative = {
            id_coop: "dd480d6e-a11d-44b4-aaa1-cfd0b73810ec",
            name: "Coop1 UPDATED",
            ruc: "0300912821001",
            address: "Ambato",
            website_url: "website.com",
            logo_url: "logo.rul.com",
            buses_qty: 32,
            status: "active",
            updated_by: "71f55d49-efbb-4f7d-9e60-fd48327ddfcf"
        };
        const result = await updateCooperative(cooperative);
        expect(result).toBe(true);
    });

    test('Prueba de eliminación de una cooperativa en especifico en base a un identificador.', async () => {
        const id_coop: string = "dd480d6e-a11d-44b4-aaa1-cfd0b73810ec";
        const result = await deleteCooperative(id_coop);
        expect(result).toBe(true);
    });

})