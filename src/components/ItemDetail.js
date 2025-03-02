import React from 'react';
import { useParams } from 'react-router-dom';
import { equipmentData } from '../data/EquipmentMockData';

const ItemDetail = () => {
  const { id } = useParams();
  const item = equipmentData.find((item) => item.id.toString() === id);

  if (!item) {
    return <p>존재하지 않는 아이템입니다.</p>;
  }

  return (
    <div className="pokemon-detail">
      <img src={item.img_path} alt={item.name}/>
      <div className="pokemon-info">
        <h1>{item.name}</h1>
        <p>{item.effect.effect_ko}</p> {/* 아이템 설명 추가 */}
      </div>
    </div>
  );
};

export default ItemDetail;