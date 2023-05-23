import React, { useState } from 'react';

import socket from '../../../helpers/socketConfig';
import bemCssModule from 'bem-css-modules';
import settingsPanelStyle from './settingsPanel.module.scss';
const style = bemCssModule(settingsPanelStyle);

const SettingsPanel = ({isFilter, setIsFilter}) => {
  const [filterByName, setFilterByName] = useState('');
  const [filterByMeesages, setFilterByMeesages] = useState('');
  const [filterByDateFrom, setFilterByDateFrom] = useState('');
  const [filterByDateTo, setFilterByDateTo] = useState('');

  const handelClickFindName = (e) => {
    e.preventDefault();
    if (filterByName) {
      socket.emit('filter meesages by name', filterByName);
      setIsFilter(true);
    }
  };
  const handelClickFindMeesages = (e) => {
    e.preventDefault();
    if (filterByMeesages) {
      socket.emit('filter meesages by text', filterByMeesages);
      setIsFilter(true);
    }
  };
  const handelClickFindDate = (e) => {
    e.preventDefault();
    if (filterByDateFrom && filterByDateTo) {
      const date = {
        from: new Date(filterByDateFrom + ' 00:00:00').toISOString(),
        to: new Date(filterByDateTo + ' 23:59:59').toISOString(),
      };
      socket.emit('filter meesages by date', date);
      setIsFilter(true);
    }
    else if (filterByDateFrom) {
      const date = {
        from: new Date(filterByDateFrom + ' 00:00:00').toISOString(),
        to: '',
      }
      socket.emit('f