import React from 'react'
import { generateBlockClass } from '@vtex/css-handles';
import styles from './styles.css';

const ButtonGroup = ({ blockClass }: { blockClass: string }) => {

    const buttonContinueShop = generateBlockClass(styles.buttonContinueShop, blockClass),
        textShop = generateBlockClass(styles.textShop, blockClass),
        containerPhone = generateBlockClass(styles.containerPhone, blockClass)

    return (
        <>
            <div className={containerPhone}>
                <a href='/hombres'>
                    <button className={buttonContinueShop}>Continúa comprando</button>
                </a>
                <a className={textShop} href='/checkout/#/cart'>Ver bolsa de compra</a>
            </div>
        </>
    )
}

export default ButtonGroup
