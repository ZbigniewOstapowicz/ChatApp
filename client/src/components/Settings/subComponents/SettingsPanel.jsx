import React, { useState } from 'react';

import socket from '../../../helpers/socketConfig';
import bemCssModule from 'bem-css-modules';
import settingsPanelStyle from './settingsPanel.module.scss';
const style = bemCssModule(settingsPanelStyle);

const SettingsPanel = ({ filterMessages, setFilterMessages }) => {
  const [filterByName, setFilterByName] = useState('');
  const [filterByMeesages, setFilterByMeesages] = useState('');
  const [filterByDateFrom, setFilterByDateFrom] = useState('');
  const [filterByDateTo, setFilterByDateTo] = useState('');

  const handelClickFindName = (e) => {
    e.preventDefault();
    if (filterByName) {
      setFilterMessages({ filterBy: 'filterByName', filterData: filterByName })
    }
  };
  const handelClickFindMeesages = (e) => {
    e.preventDefault();
    if (filterByMeesages) {
      setFilterMessages({ filterBy: 'filterByText', filterData: filterByMeesages })
    }
  };
  const handelClickFindDate = (e) => {
    e.preventDefault();
    if (filterByDateFrom && filterByDateTo) {
      const date = {
        from: new Date(filterByDateFrom + ' 00:00:00').toISOString(),
        to: new Date(filterByDateTo + ' 23:59:59').toISOString(),
      };
      setFilterMessages({ filterBy: 'filterByDate', filterData: date })

    }
    else if (filterByDateFrom) {
      const date = {
        from: new Date(filterByDateFrom + ' 00:00:00').toISOString(),
        to: '',
      }
      setFilterMessages({ filterBy: 'filterByDate', filterData: date })
    }
    else if (filterByDateTo) {
      const date = {
        from: '',
        to: new Date(filterByDateTo + ' 23:59:59').toISOString()
      }
      setFilterMessages({ filterBy: 'filterByDate', filterData: date })
    }
  };

  const handelClickReset = (e) => {
    e.preventDefault();
    if (filterMessages.filterBy && filterMessages.filterData) {
      setFilterByName('');
      setFilterByMeesages('');
      setFilterByDateFrom('');
      setFilterByDateTo('');
      setFilterMessages({ filterBy: 'reset', filterData: null })
    }
  };

  return (
    <aside className={style()}>
      <form className={style('form')}>
        <div>
          <label htmlFor="findByName" className={style('form-label')}>find by user name:</label>
          <input type="text"
            id="findByName"
            className={style('form-input')}
            onChange={(e) => setFilterByName(e.target.value)}
            value={filterByName} />
          <button onClick={handelClickFindName} className={style('form-button')}>search</button>
        </div>
        <div>
          <label htmlFor="findByText" className={style('form-label')}>find by message text:</label>
          <input type="text"
            id="findByText"
            className={style('form-input')}
            onChange={(e) => setFilterByMeesages(e.target.value)}
            value={filterByMeesages}
          />
          <button onClick={handelClickFindMeesages} className={style('form-button')}>search</button>
        </div>
        <label className={style('form-label')} >find by date:</label>
        <div >
          <label htmlFor="findByDateFrom">From:</label>
          <input id="findByDateFrom"
            className={style('form-input')}
            type="date"
            onChange={(e) => setFilterByDateFrom(e.target.value)}
            value={filterByDateFrom}
          />
          <label htmlFor="findByDateTo">To:</label>
          <input id="findByDateTo"
            className={style('form-input')}
            type="date"
            onChange={(e) => setFilterByDateTo(e.target.value)}
            value={filterByDateTo}
          />
        </div>
        <button onClick={handelClickFindDate} className={style('form-button')}>Search</button>
        <button onClick={handelClickReset} className={style('form-button--reset')}>Reset</button>
      </form>
    </aside>
  );
}

export default SettingsPanel;