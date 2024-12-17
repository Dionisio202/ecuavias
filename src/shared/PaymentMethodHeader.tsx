import React, { useState } from "react";
import paymentIcon from "../assets/payblackIcon.svg";
import paypalIcon from "../assets/paypal-svgrepo-com.svg";

type PaymentOption = "PayPal" | "Deposito";

const PaymentMethod: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<PaymentOption>("PayPal");
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      alert("Solo se permiten archivos de imagen.");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    } else {
      alert("Solo se permiten archivos de imagen.");
    }
  };

  const handleDelete = () => {
    setFile(null);
    setPreview(null);
  };

  const handleButtonClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div className="w-full p-4 bg-transparent rounded-lg">
      {/* Encabezado */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Método de pago</h2>
        <button className="bg-blue-400 text-black px-4 py-2 rounded-2xl hover:bg-blue-500 flex items-center">
          <img src={paymentIcon} alt="Payment Icon" className="w-5 h-5 mr-2" />
          Comprar
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex flex-wrap items-center bg-white p-4 rounded-2xl w-full gap-4">
        <div className="w-full sm:w-auto text-center sm:text-left">
          <div className="text-sm text-green-500 font-semibold mb-1">
            Valor a pagar
          </div>
          <div className="text-2xl text-green-600 font-bold">$12.80</div>
        </div>

        <div className="hidden sm:block h-16 w-px bg-gray-300 mx-4"></div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-8 w-full sm:w-auto justify-center">
          <span className="text-sm font-semibold text-gray-700 text-center sm:text-left">
            Elija un método de pago:
          </span>

          <div className="flex flex-wrap gap-2 justify-center">
            {["PayPal", "Deposito"].map((option) => (
              <button
                key={option}
                className={`flex items-center justify-center w-full sm:w-36 h-12 rounded-lg ${
                  selectedOption === option
                    ? "border-2 border-black bg-white text-black"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onClick={() => {
                  if (option === "Deposito") {
                    setShowModal(true); // Mostrar modal sin cambiar selectedOption
                  } else {
                    setSelectedOption(option as PaymentOption); // Actualizar solo si es PayPal
                  }
                }}
              >
                {option === "PayPal" ? (
                  <img
                    src={paypalIcon}
                    alt="PayPal"
                    className="object-contain w-12 sm:w-16 h-8"
                  />
                ) : (
                  <span className="font-medium">{option}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Si has realizado un depósito bancario
            </h3>

            {/* Área de arrastrar, soltar y vista previa */}
            <div
              className="border-dashed border-2 border-gray-400 p-6 rounded-lg text-center relative"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Vista previa"
                  className="max-h-40 mx-auto object-contain cursor-pointer"
                  onClick={() => window.open(preview, "_blank")}
                />
              ) : (
                <p className="text-gray-600">📷 Arrastra y suelta tu comprobante aquí</p>
              )}
            </div>

            {/* Botones */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex items-center justify-center w-36 h-12 rounded-lg bg-black text-white hover:bg-gray-800"
              >
                ← Regresar
              </button>
              <button
                onClick={handleButtonClick} // Abre el input de archivos
                className="flex items-center justify-center w-36 h-12 rounded-lg bg-black text-white hover:bg-gray-800"
              >
                ↑ Subir comprobante
              </button>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              {file && (
                <button
                  onClick={handleDelete}
                  className="flex items-center justify-center w-36 h-12 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  ✖ Eliminar
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
