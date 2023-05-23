import React, { useContext, useState } from 'react';
import bemCssModule from 'bem-css-modules';

import socket from '../../helpers/socketConfig';
import { StoreContext } from '../../store/chatContex';

import { default as LoginUserStyle } from './LoginUserStyle.module.scss'

const style = bemCssModule(LoginUserStyle);

const LoginUser = ({ setCurrentUser }) => {
  const [inputValue, setInputValue] = useState('')
  const [validationMsg, setValidationMsg] = useState('');

  const { chatUsers } = useContext(StoreContext);

  const handelSubmit = (e) => {
    e.preventDefault();
    const randomColor = String(`rgb(${Math.floor(Math.random() * 230)}, ${Math.floor(Math.random() * 230)}, ${Math.floor(Math.random() * 230)})`)
    let tempData = chatUsers.map(user => user.name);
    if (!inputValue.trim()) {
      setValidationMsg(' Wpisz nazwe urzytkownika');
      setInputValue('')
    } else if (tempData.includes(inputValue)) {
      setValidationMsg('Nazwa urzytkownika zajęta wpisz nową');
      setInputValue('');
    } else if (inputValue.trim()) {
      const obj = {
        id: socket.id,
        name: inputValue.trim(),
        color: randomColor
      }
      socket.emit('new user', obj)
      setCurrentUser({
        name: inputValue.trim(),
        color: randomColor
      });
    }
  }

  const ValidationError = validationMsg ?
    <p className={style('error')}>{validationMsg}</p>
    : null;

  return (
    <section className={style()}>
      <form onSubmit={handelSubmit} className={style('form')}>
        <label htmlFor="loginuser" className={style('label')}>Wpisz nazwe urzytkownika</label>
        <input type="text" name="loginuser" id="loginuser"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue} className={style('input')} />
        <button type="submit" className={style('button')}>Zaloguj</button>
        {ValidationError}
      </form>
    </section>
  );
}

export default LoginUser;