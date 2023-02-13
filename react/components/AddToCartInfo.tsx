import React from 'react';
import { useProduct } from 'vtex.product-context';
import { useOrderForm } from 'vtex.order-manager/OrderForm';
import ButtonGroup from './ButtonGroup';
import { generateBlockClass } from '@vtex/css-handles';
import styles from './styles.css';

const AddToCartInfo = ({ blockClass }: { blockClass: string }) => {

  const container = generateBlockClass(styles.container, blockClass),
    container__item = generateBlockClass(styles.container__item, blockClass),
    container__img = generateBlockClass(styles.container__img, blockClass),
    container__text = generateBlockClass(styles.container__text, blockClass)

  const productInfo = useProduct();
  const { orderForm: { items, totalizers } } = useOrderForm();

  console.log("Info del producto", productInfo)

  return (
    <div className={container}>
      {
        items.map((item: any, index: number) => {
          return (
            <div key={index} className={container__item}>
              <div className={container__img}>
                <img src={item.imageUrls.at1x} />
              </div>
              <div className={container__text}>
                <p><b>{item.name}</b></p>
                <p><b>Id:</b> {item.id}</p>
                <p><b>Cantidad:</b> {item.quantity}</p>
                <p>$ {item.price / 100}</p>
              </div>
            </div>
          )
        })
      }
      <div>
        <p>Productos en la bolsa: {items.length}</p>
        <p>Total: $ {totalizers[0]?.value / 100}</p>
      </div>
      <ButtonGroup />
    </div>
  )
}

export default AddToCartInfo
