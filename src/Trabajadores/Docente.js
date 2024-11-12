import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../App.css';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);

  const fetchClientes = async () => {
    try {
      const response = await fetch('https://alex.starcode.com.mx/apiBD.php');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchClientes();
    const intervalId = setInterval(fetchClientes, 5000); // Actualiza cada 5 segundos
    return () => clearInterval(intervalId);
  }, []);

  // Datos para la gráfica
  const data = {
    labels: clientes.map((cliente) => `ID ${cliente.id}`),  // Los ID de los clientes
    datasets: [
      {
        label: 'IDs de Clientes',
        data: clientes.map((cliente) => cliente.id),  // Usar el ID de cada cliente
        backgroundColor: 'rgba(75, 192, 192, 0.2)',  // Color de las barras
        borderColor: 'rgba(75, 192, 192, 1)',  // Color de los bordes de las barras
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      {/* Título centrado con fondo negro */}
      <h1 className="title">CLIENTES INGENIERÍA INFORMÁTICA TESSFP</h1>

      {/* Tarjetas de clientes con estilo fresco */}
      <div className="clientes-container">
        {clientes.map((cliente) => (
          <div className="cliente-card" key={cliente.id}>
            <h3>ID: {cliente.id}</h3>
            <p><strong>Nombre:</strong> {cliente.nombre}</p>
            <p><strong>Teléfono:</strong> {cliente.telefono}</p>
            <p><strong>Sexo:</strong> {cliente.sexo}</p>
          </div>
        ))}
      </div>

      {/* Gráfica */}
      <div>
        <h2>Gráfica de IDs de Clientes</h2>
        <Bar data={data} />
      </div>
    </div>
  );
};

export default ListaClientes;