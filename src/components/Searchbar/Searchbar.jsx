import React from 'react';
import css from './Searchbar.module.css';
import { Notify } from 'notiflix';

export default function Searchbar({ onSubmit }) {
  const handleSubmit = e => {
    const inputValue = e.currentTarget.elements.query.value;
    if (inputValue === '') {
      Notify.failure('Please type something!');
      return;
      onSubmit(inputValue);
    }
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={onSubmit}>
        <button className={css.SearchFormButton} type="submit">
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
      </form>
    </header>
  );
}
