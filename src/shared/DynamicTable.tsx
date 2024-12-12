import React, { useState } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import TrashIcon from "../assets/Trash.svg";
import ArrowBackIcon from "../assets/arrowback.svg";
import ArrowNextIcon from "../assets/nextarrow.svg";
import EditIcon from "../assets/edit.svg";
import ViewIcon from "../assets/eyei.svg"; // Icono para ver detalles

interface DynamicTableProps<T> {
  headers: string[]; // Encabezados de las columnas
  tableTitle: string; // Título de la tabla
  data: T[]; // Datos a mostrar en la tabla
  keyExtractor: (item: T) => number; // Función para extraer el identificador único de cada fila
  renderRow: (item: T) => JSX.Element[]; // Función para renderizar cada fila basada en los datos
  onDeleteSelected: (selectedIds: number[]) => void; // Callback para eliminar filas seleccionadas
  onEditRow: (item: T) => void; // Callback para editar una fila
  onViewRow?: (item: T) => void; // Callback para ver detalles de una fila
}

const DynamicTable = <T extends unknown>({
  headers,
  tableTitle,
  data,
  keyExtractor,
  renderRow,
  onDeleteSelected,
  onEditRow,
  onViewRow,
}: DynamicTableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Lógica de paginación
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handleSelectRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const isRowSelected = (id: number) => selectedRows.includes(id);

  return (
    <div className="bg-white p-6 rounded-3xl shadow-md">
      {/* Header de la tabla */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">{tableTitle}</h2>
        <div className="flex items-center gap-4">
          {/* Botón de eliminar seleccionados */}
          <button
            onClick={() => onDeleteSelected(selectedRows)}
            className={`flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 ${
              selectedRows.length === 0 && "opacity-50 pointer-events-none"
            }`}
          >
            <img src={TrashIcon} alt="Delete" className="w-5 h-5" />
            Eliminar seleccionados
          </button>

          {/* Paginador */}
          <Pagination
            count={Math.ceil(data.length / rowsPerPage)}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                slots={{
                  previous: () => (
                    <span className="flex items-center gap-2">
                      <img src={ArrowBackIcon} alt="Previous" className="w-4 h-4" />
                      <span>Anterior</span>
                    </span>
                  ),
                  next: () => (
                    <span className="flex items-center gap-2">
                      <span>Siguiente</span>
                      <img src={ArrowNextIcon} alt="Next" className="w-4 h-4" />
                    </span>
                  ),
                }}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "12px",
                  },
                  borderRadius: "12px",
                }}
              />
            )}
          />
        </div>
      </div>

      {/* Tabla dinámica */}
      <div className="overflow-x-auto bg-white p-6 rounded-3xl shadow-md">
        <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-2">
          <thead className="text-white">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedRows(
                      e.target.checked
                        ? currentRows.map((row) => keyExtractor(row))
                        : []
                    )
                  }
                  checked={
                    selectedRows.length === currentRows.length &&
                    currentRows.length > 0
                  }
                />
              </th>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 bg-gray-900 text-center rounded-full"
                >
                  {header}
                </th>
              ))}
              <th className="px-4 py-2 bg-gray-900 text-center rounded-full">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr
                key={keyExtractor(row)}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={isRowSelected(keyExtractor(row))}
                    onChange={() => handleSelectRow(keyExtractor(row))}
                  />
                </td>
                {renderRow(row)}
                <td className="px-4 py-2 flex gap-2 justify-center">
                  {/* Botón de editar */}
                  <button
                    onClick={() => onEditRow(row)}
                    className="flex items-center justify-center w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
                  >
                    <img src={EditIcon} alt="Edit" className="w-5 h-5" />
                  </button>
                  {/* Botón de ver detalles (asientos) */}
                  {onViewRow && (
                    <button
                      onClick={() => onViewRow(row)}
                      className="flex items-center justify-center w-8 h-8 bg-gray-500 hover:bg-gray-600 text-white rounded-full"
                    >
                      <img src={ViewIcon} alt="View" className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;