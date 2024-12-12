import { Cooperative } from "../interfaces/Cooperatives.interface";
import { supabase } from '../supabaseClient';

export async function addCooperative(cooperative: Cooperative): Promise <boolean> {
    const { name, ruc, address, website_url, logo_url, buses_qty, created_by } =
        cooperative;
    const { error } = await supabase.from("cooperatives").insert({
        name,
        ruc,
        address,
        website_url,
        logo_url,
        buses_qty,
        created_by,
        date_time_create: 'now()'
    });
    if (error) {
        throw new Error(
            "Error al intentar registrar una nueva cooperativa. Error: " + error
        );
    }
    return true;
}

export async function getCooperatives(): Promise<Cooperative[]>{
    const { data, error } = await supabase.from("cooperatives").select("*").neq("status","deleted");
    if( error ){
        throw new Error(
            "Error al intentar obtener las cooperativas. Error: " + error
        );
    }
    return data as Cooperative[];
}

export async function getCooperativeByID(id_coop: string): Promise<Cooperative>{
    const { data, error } = await supabase.from("cooperatives").select("*").eq("id_coop",id_coop).neq("status","deleted");
    if( error ){
        throw new Error(
            "Error al intentar obtener las cooperativas. Error: " + error
        );
    }
    return data[0] as Cooperative;
}

export async function updateCooperative(cooperative: Cooperative): Promise<boolean> {
    const { error } = await supabase.from("cooperatives").update({
        name: cooperative.name,
        address: cooperative.address,
        website_url: cooperative.website_url,
        logo_url: cooperative.logo_url,
        buses_qty: cooperative.buses_qty,
        status: cooperative.status,
        updated_by: cooperative.updated_by,
        date_time_update: "now()"
    }).eq("id_coop", cooperative.id_coop);

    if( error ){
        throw new Error(
            "Error al intentar actualizar la cooperativa seleccionada. Error: " + error.message
        );
    }

    return true;
}


export async function deleteCooperative(id_coop: string): Promise<boolean> {
    const { error } = await supabase.from("cooperatives").update({ status: "deleted" }).eq("id_coop", id_coop);

    if( error ){
        throw new Error(
            "Error al intentar actualizar la cooperativa seleccionada. Error: " + error
        );
    }

    return true;
}