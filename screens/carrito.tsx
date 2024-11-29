import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

// Tipos de las props del componente
interface CartItem {
  Nombre: string;
  Precio: string;
  Imagen?: string; // Opcional
  Descripcion?: string; // Opcional
  quantity?: number; // Opcional
}

interface ProductDetail {
  Nombre: string;
  Precio: string;
  Imagen?: string;
  Descripcion?: string;
}

interface CartProps {
  cartItems: CartItem[];
  onUpdateCartItem: (updatedCart: CartItem[]) => void;
  onRemoveFromCart: (index: number) => void;
}

const Cart: React.FC<CartProps> = ({ cartItems, onUpdateCartItem, onRemoveFromCart }) => {
  const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/productos');
        const data = await response.json();
        if (Array.isArray(data)) {
          setProductDetails(data);
        } else {
          console.error('La API no devolvió un array válido:', data);
          setProductDetails([]);
        }
      } catch (error) {
        console.error('Error al obtener los productos:', error);
        setProductDetails([]);
      }
    };

    fetchProductDetails();
  }, []);

  const cartWithDetails = cartItems.map((item) => {
    const product = productDetails.find((prod) => prod.Nombre === item.Nombre);
    return product ? { ...item, ...product } : item;
  });

  const total = cartWithDetails.reduce((sum, item) => {
    const precio = parseFloat(item.Precio.replace(/[^0-9.-]+/g, '')) || 0;
    return sum + precio * (item.quantity || 1);
  }, 0);

  const handleQuantityChange = (index: number, delta: number) => {
    if (index >= 0 && index < cartItems.length) {
      const updatedItems = [...cartItems];
      const currentQuantity = updatedItems[index].quantity || 1;
      const newQuantity = currentQuantity + delta;

      if (newQuantity > 0) {
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: newQuantity,
        };
        onUpdateCartItem(updatedItems);
      }
    } else {
      console.error('Índice inválido al intentar actualizar la cantidad:', index);
    }
  };

  const handlePurchase = async () => {
    if (cartItems.length === 0) {
      Alert.alert('El carrito está vacío. Agrega productos antes de proceder al pago.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/paypal/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();
      if (response.ok) {
        //window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${data.id}`;
        //<BrowserRouter basename="`https://www.sandbox.paypal.com/checkoutnow?token=${data.id}`"/>;
      } else {
        console.error('Error al iniciar el proceso de compra:', data);
        Alert.alert('Hubo un error al procesar tu compra. Intenta nuevamente.');
      }
    } catch (error) {
      console.error('Error al conectar con la API de PayPal:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {cartWithDetails.length > 0 ? (
        <>
          <ul className="cart-items">
            {cartWithDetails.map((item, index) => (
              <li key={index} className="cart-item">
                <img src={item.Imagen} alt={item.Nombre} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.Nombre}</h3>
                  <p>{item.Descripcion}</p>
                  <p>
                    <strong>Precio unitario:</strong> {item.Precio}
                  </p>
                  <div>
                    <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => handleQuantityChange(index, 1)}>+</button>
                  </div>
                  <button onClick={() => onRemoveFromCart(index)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="purchase-button" onClick={handlePurchase}>
              Comprar
            </button>
          </div>
        </>
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
    </div>
  );
};

export default Cart;
