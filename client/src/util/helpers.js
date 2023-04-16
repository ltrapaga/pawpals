import { Popup } from 'semantic-ui-react';
import React from 'react';

function pupPopup({ content, children }) {
  return <Popup inverted content={content} trigger={children} />;
}

export default pupPopup;