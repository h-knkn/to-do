import React from 'react';
import classNames from 'classnames';

const Filter = (props) => {

    const handleClick = (key, e) => {
        console.log(key);
        e.preventDefault();
        props.onChange(key);
    };

  return (
    <div className="panel-tabs">
      <a id="a-link"
        onClick={handleClick.bind(null, 'ALL')}
        className={classNames({ 'is-active': props.value === 'ALL' })}
      >All</a>
      <span className="margin"></span>
      <a className="a-link"
        onClick={handleClick.bind(null, 'TODO')}
        className={classNames({ 'is-active': props.value === 'TODO' })}
      >ToDo</a>
      <span className="margin"></span>
      <a className="a-link"
        onClick={handleClick.bind(null, 'DONE')}
        className={classNames({ 'is-active': props.value === 'DONE' })}
      >Done</a>
    </div>

  );
}

export default Filter;
