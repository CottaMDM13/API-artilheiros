import React, { useEffect, useState } from 'react';

const App = () => {
  const [artilheiros, setArtilheiros] = useState([]);
  const [carregando, setCarregando] = useState(true); 
  
  useEffect(() => {
    const fetchArtilheiros = async () => {
      try {
        const response = await fetch('./assets/data.json'); 
        const data = await response.json();
        const transformedData = data.map(artilheiro => ({
          nome: artilheiro.nome,
          gols: artilheiro.gols,
          clubes: artilheiro.clubes,
          pais: artilheiro.pais,
        }));
        setArtilheiros(transformedData); 
        setCarregando(false); 
      } catch (error) {
        console.error('Erro ao buscar artilheiros:', error);
        setCarregando(false);
      }
    };

    fetchArtilheiros();
  }, []);

  if (carregando) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="app-container">
      <h1>Lista de Artilheiros</h1>
      <ul>
        {artilheiros.map(artilheiro => (
          <li key={artilheiro.nome}>
            {artilheiro.nome} - {artilheiro.gols} gols
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

