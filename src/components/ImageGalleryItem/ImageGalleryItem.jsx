import React from 'react';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ picture, toggleModal }) {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => toggleModal(picture.id)}
    >
      <img src={picture.webformatURL} alt={picture.tags} loading="lazy" />
    </li>
  );
}
