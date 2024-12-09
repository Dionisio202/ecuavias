import React, { useState, useEffect } from "react";

interface LayoutData {
  busNumber: string;
  floors: FloorData[];
}

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

interface SeatLayoutEditorProps {
  initialBusNumber: string;
  initialFloors: FloorData[];
  onSave: (updatedLayout: LayoutData) => void;
}

const SeatLayoutEditor: React.FC<SeatLayoutEditorProps> = ({
  initialBusNumber,
  initialFloors,
  onSave,
}) => {
  const [busNumber] = useState(initialBusNumber); // Número del bus no editable
  const [floors, setFloors] = useState<FloorData[]>(initialFloors);
  const [currentFloor, setCurrentFloor] = useState(1);
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [hasChanges, setHasChanges] = useState(false); // Controla si se han hecho cambios

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

  const toggleCellType = (fila: number, columna: number) => {
    const floor = floors.find((f) => f.floorNumber === currentFloor);
    if (!floor) return;

    const existingCell = floor.seats.find(
      (cell) => cell.fila === fila && cell.columna === columna
    );

    if (existingCell) {
      // Alterna entre tipos: Pasillo -> Normal -> VIP
      floor.seats = floor.seats.map((cell) =>
        cell.fila === fila && cell.columna === columna
          ? {
              ...cell,
              tipo:
                cell.tipo === "Pasillo"
                  ? "Normal"
                  : cell.tipo === "Normal"
                  ? "VIP"
                  : "Pasillo",
            }
          : cell
      );
    } else {
      // Añade como Normal por defecto
      floor.seats.push({ fila, columna, tipo: "Normal" });
    }

    setFloors([...floors]);
    setHasChanges(true);
  };

  const saveLayout = () => {
    // Calcula métricas para cada piso
    const updatedFloors = floors.map((floor) => {
      const totalSeats = floor.seats.filter((seat) => seat.tipo !== "Pasillo").length;
      const totalVIPSeats = floor.seats.filter((seat) => seat.tipo === "VIP").length;
      const totalNormalSeats = floor.seats.filter((seat) => seat.tipo === "Normal").length;

      return {
        ...floor,
        totalSeats,
        totalVIPSeats,
        totalNormalSeats,
      };
    });

    const layoutData: LayoutData = {
      busNumber,
      floors: updatedFloors,
    };

    onSave(layoutData);
    alert(`Layout guardado exitosamente:\n\nBus: ${busNumber}\n\n${updatedFloors
      .map(
        (floor) =>
          `Piso ${floor.floorNumber}:\n  - Total de Asientos: ${floor.totalSeats}\n  - Asientos VIP: ${floor.totalVIPSeats}\n  - Asientos Normales: ${floor.totalNormalSeats}`
      )
      .join("\n\n")}`);
    setHasChanges(false);
  };

  const generateGrid = () => {
    if (rows >= 2 && cols >= 3) {
      const existingFloor = floors.find((f) => f.floorNumber === currentFloor);
      if (existingFloor) {
        existingFloor.rows = rows;
        existingFloor.cols = cols;
      } else {
        setFloors([
          ...floors,
          { floorNumber: currentFloor, rows, cols, seats: [], totalSeats: 0, totalVIPSeats: 0, totalNormalSeats: 0 },
        ]);
      }
      setHasChanges(true);
    } else {
      alert("El número de filas debe ser >= 2 y columnas >= 3.");
    }
  };

  const switchFloor = (floorNumber: number) => {
    setCurrentFloor(floorNumber);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Editar Plano</h2>

      {/* Inputs para configurar número de bus y agregar piso */}
      <div className="flex flex-wrap gap-4 items-end justify-center mb-6 w-full max-w-screen-md">
        <div className="flex flex-col items-start">
          <label className="mb-1 text-gray-700 font-semibold">Número del Bus</label>
          <input
            type="text"
            value={busNumber}
            readOnly
            className="px-4 py-2 border bg-gray-200 rounded w-full sm:w-auto cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col items-start">
          <label className="mb-1 text-gray-700 font-semibold">Número de filas</label>
          <input
            type="number"
            placeholder="Filas"
            value={rows}
            onChange={(e) => {
              setRows(Math.max(2, Number(e.target.value)));
              setHasChanges(true);
            }}
            className="px-4 py-2 border rounded w-full sm:w-auto"
          />
        </div>
        <div className="flex flex-col items-start">
          <label className="mb-1 text-gray-700 font-semibold">Número de columnas</label>
          <input
            type="number"
            placeholder="Columnas"
            value={cols}
            onChange={(e) => {
              setCols(Math.max(3, Number(e.target.value)));
              setHasChanges(true);
            }}
            className="px-4 py-2 border rounded w-full sm:w-auto"
          />
        </div>
        <button
          onClick={generateGrid}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Generar
        </button>
      </div>

      {/* Selección de piso */}
      <div className="flex gap-4 mb-6">
        {[...Array(floors.length + 1).keys()].slice(1).map((floorNumber) => (
          <button
            key={floorNumber}
            onClick={() => switchFloor(floorNumber)}
            className={`px-4 py-2 rounded ${
              currentFloor === floorNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-black hover:bg-gray-400"
            }`}
          >
            Piso {floorNumber}
          </button>
        ))}
        <button
          onClick={() => switchFloor(floors.length + 1)}
          className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
        >
          + Añadir Piso
        </button>
      </div>

      <div className="flex items-center justify-center w-full">
        <div className="relative flex items-center max-w-full overflow-x-auto">
          <div
            className="text-gray-800 font-bold text-xl mr-6 rotate-0"
            style={{ marginRight: "1rem", writingMode: "vertical-lr", transform: "rotate(180deg)" }}
          >
            Cabina
          </div>
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
                  onClick={() => toggleCellType(fila, columna)}
                  className={`w-12 h-12 flex items-center justify-center border rounded cursor-pointer ${
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

      <div className="mt-6">
        <button
          onClick={saveLayout}
          disabled={!hasChanges}
          className={`px-4 py-2 rounded shadow ${
            hasChanges
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default SeatLayoutEditor;
