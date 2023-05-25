import React, { useState } from 'react';
import Picker from 'emoji-picker-react';

import bemCssModule from 'bem-css-modules';
import emojiStyle from './EmojiStyle.module.scss';
const style = bemCssModule(emojiStyle);

const Emoji = ({ setMessage }) => {

  const [isOpen, setIsOpen] = useState(false);

  const handelClick = (e) => {
    e.preventDefault();
    setIsOpen(prev => !prev);
  }

  const onEmojiClick = (emojiObject, event) => {
    emojiObject.emoji ? setMessage(prev => prev + emojiObject.emoji) : null
  };
  const emojiShow = isOpen ? <Picker onEmojiClick={onEmojiClick} /> : null
  const iconToggle = isOpen ? '❌' : '🙂';

  return (
    <>
      <button onClick={handelClick} className={style()}>
        <span role="img" className={style("icon")}>{iconToggle}</span>
      </button>
      {emojiShow}
    </>
  );
}

export default Emoji;