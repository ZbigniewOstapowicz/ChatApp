import React, { useState } from 'react';

import SettingsPanel from './subComponents/SettingsPanel'

import bemCssModule from 'bem-css-modules';
import SettingsStyle from './SettingsStyle.module.scss';
const style = bemCssModule(SettingsStyle);

const Settings = ({filterMessages, setFilterMessages}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setIsFilter] = useState(false);


  const handelClick = (e) => {
    e.preventDefault();
    setIsOpen(prev => !prev);
  }

  const panelShow = isOpen ? <SettingsPanel isFilter={isFilter}
    filterMessages={filterMessages}
    setFilterMessages={setFilterMessages}
  /> : null
  const iconToggel = isOpen ? '❌' : '⚙️';

  return (
    <>
      <button onClick={handelClick} className={style()}>
        <span role="img" className={style("icon")}>{iconToggel}</span>
      </button>
      {panelShow}
    </>
  );
}

export default Settings;