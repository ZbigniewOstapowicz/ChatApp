import React, { useContext, useEffect } from 'react';
import bemCssModule from 'bem-css-modules';

import { StoreContext } from '../../store/chatContex';

import { default as chatUsersListStyle } from './chatUserList.module.scss'

const style = bemCssModule(chatUsersListStyle);

const ChatUsersList = ({currentUser}) => {

  const { chatUsers} = useContext(StoreContext);

  const ChatUser = chatUsers ? chatUsers.filter(user=>user.name!==currentUser).map(user =>
    <li key={user.id} className={style('l