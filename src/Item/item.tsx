import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Types
import { CartItemType } from '../App';

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

//ts react component with props
const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Card>
    <img src={item.image} alt={item.title} />
    <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
    </Card>
);

export default Item;