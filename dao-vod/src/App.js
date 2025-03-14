import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { 
  FaWater, FaIndustry, FaFlask, FaUniversity, FaChartLine,
  FaUser, FaUsers, FaComments, FaLayerGroup, FaWallet,
  FaHandHoldingUsd, FaNewspaper, FaVoteYea, FaGraduationCap,
  FaMapMarkedAlt, FaFileAlt, FaCog
} from 'react-icons/fa';
import CyberWater from './components/CyberWater';
import WaterResourceDetails from './components/WaterResourceDetails';
import './App.css';

const Marker = ({ position, type, onClick }) => {
  const getIcon = () => {
    switch (type) {
      case 'pump':
        return <FaIndustry />;
      case 'lab':
        return <FaFlask />;
      case 'institute':
        return <FaUniversity />;
      default:
        return <FaWater />;
    }
  };

  return (
    <div
      className="marker"
      style={{
        left: `${position[0]}%`,
        top: `${position[1]}%`,
      }}
      onClick={onClick}
    >
      {getIcon()}
    </div>
  );
};

const Popup = ({ data, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-header">
        <h3>{data.title}</h3>
        <span className="popup-close" onClick={onClose}>×</span>
      </div>
      <div className="popup-content">
        <p>{data.description}</p>
        {data.details && (
          <div>
            <h4>Детали:</h4>
            <ul>
              {data.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Компоненты для разных разделов
const Profile = () => (
  <div className="section-content">
    <div className="profile-header">
      <div className="avatar-upload">
        <input type="file" id="avatar" accept="image/*" />
        <label htmlFor="avatar">Загрузить аватар</label>
      </div>
    </div>
    <div className="verification-info">
      <h3>Верификация</h3>
      <div className="verification-status">
        <span className="status-badge verified">Верифицирован</span>
      </div>
    </div>
    <div className="public-info">
      <h3>Публичная информация</h3>
      <div className="info-grid">
        <div className="info-item">
          <span className="label">Уровень</span>
          <span className="value">Эксперт</span>
        </div>
        <div className="info-item">
          <span className="label">Токены</span>
          <span className="value">1,234 VOD</span>
        </div>
      </div>
    </div>
  </div>
);

const Friends = () => (
  <div className="section-content">
    <h2>Друзья</h2>
    <div className="friends-list">
      {/* Список друзей */}
    </div>
  </div>
);

const Messages = () => (
  <div className="section-content">
    <h2>Сообщения</h2>
    <div className="messages-list">
      {/* Список сообщений */}
    </div>
  </div>
);

const Groups = () => (
  <div className="section-content">
    <h2>Группы</h2>
    <div className="groups-list">
      {/* Список групп */}
    </div>
  </div>
);

const Wallet = () => (
  <div className="section-content">
    <h2>Кошелек</h2>
    <div className="wallet-info">
      <div className="balance">
        <h3>Баланс</h3>
        <span className="amount">1,234 VOD</span>
      </div>
      <div className="transactions">
        <h3>Транзакции</h3>
        {/* Список транзакций */}
      </div>
    </div>
  </div>
);

const InvestmentPools = () => (
  <div className="section-content">
    <div className="section-header">
      <h2>Инвестиционные пулы</h2>
      <button className="add-button">Добавить проект</button>
    </div>
    <div className="pools-grid">
      {/* Список проектов */}
    </div>
  </div>
);

const News = () => (
  <div className="section-content">
    <div className="section-header">
      <h2>Новости</h2>
      <button className="add-button">Добавить новость</button>
    </div>
    <div className="news-feed">
      {/* Лента новостей */}
    </div>
  </div>
);

const Voting = () => (
  <div className="section-content">
    <div className="section-header">
      <h2>Голосования</h2>
      <button className="add-button">Создать голосование</button>
    </div>
    <div className="voting-list">
      {/* Список голосований */}
    </div>
  </div>
);

const Education = () => (
  <div className="section-content">
    <h2>Обучение</h2>
    <div className="education-categories">
      <div className="category">
        <h3>5-10 лет</h3>
        <div className="programs-list">
          {/* Программы для детей */}
        </div>
      </div>
      <div className="category">
        <h3>10-16 лет</h3>
        <div className="programs-list">
          {/* Программы для подростков */}
        </div>
      </div>
      <div className="category">
        <h3>16+</h3>
        <div className="programs-list">
          {/* Программы для взрослых */}
        </div>
      </div>
      <div className="category">
        <h3>Исследователи</h3>
        <div className="programs-list">
          {/* Программы для исследователей */}
        </div>
      </div>
    </div>
  </div>
);

const EarnAndGo = () => (
  <div className="section-content">
    <h2>Earn & Go</h2>
    <div className="map-container">
      {/* Карта с GPS */}
    </div>
    <div className="instructions">
      <h3>Как заработать токены:</h3>
      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <p>Найдите ближайший водный ресурс на карте</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <p>Подойдите к указанному месту</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <p>Проведите анализ с помощью теста</p>
        </div>
        <div className="step">
          <div className="step-number">4</div>
          <p>Загрузите результаты в приложение</p>
        </div>
        <div className="step">
          <div className="step-number">5</div>
          <p>Получите токены за вклад в исследования</p>
        </div>
      </div>
    </div>
  </div>
);

const WhitePaper = () => (
  <div className="section-content">
    <div className="wp-container">
      <div className="wp-icon">
        <FaFileAlt />
      </div>
      <h2>White Paper</h2>
      <p>Документ загружается...</p>
    </div>
  </div>
);

const Settings = () => (
  <div className="section-content">
    <h2>Настройки</h2>
    <div className="settings-list">
      {/* Список настроек */}
    </div>
  </div>
);

// Основной компонент App
function App() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [activeSection, setActiveSection] = useState('globe');
  const [zoom, setZoom] = useState(1);
  const [selectedResource, setSelectedResource] = useState(null);

  const markers = [
    {
      id: 1,
      position: [30, 40],
      type: 'pump',
      data: {
        title: 'Центральная насосная станция',
        description: 'Крупнейшая насосная станция в регионе',
        details: ['Производительность: 1000 м³/час', 'Год постройки: 2020']
      }
    },
    {
      id: 2,
      position: [60, 70],
      type: 'lab',
      data: {
        title: 'Исследовательская лаборатория',
        description: 'Центр изучения качества воды',
        details: ['Специализация: Анализ загрязнений', 'Основана: 2018']
      }
    },
    {
      id: 3,
      position: [45, 55],
      type: 'institute',
      data: {
        title: 'Институт водных ресурсов',
        description: 'Ведущий научный центр по изучению водных ресурсов',
        details: ['Направления: Экология, Гидрология', 'Основан: 2015']
      }
    }
  ];

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setPopupData(marker.data);
    setSelectedResource({
      name: marker.data.title,
      location: marker.data.description,
      ph: 7.2,
      dissolvedOxygen: 8.5,
      temperature: 18.5,
      measurements: [
        { date: '2024-03-20', value: 'pH: 7.2' },
        { date: '2024-03-19', value: 'pH: 7.1' },
        { date: '2024-03-18', value: 'pH: 7.3' }
      ]
    });
  };

  const handleZoom = (delta) => {
    setZoom(prev => Math.max(0.5, Math.min(2, prev + delta)));
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return <Profile />;
      case 'friends': return <Friends />;
      case 'messages': return <Messages />;
      case 'groups': return <Groups />;
      case 'wallet': return <Wallet />;
      case 'pools': return <InvestmentPools />;
      case 'news': return <News />;
      case 'voting': return <Voting />;
      case 'education': return <Education />;
      case 'earn': return <EarnAndGo />;
      case 'whitepaper': return <WhitePaper />;
      case 'settings': return <Settings />;
      default: return null;
    }
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="sidebar-icon" onClick={() => setActiveSection('profile')}>
          <FaUser />
        </div>
        <div className="sidebar-icon" onClick={() => setActiveSection('friends')}>
          <FaUsers />
        </div>
        <div className="sidebar-icon" onClick={() => setActiveSection('messages')}>
          <FaComments />
        </div>
        <div className="sidebar-icon" onClick={() => setActiveSection('groups')}>
          <FaLayerGroup />
        </div>
        <div className="sidebar-icon" onClick={() => setActiveSection('wallet')}>
          <FaWallet />
        </div>
        <div className="sidebar-icon" onClick={() => setActiveSection('pools')}>
          <FaHandHoldingUsd />
        </div>
        <div className="sidebar-icon" onClick={() => setActiveSection('news')}>
          <FaNewspaper />
        </div>
        <div className="sidebar-icon" onClick={() => setActiveSection('voting')}>
          <FaVoteYea />
        </div>
        <div className="sidebar-icon" onClick={() => setActiveSection('education')}>
          <FaGraduationCap />
        </div>
        <div className="sidebar-icon" onClick={() => setActiveSection('earn')}>
          <FaMapMarkedAlt />
        </div>
        <div className="sidebar-icon" onClick={() => setActiveSection('whitepaper')}>
          <FaFileAlt />
        </div>
        <div className="sidebar-icon" onClick={() => setActiveSection('settings')}>
          <FaCog />
        </div>
      </div>
      
      <div className="main-content">
        {activeSection === 'globe' ? (
          <>
            <Canvas>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <CyberWater scale={[zoom, zoom, zoom]} />
              <OrbitControls 
                enableZoom={true} 
                enablePan={true} 
                enableRotate={true}
                onZoom={(e) => handleZoom(e.delta)}
              />
            </Canvas>
            
            {markers.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                type={marker.type}
                onClick={() => handleMarkerClick(marker)}
              />
            ))}

            {selectedResource && (
              <div className="resource-details-container">
                <WaterResourceDetails resource={selectedResource} />
              </div>
            )}
          </>
        ) : (
          renderSection()
        )}
      </div>

      {popupData && (
        <Popup
          data={popupData}
          onClose={() => {
            setPopupData(null);
            setSelectedMarker(null);
            setSelectedResource(null);
          }}
        />
      )}
    </div>
  );
}

export default App; 