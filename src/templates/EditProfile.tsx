import React, { useState } from "react";
import Header from "../shared/Header";
import SideBar from "../shared/SideBar";
import Preloaded from "../shared/Preloaded";
import User06 from "../assets/user-06.png";
import Cover from "../assets/cover-01.png";
import CameraIcon from "../assets/camera.svg"; // Importa el SVG como un componente

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "Edison",
    segundoNombre: "",
    apellido: "Ortiz",
    segundoApellido: "",
    tipoDocumento: "Cédula",
    numeroDocumento: "",
    fechaNacimiento: "",
    telefono: "",
    email: "",
  });

  const [profileImage, setProfileImage] = useState(User06);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          setProfileImage(reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Información guardada:", formData);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ===== Preloader Component ===== */}
      <Preloaded />

      {/* ===== Sidebar Component ===== */}
      <SideBar />

      {/* ===== Content Area ===== */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        {/* ===== Header Component ===== */}
        <Header />

        {/* ===== Main Content ===== */}
        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <div className="mx-auto max-w-242.5">
              {/* Profile Section */}
              <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                {/* Profile Cover */}
                <div className="relative z-10 h-35 md:h-65">
                  <img
                    src={Cover}
                    alt="profile cover"
                    className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                  />
                  {/* Profile Image */}
                  <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
                    <div className="relative h-30 w-30 rounded-full bg-white p-1 shadow-lg sm:h-44 sm:w-44 sm:p-2">
                      <img
                        src={profileImage}
                        alt="profile"
                        className="h-full w-full rounded-full object-cover"
                      />
                      {/* Camera Icon */}
                      <label className="absolute bottom-2 right-2 bg-slate-500 text-white rounded-full p-2 cursor-pointer shadow-md hover:bg-gray-700">
                        <img src={CameraIcon} className="h-6 w-6" alt="Camera Icon" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Editable Form */}
                <form
                  onSubmit={handleSubmit}
                  className="px-4 pb-6 lg:pb-8 xl:pb-11.5 pt-8 space-y-6 mt-28"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Segundo Nombre
                      </label>
                      <input
                        type="text"
                        name="segundoNombre"
                        value={formData.segundoNombre}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Apellido
                      </label>
                      <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Segundo Apellido
                      </label>
                      <input
                        type="text"
                        name="segundoApellido"
                        value={formData.segundoApellido}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Tipo de Documento
                      </label>
                      <select
                        name="tipoDocumento"
                        value={formData.tipoDocumento}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="Cédula">Cédula</option>
                        <option value="Pasaporte">Pasaporte</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Número de Documento
                      </label>
                      <input
                        type="text"
                        name="numeroDocumento"
                        value={formData.numeroDocumento}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Fecha de Nacimiento
                      </label>
                      <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Teléfono
                      </label>
                      <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
               
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
              {/* Profile Section End */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
