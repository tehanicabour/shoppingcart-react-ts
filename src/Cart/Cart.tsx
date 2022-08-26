import CartItem from "../CartItem/CartItem";
// Types
import { CartItemType } from "../App";
import Container from 'react-bootstrap/Container';

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart}) => {
    return (
        <Container>
            <h2>Your Shopping Cart</h2>
            {cartItems.length === 0 ? <p>Your cart is empty!</p> : null}
            {cartItems.map(item => (
                <CartItem
                    key={item.id}
                    item={item}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                />
            ))}
        </Container>
    );
};

export default Cart;
