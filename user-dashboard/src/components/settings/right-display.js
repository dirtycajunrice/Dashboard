// RightDisplay.js
import React from 'react';
import ThemeSettings from './theme';
import Activities from './activities';
import WaiverPreview from './waiver-preview';

const RightDisplay = ({ selectedCategory, styles, userLimit }) => {
  return (
    <div className={styles.rightDisplay}>
      {selectedCategory ? (
        <div>
          <h2>{selectedCategory} Settings</h2>
          {selectedCategory === 'Theme' && (
            <div style={{ marginTop:0, display:'flex', flexDirection:'row' }}>
              <div className={styles.fifty}>
                <ThemeSettings styles={styles} />
              </div>
              <div className={styles.fifty}>
                <WaiverPreview styles={styles} />
              </div>
            </div>
          )}
          {selectedCategory === 'Activities' && (
            <div style={{ marginTop:0, display:'flex', flexDirection:'row' }}>
              <div className={styles.fifty}>
                <Activities styles={styles} userLimit={userLimit} />
              </div>
              <div className={styles.fifty}>
                <WaiverPreview styles={styles} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Select a category from the left panel.</div>
      )}
    </div>
  );
};

export default RightDisplay;