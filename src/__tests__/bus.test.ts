
import { Bus } from "../interfaces/Bus.interface";
import { addBus, deleteBus, getBusById, getBuses, updateBus } from "../services/buses.service";


describe("Pruebas del servicio de buses.", () => {

    beforeAll(() => {
        expect(process.env.VITE_SUPABASE_URL).toBeDefined();
        expect(process.env.VITE_SUPABASE_KEY).toBeDefined();
    });
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    test("Prueba de inserción de un bus", async () => {
        const bus: Bus = {
            id_coop: "c67614ae-eb1d-41cd-9531-cd39c0e5d072",
            brand: "SCANIA",
            model: "T-800",
            number_coop: 50,
            registration_number: "ABC-1235",
            body_model: "High Roof",
            chasis_number: "SCB9066572P123459",
            url_foto: "https://example.com/buses/1234.jpg",
            seats_qty: 40,
            vip_seats_qty: 8,
            normal_seats_qty: 32,
            created_by: "71f55d49-efbb-4f7d-9e60-fd48327ddfcf"
        };
        const response = await addBus(bus);
        expect(response).toBe(true);
    });

    test('Prueba de recuperación de todas los buses registrados', async () => {
        const response = await getBuses();
        console.log(response);
        expect(Array.isArray(response)).toBe(true);

        response.forEach((item) => {
            expect(item).toHaveProperty("bus_json");

            const bus = item.bus_json;

            // Validar que cada bus tenga las propiedades esperadas
            expect(bus).toHaveProperty("id_bus");
            expect(bus).toHaveProperty("cooperative");
            expect(bus).toHaveProperty("brand");
            expect(bus).toHaveProperty("model");
            expect(bus).toHaveProperty("number_coop");
            expect(bus).toHaveProperty("registration_number");
            expect(bus).toHaveProperty("body_model");
            expect(bus).toHaveProperty("chasis_number");
            expect(bus).toHaveProperty("url_foto");
            expect(bus).toHaveProperty("seats_qty");
            expect(bus).toHaveProperty("vip_seats_qty");
            expect(bus).toHaveProperty("normal_seats_qty");
            expect(bus).toHaveProperty("status");
            expect(bus).toHaveProperty("created_by");
            expect(bus).toHaveProperty("date_time_create");
            expect(bus).toHaveProperty("updated_by");
            expect(bus).toHaveProperty("date_time_update");

            const cooperative = bus!.cooperative;

            expect(cooperative).toHaveProperty("id_coop");
            expect(cooperative).toHaveProperty("name");
            expect(cooperative).toHaveProperty("buses_qty");
            expect(cooperative).toHaveProperty("status");
            expect(cooperative).toHaveProperty("created_by");
            expect(cooperative).toHaveProperty("date_time_create");
            expect(cooperative).toHaveProperty("updated_by");
            expect(cooperative).toHaveProperty("date_time_update");

        });
    });

    test('Prueba de recuperación de un bus en especifico en base a un identificador.', async () => {
        const id_bus: string = "c87b50f4-48b3-4d13-b0c4-dba8dd638d56";
        const response = await getBusById(id_bus);
        console.log(response);
        expect(response).toHaveProperty("id_bus");
        expect(response).toHaveProperty("cooperative");
        expect(response).toHaveProperty("brand");
        expect(response).toHaveProperty("model");
        expect(response).toHaveProperty("number_coop");
        expect(response).toHaveProperty("registration_number");
        expect(response).toHaveProperty("body_model");
        expect(response).toHaveProperty("chasis_number");
        expect(response).toHaveProperty("url_foto");
        expect(response).toHaveProperty("seats_qty");
        expect(response).toHaveProperty("vip_seats_qty");
        expect(response).toHaveProperty("normal_seats_qty");
        expect(response).toHaveProperty("status");
        expect(response).toHaveProperty("created_by");
        expect(response).toHaveProperty("date_time_create");
        expect(response).toHaveProperty("updated_by");
        expect(response).toHaveProperty("date_time_update");

        const cooperative = response.cooperative;
        expect(cooperative).toHaveProperty("id_coop");
        expect(cooperative).toHaveProperty("name");
        expect(cooperative).toHaveProperty("buses_qty");
        expect(cooperative).toHaveProperty("status");
        expect(cooperative).toHaveProperty("created_by");
        expect(cooperative).toHaveProperty("date_time_create");
        expect(cooperative).toHaveProperty("updated_by");
        expect(cooperative).toHaveProperty("date_time_update");
    });
    
    test('Prueba de actualización de un bus.', async () => {
        const bus: Bus = {
            id_bus: "c87b50f4-48b3-4d13-b0c4-dba8dd638d56",
            brand: "Mercedes-Benz UPDATED",
            model: "Sprinter",
            number_coop: 45,
            registration_number: "ABC-1234",
            url_foto: "https://example.com/buses/1234.jpg",
            seats_qty: 30,
            vip_seats_qty: 4,
            normal_seats_qty: 26,
            status: "active",
            updated_by: "71f55d49-efbb-4f7d-9e60-fd48327ddfcf"
        };
        const response = await updateBus(bus);
        expect(response).toBe(true)
    });

    test('Prueba de eliminación de un bus en especifico en base a un identificador.', async () => {
        const id_bus: string = "345af48f-8bf8-41a3-b3bd-064729d58083";
        const response = await deleteBus(id_bus);
        expect(response).toBe(true)
    });
    

})