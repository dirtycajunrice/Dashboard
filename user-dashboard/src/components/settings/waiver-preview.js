import React from 'react';

const WaiverPreview = ({ content }) => {
  return (
    <div>
      <h3>Waiver Preview</h3>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default WaiverPreview;