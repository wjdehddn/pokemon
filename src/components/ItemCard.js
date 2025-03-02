import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ item }) => {
  return (
    <Link to={`/item/${item.id}`} className='card-wrap'>
      <div>
        <img src={item.img_path} alt={item.name} className='card-img'/>
        <p>{item.name}</p>
      </div>
    </Link>
  );
};

export default ItemCard;