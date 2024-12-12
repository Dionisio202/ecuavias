import { Bus } from "../interfaces/Bus.interface";
import { supabase } from '../supabaseClient';

export async function addBus(bus: Bus): Promise<boolean> {
    const { id_coop, brand, model, number_coop, registration_number, body_model, chasis_number, url_foto, seats_qty, vip_seats_qty, normal_seats_qty, created_by } = bus;
    const { error } = await supabase.from("buses").insert({
        id_coop,
        brand,
        model,
        number_coop,
        registration_number,
        body_model,
        chasis_number,
        url_foto,
        seats_qty,
        vip_seats_qty,
        normal_seats_qty,
        created_by,
        date_time_create: "now()",
    });
    if (error) {
        throw new Error(
            "Error al intentar registrar una nueva cooperativa. Error: " + error.message
        );
    }
    return true;
}

export async function getBuses(): Promise<Bus[]> {
    const { data, error } = await supabase.rpc('get_all_buses');
    if (error) throw new Error(error.message);
    return data as Bus[];
}

export async function getBusById(id_bus: string): Promise<Bus> {
    const { data, error } = await supabase.rpc('get_bus_by_id', {id_bus});
    if (error) throw new Error(error.message);
    return data as Bus;
}

export async function updateBus(bus: Bus): Promise<boolean>{
    const { error } = await supabase.from("buses").update(
        {
            brand: bus.brand,
            model: bus.model,
            number_coop: bus.number_coop,
            url_foto: bus.url_foto,
            seats_qty: bus.seats_qty,
            registration_number: bus.registration_number,
            body_model: bus.body_model,
            vip_seats_qty: bus.vip_seats_qty,
            normal_seats_qty: bus.normal_seats_qty,
            status: bus.status,
            updated_by: bus.updated_by,
            date_time_update: "now()"
        }
    ).eq("id_bus", bus.id_bus);
    if( error ) throw new Error(error.message);
    return true;
}

export async function deleteBus(id_bus: string):Promise<boolean>{
    const { error } = await supabase.from("buses").update({status: "deleted"}).eq("id_bus", id_bus); 
    if( error ) throw new Error(error.message);
    return true;
}
