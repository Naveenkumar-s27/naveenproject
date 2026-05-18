import React, { useState } from 'react';
import './Filter.css';

const FilterSidebar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState(1000);
  const [rating, setRating] = useState(0);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    const updatedCategories = checked
      ? [...categories, value]
      : categories.filter((c) => c !== value);
    setCategories(updatedCategories);
    onFilterChange({ categories: updatedCategories, price, rating });
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);
    setPrice(newPrice);
    onFilterChange({ categories, price: newPrice, rating });
  };

  const handleRatingChange = (e) => {
    const newRating = parseInt(e.target.value);
    setRating(newRating);
    onFilterChange({ categories, price, rating: newRating });
  };

  const clearFilters = () => {
    setCategories([]);
    setPrice(1000);
    setRating(0);
    onFilterChange({ categories: [], price: 1000, rating: 0 });
  };

  return (
    <div className="sidebar">
      <h2>Filter Products</h2>

      <div className="filter-section">
        <h4>Category</h4>
        {['Electronics', 'Clothing', 'Books'].map((cat) => (
          <label key={cat}>
            <input
              type="checkbox"
              value={cat}
              checked={categories.includes(cat)}
              onChange={handleCategoryChange}
            />
            {cat}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Price Range</h4>
        <input
          type="range"
          min="0"
          max="1000"
          step="50"
          value={price}
          onChange={handlePriceChange}
        />
        <p>Up to ₹{price}</p>
      </div>

      <div className="filter-section">
        <h4>Rating</h4>
        {[5, 4, 3].map((star) => (
          <label key={star} className="rating-radio">
            <input
              type="radio"
              name="rating"
              value={star}
              checked={rating === star}
              onChange={handleRatingChange}
            />
            {'★'.repeat(star)}{'☆'.repeat(5 - star)}
          </label>
        ))}
      </div>

      <button className="clear-btn" onClick={clearFilters}>
        Clear All Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
