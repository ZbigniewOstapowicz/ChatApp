import React, { useState } from 'react';
import bemCssModule from 'bem-css-modules';

import StoreProvider from './store/chatContex';

import { default as AppStyle } from './App.module.scss';
const style = bemCssModule(AppStyle);

import ChatUsersList from './components/chatUsersList/ChatUsersList';
import MeesagesList from './components/Meesage/MessagesList'
import LoginUser from './components/LoginUser/LoginUser'

const App = () => {
    const [currentUser, setCurrentUser] = useState('');

    return (
        <StoreProvider>
            {currentUser ?
                <div className={style()}>
                    <ChatUsersList currentUser={currentUser} />
                    <MeesagesList currentUser={currentUser} />
                </div>
                : <LoginUser setCurrentUser={setCurrentUser} />}
        </StoreProvider>
    );
}

export default App;