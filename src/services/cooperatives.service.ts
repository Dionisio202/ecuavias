import { Cooperative } from "../interfaces/Cooperatives.interface";
import { supabase } from "../supabaseClient";

async function addCooperative(cooperative: Cooperative) {
    const { name, ruc, address, website_url, logo_url, buses_qty, created_by } = cooperative;
    try {
        const { error } = await supabase
        .from('cooperatives')
        .insert(
            { 
                name,
                ruc,
                address, 
                website_url,
                logo_url,
                buses_qty,
                created_by
            }
        )     
        if( error ){
            throw new Error("Error al intentar registrar una nueva cooperativa. Error: " + error);
        }
    } catch (error) {
        throw error;
    }
}