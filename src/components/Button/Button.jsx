import React from 'react';
import css from './Button.module.css';

export default function Button({ onClick }) {
  return (
    <button className={css.Button} type="button" onClick={onClick}>
      Load more
    </button>
  );
}
