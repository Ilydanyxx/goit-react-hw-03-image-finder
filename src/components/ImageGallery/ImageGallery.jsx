import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ pictures, toggleModal }) {
  return (
    <ul className={css.ImageGallery}>
      {pictures.map(picture => {
        return (
          <ImageGalleryItem
            key={picture.id}
            picture={picture}
            toggleModal={() => toggleModal(picture.id)}
          />
        );
      })}
    </ul>
  );
}
