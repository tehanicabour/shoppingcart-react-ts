import { useState , Component} from 'react';
import { useQuery } from 'react-query';
//Components
import Item from './Item/item';
import Cart from './Cart/Cart';
import Container from 'react-bootstrap/Container';
import { Card, Nav } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { FaShoppingCart } from "react-icons/fa";
import { Badge } from 'react-bootstrap';
import { Prev } from 'react-bootstrap/esm/PageItem';

//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  quantity: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartOpen,cartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products', 
    getProducts);
  console.log(data);

  const getTotalItems = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.quantity, 0);

  const handleAddtoCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      // 1. Is the item already added in the cart?
      const isInCart = prev.find(item => item.id === clickedItem.id)

      if (isInCart) {
        return prev.map(item => 
          item.id === clickedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      //First time the item is added
      return [...prev, { ...clickedItem, quantity: 1}];
    })
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => {
      return (prev.map(item => 
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )).filter(item => item.quantity > 0);
    })
  };
    
  

  //For cart toggle
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (isLoading) 
  return (
    <Spinner animation="border" role="status">
    <span className="sr-only">Loading...</span>
  </Spinner>
  );

  if (error) return (<div>Sorry! Something went wrong. Please try again.</div>);


  return (
    <Container>
      <>
    <Button variant="primary" onClick={handleShow}>
    <FaShoppingCart /> <Badge>{getTotalItems(cartItems)}</Badge>
    </Button>

    <Offcanvas show={show} placement={'end'} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Cart 
          cartItems={cartItems}
          addToCart={handleAddtoCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Offcanvas.Body>
    </Offcanvas>
  </>
  


      <Row>
        {data?.map(item => (
          <Card key={item.id}>
            <Item item={item} handleAddToCart={handleAddtoCart} />
          </Card>
        ))}
      </Row>
      </Container>
  );
};
export default App;




