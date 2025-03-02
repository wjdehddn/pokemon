import React, { useState, useEffect } from 'react';
import { typeData } from '../data/TypeMockData';
import "./FilterPanel.css";

const FilterPanel = ({ setFilters }) => {
  const [selectedTypes, setSelectedTypes] = useState(typeData.map(type => type.type_ko));
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMediaTriggered, setIsMediaTriggered] = useState(false); // 1300px 이하에서 한 번만 변경

  // 1300px 이하로 처음 진입할 때만 패널 상태 변경
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1300 && !isMediaTriggered) {
        setIsPanelOpen(false);
        setIsMediaTriggered(true); // 한 번만 실행되도록 설정
      }
    };

    handleResize(); // 컴포넌트 마운트 시에도 실행
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMediaTriggered]);

  const handleSelectAll = () => {
    if (selectedTypes.length === typeData.length) {
      setSelectedTypes([]);
      setFilters([]);
    } else {
      setSelectedTypes(typeData.map(type => type.type_ko));
      setFilters(typeData.map(type => type.type_ko));
    }
  };

  const handleTypeChange = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(updatedTypes);
    setFilters(updatedTypes);
  };

  return (
    <div>
      <button className="search-toggle" onClick={() => setIsPanelOpen(!isPanelOpen)}>
        {isPanelOpen ? "닫기" : "상세검색"}
      </button>
      <div className={`filter-panel ${isPanelOpen ? "open" : "closed"}`}>
        <div className='panel-wrap'>
          <label className="select-all-label">
            <input
              type="checkbox"
              checked={selectedTypes.length === typeData.length}
              onChange={handleSelectAll}
              className="select-all-checkbox"
            />
            전체
          </label>
          <div className="type-list">
            {typeData.map(({ type_ko, img_path }) => (
              <label key={type_ko} className="type-label">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type_ko)}
                  onChange={() => handleTypeChange(type_ko)}
                  className="type-checkbox"
                />
                <img src={img_path} alt={type_ko} className="type-image" />
                <p>{type_ko}</p>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;