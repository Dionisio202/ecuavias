import React, { useState, useEffect } from "react";

//interface LayoutData {
  //busNumber: string;
  //floors: FloorData[];
//}

interface FloorData {
  floorNumber: number;
  rows: number;
  cols: number;
  seats: Cell[];
  totalSeats: number;
  totalVIPSeats: number;
  totalNormalSeats: number;
}

interface Cell {
  fila: number;
  columna: number;
  tipo: "VIP" | "Normal" | "Pasillo";
}

interface SeatLayoutViewerProps {
  busNumber: string;
  floors: FloorData[];
}

const SeatLayoutViewer: React.FC<SeatLayoutViewerProps> = ({
  busNumber,
  floors,
}) => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);

  useEffect(() => {
    const currentFloorData = floors.find((f) => f.floorNumber === currentFloor);
    if (currentFloorData) {
      setRows(currentFloorData.rows);
      setCols(currentFloorData.cols);
    } else {
      setRows(0);
      setCols(0);
    }
  }, [currentFloor, floors]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Ver Plano</h2>

      {/* Información del Bus */}
      <div className="flex flex-col items-start mb-6">
        <label className="mb-1 text-gray-700 font-semibold">Número del Bus:</label>
        <input
          type="text"
          value={busNumber}
          readOnly
          className="px-4 py-2 border bg-gray-200 rounded w-full sm:w-auto cursor-not-allowed"
        />
      </div>

      {/* Selección de Piso */}
      <div className="flex gap-4 mb-6">
        {floors.map((floor) => (
          <button
            key={floor.floorNumber}
            onClick={() => setCurrentFloor(floor.floorNumber)}
            className={`px-4 py-2 rounded ${
              currentFloor === floor.floorNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            Piso {floor.floorNumber}
          </button>
        ))}
      </div>

      {/* Visualización del Plano */}
      <div className="flex items-center justify-center w-full">
        <div className="relative flex items-center max-w-full overflow-x-auto">
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${cols}, 3rem)`, gap: "0.5rem" }}
          >
            {Array.from({ length: rows * cols }).map((_, index) => {
              const fila = Math.floor(index / cols);
              const columna = index % cols;

              const cell = floors
                .find((f) => f.floorNumber === currentFloor)
                ?.seats.find((c) => c.fila === fila && c.columna === columna);

              return (
                <div
                  key={index}
                  className={`w-12 h-12 flex items-center justify-center border rounded ${
                    cell
                      ? cell.tipo === "Pasillo"
                        ? "bg-black"
                        : cell.tipo === "VIP"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                      : "bg-gray-300"
                  }`}
                >
                  {cell ? (cell.tipo === "Pasillo" ? "" : `${fila + 1}-${columna + 1}`) : ""}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLayoutViewer;
