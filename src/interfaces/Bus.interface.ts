import { Cooperative } from "./Cooperatives.interface";

export interface Bus {
    bus_json?: Bus;
    cooperative?: Cooperative
    id_bus?: string; // UUID
    id_coop?: string; // UUID
    brand: string;
    model: string;
    number_coop: number;
    registration_number: string;
    body_model?: string;
    chasis_number?: string;
    url_foto: string;
    seats_qty: number;
    vip_seats_qty: number;
    normal_seats_qty: number;
    status?: string;
    created_by?: string; // UUID
    date_time_create?: string; // TIMESTAMP (formato ISO)
    updated_by?: string; // UUID (opcional si puede ser nulo)
    date_time_update?: string; // TIMESTAMP (opcional si puede ser nulo)
}  