import React from 'react';

const LeftPanel = ({ selectedCategory, setSelectedCategory, styles }) => {
  const categories = ['Theme', 'Activities', 'Category 3'];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles.leftPanel}>
      {categories.map((category) => (
        <div className={`${styles.category} ${selectedCategory === category ? styles.activeCategory : ''}`} key={category} onClick={() => handleCategoryClick(category)}>
          {category}
        </div>
      ))}
    </div>
  );
};

export default LeftPanel;