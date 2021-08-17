import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextInput = (props) => {
  return (
    <TextField
      fullWidth={true}
      margin={"dense"}
      label={props.label}
      multiline={props.multiline}
      rows={props.rows}
      value={props.value}
      type={props.type}
      onChange={props.onChange}
    />
  )
}

export default TextInput