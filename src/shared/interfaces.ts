export interface Seat {
    id: number;
    numero: string;
    bus: string;
    categoria: string;
    totalAsientos: number;
    asientosVIP: number;
    asientosNormales: number;
    estado: string;
    floors: FloorData[]; // Relación con los pisos del bus
  }
  
  export interface LayoutData {
    busNumber: string;
    floors: FloorData[];
  }
  
  export interface FloorData {
    floorNumber: number;
    rows: number;
    cols: number;
    seats: Cell[];
    totalSeats: number;
    totalVIPSeats: number;
    totalNormalSeats: number;
  }
  
  export interface Cell {
    fila: number;
    columna: number;
    tipo: "VIP" | "Normal" | "Pasillo";
  }
  