import React, { useRef } from 'react';

import bemCssModule from 'bem-css-modules';
import settingsPanelStyle from './settingsPanel.module.scss';
const style = bemCssModule(settingsPanelStyle);

const SettingsPanel = ({ filterMessages, setFilterMessages }) => {

  const filterByNameRef = useRef();
  const filterByMessagesRef = useRef();
  const filterByDateFromRef = useRef();
  const filterByDateToRef = useRef();

  // const handelClickFindName = (e) => {
  //   e.preventDefault();
  //   if (filterByNameRef.current.value) {
  //     setFilterMessages({ filterBy: 'filterByName', filterData: filterByNameRef.current.value })
  //   }
  // };
  // const handelClickFindMessages = (e) => {
  //   e.preventDefault();
  //   if (filterByMessagesRef.current.value) {
  //     setFilterMessages({ filterBy: 'filterByText', filterData: filterByMessagesRef.current.value })
  //   }
  // };
  const handelClickFindDate = (e) => {
    e.preventDefault();
    const filterData = { chatUser: "", message: "", date: { from: new Date('2023, 01, 01').toISOString(), to: new Date() } };
    if (filterByDateFromRef.current.value || filterByDateToRef.current.value || filterByNameRef.current.value || filterByMessagesRef.current.value) {
      filterData.date = {
        from: new Date(filterByDateFromRef.current.value + ' 00:00:00').toISOString(),
        to: new Date(filterByDateToRef.current.value + ' 23:59:59').toISOString(),
      };
      filterData.chatUser = filterByNameRef.current.value;
      filterData.message = filterByMessagesRef.current.value;
      setFilterMessages(filterData);
    }
    // else if (filterByDateFromRef.current.value) {
    //   const date = {
    //     from: new Date(filterByDateFromRef.current.value + ' 00:00:00').toISOString(),
    //     to: '',
    //   }
    //   setFilterMessages({ filterBy: 'filterByDate', filterData: date })
    // }
    // else if (filterByDateToRef.current.value) {
    //   const date = {
    //     from: '',
    //     to: new Date(filterByDateToRef.current.value + ' 23:59:59').toISOString()
    //   }
    //   setFilterMessages({ filterBy: 'filterByDate', filterData: date })
    // }
  };

  const handelClickReset = (e) => {
    e.preventDefault();
    if (filterMessages.filterData) {
      filterByNameRef.current.value = '';
      filterByMessagesRef.current.value = '';
      filterByDateFromRef.current.value = '';
      filterByDateToRef.current.value = '';
      setFilterMessages({ filterData: { name: '', message: '', date: { from: '', to: '' } } })
    }
  };

  return (
    <aside className={style()}>
      <form className={style('form')} >
        <div>
          <label htmlFor="findByName" className={style('form-label')}>find by user name:</label>
          <input type="text"
            id="findByName"
            className={style('form-input')}
            ref={filterByNameRef}
          />
          {/* <button onClick={handelClickFindName} className={style('form-button')}>search</button> */}
        </div>
        <div>
          <label htmlFor="findByText" className={style('form-label')}>find by message text:</label>
          <input type="text"
            id="findByText"
            className={style('form-input')}
            ref={filterByMessagesRef}
          />
          {/* <button onClick={handelClickFindMessages} className={style('form-button')}>search</button> */}
        </div>
        <label className={style('form-label')} >find by date:</label>
        <div >
          <label htmlFor="findByDateFrom">From:</label>
          <input id="findByDateFrom"
            className={style('form-input')}
            type="date"
            ref={filterByDateFromRef}
          />
          <label htmlFor="findByDateTo">To:</label>
          <input id="findByDateTo"
            className={style('form-input')}
            type="date"
            ref={filterByDateToRef}
          />
        </div>
        <button onClick={handelClickFindDate} className={style('form-button')}>Search</button>
        <button onClick={handelClickReset} className={style('form-button--reset')}>Reset</button>
      </form>
    </aside>
  );
}

export default SettingsPanel;