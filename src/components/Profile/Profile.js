import './Profile.css';
import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderMain from '../HeaderMain/HeaderMain';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useValidation from '../../utils/configs/ValidationForm';
import InfoTooltip from '../Infotooltip/InfoTooltip';
import okImage from '../../images/ok.svg';

function Profile({ onUpdateUserInfo, signOut}) {
  const currentUser = useContext(CurrentUserContext);
  const { errors, values, isValid, handleChange, resetValidation } =
  useValidation();
  const { email, name } = values;
  const [isDisabled, setIsDisabled] = useState(false);
  const [infoTooltipText, setInfoTooltipText] = useState('');
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  useEffect(() => {
    resetValidation({ email: currentUser.email, name: currentUser.name });
  }, [currentUser]);

  useEffect(() => {
    let isActiveButton = (values.name !== currentUser.name) || (values.email !== currentUser.email);
    setIsDisabled(isActiveButton);
  }, [values, currentUser, isValid])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUserInfo({ email, name });
  }

  function closePopup() {
    setInfoTooltipPopupOpen(false);
  }

  return (
    <>
      <header>
        <HeaderMain />
      </header>
      <form className='profile' onSubmit={handleSubmit} noValidate>
        <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
        <div className='profile__block'>
          <label className='profile__label profile__label-name'>
            <p className='profile__subtitle'>Имя</p>
            <input
              name='name'
              className='profile__input'
              type='text'
              required
              placeholder={currentUser.name}
              value={values.name || ''}
              onChange={handleChange}
            />
          </label>
          <label className='profile__label'>
            <p className='profile__subtitle'>E-mail</p>
            <input
              name='email'
              className='profile__input'
              type='email'
              placeholder={currentUser.email}
              required
              onChange={handleChange}
              value={values.email || ''}
              pattern="^[A-Za-z0-9_.+\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-.]+$"
            />
          </label>
        </div>
        <div className='profile__links'>
          <button className={`profile__link profile__link-redact ${(!isValid || !isDisabled) && errors ? 'profile__link-redact_disabled' : ''}`}
          disabled={!isValid || !isDisabled} type='submit'> 
            Редактировать
          </button>
          <Link to='/' className='profile__link' onClick={signOut}>
            Выйти из аккаунта
          </Link>
        </div>
      </form>
      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        title={infoTooltipText}
        onClose={closePopup}
        image={okImage}
      />
    </>
  );
}

export default Profile;