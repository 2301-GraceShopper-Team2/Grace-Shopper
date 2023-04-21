import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductAsync } from '../allProducts/allProductsSlice.js';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [description, setDescription] = useState('');
  const [SKU, setSKU] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (name && description && price && SKU) {
      const newProduct = {
        name,
        description,
        price: parseFloat(price),
        SKU,
      };

      dispatch(addProductAsync(newProduct));
      navigate('/products');
    } else {
      alert('Please complete all required fields before submitting');
    }
  };

  return (
    <div>
      <form id="createProduct" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          onChange={(evt) => {
            setName(evt.target.value);
          }}
        ></input>

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          type="text"
          onChange={(evt) => {
            setDescription(evt.target.value);
          }}
        ></textarea>

        <label>Price</label>
        {/* need input validation on price to make sure it's only 2 decimal places */}
        <input
          name="price"
          type="text"
          onChange={(evt) => {
            setPrice(evt.target.value);
          }}
        ></input>

        <label>SKU</label>
        <input
          name="SKU"
          type="text"
          onChange={(evt) => {
            setSKU(evt.target.value);
          }}
        ></input>

        <label>Image URL</label>
        <input
          name="imageURL"
          type="text"
          onChange={(evt) => {
            setImageURL(evt.target.value);
          }}
        ></input>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateProduct;
