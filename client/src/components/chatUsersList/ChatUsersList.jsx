import React, { useContext, useEffect } from 'react';
import bemCssModule from 'bem-css-modules';

import { StoreContext } from '../../store/chatContex';

import { default as chatUsersListStyle } from './chatUserList.module.scss'

const style = bemCssModule(chatUsersListStyle);

const ChatUsersList = ({ currentUser }) => {

  const { chatUsers } = useContext(StoreContext);

  const chatUserLi = (userName, BgNamecolor, BgIconColor) => (
    <li key={userName} className={style('list-user')}>
      <div className={style('list-user-icon')} style={{background: BgIconColor}}>{userName[0]}</div>
      <p className={style('list-user-name')} style={{ backgroundColor: BgNamecolor }}>{userName}</p>
    </li>
  );


  const chatUser = chatUsers ? chatUsers.filter(user => user.name !== currentUser.name).map(user =>
     chatUserLi(user.name, 'darkorange', user.color))
    : null;

  return (
    <section className={style()}>
      <ul className={style('list')}>
        {chatUserLi(currentUser.name, 'cornflowerblue', currentUser.color)}
        {chatUser}
      </ul>
    </section>
  );
}

export default ChatUsersList;