import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddCarrinho extends Component {
  constructor() {
    super();

    this.state = {
      quantity: 1,
    };

    this.sendToCart = this.sendToCart.bind(this);
  }

  sendToCart() {
    const { manipulateState } = this.props;
    let arrProducts = [];
    const storageData = JSON.parse(localStorage.getItem('products'));
    const { title, price, id, imgPath, availableQuantity } = this.props;

    const { quantity } = this.state;
    const product = {
      title,
      id,
      price,
      quantity,
      imgPath,
      availableQuantity,
    };

    this.setState((oldState) => ({
      quantity: oldState.quantity + 1,
    }));

    if (storageData !== null) {
      const productAux = storageData.find((produto) => produto.title === product.title);
      const productIndex = storageData.indexOf(productAux);

      if (productAux !== undefined) {
        storageData[productIndex].quantity = product.quantity;
        arrProducts = arrProducts.concat(storageData);
      } else {
        arrProducts.push(product);
        arrProducts = arrProducts.concat(storageData);
      }
      const quantidadeTotal = parseInt(localStorage.getItem('quantidade'), 10) + 1;
      localStorage.setItem('quantidade', quantidadeTotal);
      manipulateState(quantidadeTotal);
      localStorage.setItem('products', JSON.stringify(arrProducts));
    } else {
      localStorage.setItem('products', JSON.stringify([product]));
      localStorage.setItem('quantidade', 1);
      manipulateState(1);
    }
  }

  render() {
    const { testId } = this.props;
    return (
      <div>
        <button
          data-testid={ testId }
          type="button"
          onClick={ this.sendToCart }
        >
          Adicionar ao Carrinho
        </button>
      </div>

    );
  }
}

export default AddCarrinho;

AddCarrinho.propTypes = {
  title: PropTypes.string.isRequired,
  imgPath: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  manipulateState: PropTypes.func.isRequired,
  availableQuantity: PropTypes.number.isRequired,
};
