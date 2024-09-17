// ListaGrid.jsx
import React from 'react';

const ListaGrid = ({ items }) => {
  return (
    <div className="lista-grid">
      {items.map(item => (
        <div key={item.id} className="lista-item">
          <a href="#">
            <img src={item.imgSrc} alt={item.text} />
            <p>{item.text}</p>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ListaGrid;
