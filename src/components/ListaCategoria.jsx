import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import { Loading } from './index';
import ProductCard from './ProductCard';

class ListaCategoria extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      categories: [],
      filteredCategories: [],
    };
    this.fetchCategories = this.fetchCategories.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.fetchCategories();
  }

  handleClick({ target: { id } }) {
    this.fetchCategory(id);
  }

  async fetchCategory(id) {
    const response = await api.getProductsFromCategoryAndQuery(id, '$QUERY');
    this.setState({
      filteredCategories: response.results,
      loading: false,
    });
  }

  async fetchCategories() {
    const apiResponse = await api.getCategories();
    this.setState({
      loading: false,
      categories: apiResponse,
    });
  }

  render() {
    const { loading, categories, filteredCategories } = this.state;
    const { manipulateState } = this.props;
    const loadingComponent = <Loading />;
    const categoryFiltered = (
      <div>
        {filteredCategories.map(({
          id,
          title,
          thumbnail,
          price,
          category_id: catId,
          available_quantity: availableQuantity,
          shipping: { free_shipping: freeShipping },
        }) => (
          <ProductCard
            freeShipping={ freeShipping }
            availableQuantity={ availableQuantity }
            id={ id }
            key={ id }
            title={ title }
            imgPath={ thumbnail }
            price={ price }
            category_id={ catId }
            manipulateState={ manipulateState }
          />
        ))}
      </div>);
    const categoryList = (
      <div>
        {categories.map(({ id, name }) => (
          <label key={ id } htmlFor={ id }>
            {name}
            <input
              id={ id }
              type="radio"
              data-testid="category"
              key={ id }
              onClick={ this.handleClick }
              value={ name }
              name="category-name"
            />
          </label>
        ))}
      </div>
    );
    return (
      <div>
        {loading ? loadingComponent : categoryList}
        { categoryFiltered }
      </div>
    );
  }
}

export default ListaCategoria;

ListaCategoria.propTypes = {
  manipulateState: PropTypes.func.isRequired,
};
