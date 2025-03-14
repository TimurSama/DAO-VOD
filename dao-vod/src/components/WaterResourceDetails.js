import React from 'react';
import { FaWater, FaChartLine, FaMapMarkerAlt, FaHistory } from 'react-icons/fa';

const WaterResourceDetails = ({ resource }) => {
  if (!resource) return null;

  return (
    <div className="water-resource-details">
      <div className="resource-header">
        <FaWater className="resource-icon" />
        <h2>{resource.name}</h2>
      </div>
      
      <div className="resource-info-grid">
        <div className="info-card">
          <FaMapMarkerAlt className="card-icon" />
          <h3>Расположение</h3>
          <p>{resource.location}</p>
        </div>
        
        <div className="info-card">
          <FaChartLine className="card-icon" />
          <h3>Параметры</h3>
          <ul>
            <li>pH: {resource.ph}</li>
            <li>Растворенный кислород: {resource.dissolvedOxygen} мг/л</li>
            <li>Температура: {resource.temperature}°C</li>
          </ul>
        </div>
        
        <div className="info-card">
          <FaHistory className="card-icon" />
          <h3>История измерений</h3>
          <div className="measurement-history">
            {resource.measurements?.map((measurement, index) => (
              <div key={index} className="measurement-item">
                <span className="date">{measurement.date}</span>
                <span className="value">{measurement.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="resource-actions">
        <button className="action-button">Добавить измерение</button>
        <button className="action-button">Поделиться данными</button>
        <button className="action-button">Создать отчет</button>
      </div>
    </div>
  );
};

export default WaterResourceDetails; 