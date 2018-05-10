import React from 'react';

import PropTypes from 'prop-types';

const OneColumnLayout = (props) => {
  const { children } = props;

  return (
    <div className="bx--grid">
      <div className="bx--row mt16">
        {children}
      </div>
    </div>
  );
};

OneColumnLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OneColumnLayout;
