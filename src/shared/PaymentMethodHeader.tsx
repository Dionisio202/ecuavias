import React, { useState } from "react";

type PaymentOption = "Tarjeta" | "PayPal" | "Deposito";

const PaymentMethod: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<PaymentOption>("Tarjeta");

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Metodo de pago</h2>
        <button className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 flex items-center">
          <span className="material-icons mr-2">shopping_cart</span>
          Comprar
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex items-center bg-white p-4 rounded shadow">
        {/* Precio */}
        <div className="mr-8">
          <div className="text-sm text-green-500 font-semibold mb-1">Valor a pagar</div>
          <div className="text-2xl text-green-600 font-bold">$12.80</div>
        </div>

        {/* División */}
        <div className="h-full border-l border-gray-300 mx-4"></div>

        {/* Opciones de pago */}
        <div>
          <div className="text-sm mb-2 font-semibold">Elija un metodo de pago:</div>
          <div className="flex gap-4">
            {["Tarjeta", "PayPal", "Deposito"].map((option) => (
              <button
                key={option}
                className={`px-4 py-2 rounded text-white font-medium ${
                  selectedOption === option
                    ? "bg-blue-700"
                    : "bg-blue-500 hover:bg-blue-600"
                } flex items-center`}
                onClick={() => setSelectedOption(option as PaymentOption)}
              >
                <span className="material-icons mr-2">credit_card</span>
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
