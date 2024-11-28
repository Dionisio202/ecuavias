import React, { useEffect, useState } from "react";

const Preloaded: React.FC = () => {
  const [loaded, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    // Simula el retraso de carga (500ms)
    const timer = setTimeout(() => {
      setLoaded(false); // Oculta el preloader después de 500ms
    }, 500);

    // Limpia el temporizador si el componente se desmonta antes de terminar
    return () => clearTimeout(timer);
  }, []);

  // Si ya se cargó, no renderiza el preloader
  if (!loaded) return null;

  return (
    <div className="fixed left-0 top-0 z-[999999] flex h-screen w-screen items-center justify-center bg-white dark:bg-black">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Preloaded;
