import { Button, Container } from "react-bootstrap";
// Types
import { CartItemType } from "../App";
import Item from "../Item/item";


type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const CartItem: React.FC<Props> = ( {item, addToCart, removeFromCart } ) => (
    <Container>
        <div>
            <h3>{item.title}</h3>
            <div className="information">
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button onClick={() => removeFromCart(item.id)}>
                    -
                </Button>
                <p>{item.quantity}</p>
                <Button onClick={() => addToCart(item)}>
                    +
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title} />
    </Container>
);

export default CartItem;