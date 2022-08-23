import React from 'react';
import PropTypes from 'prop-types';

export default function CreateSelectTag(props) {
  const { name, testId, optionsArray,
    // valueName,
    onChangeFunction } = props;

  return (
    <label htmlFor={ name }>
      {name}
      <select
        data-testid={ testId }
        id={ name }
        name={ name }
        onChange={ onChangeFunction }
      >
        {optionsArray.map((item) => (
          <option key={ item } value={ item }>{item}</option>
        ))}
      </select>
    </label>
  );
}

CreateSelectTag.propTypes = {
  name: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  // valueName: PropTypes.string.isRequired,
  optionsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeFunction: PropTypes.func.isRequired,
};
