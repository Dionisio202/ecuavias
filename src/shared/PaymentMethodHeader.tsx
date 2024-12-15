import React, { useState } from "react";
import paymentIcon from "../assets/payblackIcon.svg";
import paypalIcon from "../assets/paypal-svgrepo-com.svg";

type PaymentOption = "PayPal" | "Deposito";

const PaymentMethod: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<PaymentOption>("PayPal");

  return (
    <div className="w-full p-4 bg-transparent rounded-lg">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Metodo de pago</h2>
        <button className="bg-blue-400 text-black px-4 py-2 rounded-2xl hover:bg-blue-500 flex items-center">
          <img src={paymentIcon} alt="Payment Icon" className="w-5 h-5 mr-2" />
          Comprar
        </button>
      </div>

      {/* Contenido principal */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl w-full">
        {/* Precio */}
        <div className="mr-8">
          <div className="text-sm text-green-500 font-semibold mb-1">
            Valor a pagar
          </div>
          <div className="text-2xl text-green-600 font-bold">$12.80</div>
        </div>

        {/* División sin borde */}
        <div className="h-16 w-px bg-gray-300 mx-4"></div>

        {/* Opciones de pago */}
        <div className="flex items-center gap-8">
          {/* Texto */}
          <span className="text-sm font-semibold text-gray-700">
            Elija un método de pago:
          </span>

          {/* Botones */}
          <div className="flex gap-4">
            {["PayPal", "Deposito"].map((option) => (
              <button
                key={option}
                className={`flex items-center justify-center w-36 h-12 rounded-lg ${
                  option === "PayPal"
                    ? "border-2 border-black p-1 bg-white"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onClick={() => setSelectedOption(option as PaymentOption)}
              >
                {option === "PayPal" ? (
                  <img
                    src={paypalIcon}
                    alt="PayPal"
                    className="object-contain w-16 h-8"
                  />
                ) : (
                  <span className="font-medium">{option}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
