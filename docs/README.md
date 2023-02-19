# ADD TO CART INFO


<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

Modal que se activará cada que el cliente agregue un producto a la bolsa, observará la información del contenido de su carrito, tendrá opción para continuar comprando o ver la bolsa de compras

![image](https://user-images.githubusercontent.com/83648336/219954235-e0d539e0-8b40-4682-98b9-cc7470783699.png)

## Configuración

1. Usar el template [vtex-app](https://github.com/vtex-apps/react-app-template)
2. Modificar el `manifest.json`
     ```json 
        {
          "vendor": "itgloberspartnercl",
          "name": "add-to-cart-info",
          "version": "0.0.1",
          "title": "Add to cart info",
          "description": "Componente que mostrará información al momento de agregar un producto al carrito de compras",
        }
     ``` 
      **vendor:** nombre del cliente o información suministrada por él

      **name:** nombre del componente

      **version:** versión del componente

      **title:** titulo asigando al componente

      **description:** breve descripción del componente


   Agregar en la sección `builders` dentro del `manifest.json` un `store`

    ```json   
        "store" : "0.x"
    ```
   En `dependencies` se van a agregar las siguientes dependencias necesarias para el funcionamiento del **componente**

    ```json   
        "dependencies": {
          "vtex.checkout-resources": "0.x",
          "vtex.order-manager": "0.x",
          "vtex.product-context": "0.x"
        }
    ```  
3. En el template se tienen dos `package.json` en ambos se debe modificar la `version` y el `name` 
   ```json 
        "version": "0.0.1",
        "name": "add-to-cart-info",
   ```  
4. Agregar a la carpeta raíz una carpeta llamada `store`, dentro crear un file llamado `interfaces.json`, en este file se tendrá la siguiente configuración:
    ```json 
        {
          "add-to-cart-info": {
              "component": "AddToCartInfo",
              "render": "client"
          }
        }
    ```
      Se especifica el nombre del componente con el cual será llamado en el `store-theme` de la tienda que se esta realizando, dentro se encuentra el `component` (se debe poner el nombre del componente React a realizar) y por ultimo el `render` donde se especifica que su renderización será solo en la parte del *cliente* 

5. Finalizado los puntos anteriores, se procede a ingresar a la carpeta `react` en la cual se realizan las siguientes configuraciones: 
    
    5.1. Ejecutar el comando `yarn install` para preparar las dependencias
    
    5.2. Crear el functional component `AddToCartInfo.tsx` con la siguiente configuración 
    
    ```typescript
          import AddToCartInfo from './components/AddToCartInfo';

          export default AddToCartInfo
    ```   
    5.3. Crear una carpeta llamada `components`, dentro se tiene el functional component `AddToCartInfo` con la configuración necesaria para el funcionamiento del componente, se tienen las importaciones empleadas y el desarrollo del componente
    ```typescript
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
              container__text = generateBlockClass(styles.container__text, blockClass),
              container__text2 = generateBlockClass(styles.container__text2, blockClass)

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
                <div className={container__text2}>
                  <p><b>Productos elegidos:</b> {items.length}</p>
                  <p><b>Total: $ {totalizers[0]?.value / 100}</b></p>
                  <ButtonGroup blockClass={blockClass} />
                </div>
              </div>
            )
          }

          export default AddToCartInfo
    ```
    
    Se encuentra en la misma carpeta `components` otro functional componente llamado `ButtonGroup` con la siguiente configuración
    ```typescript
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
    ```

6. Linkear el componente custom al `store-theme` de la tienda base

    6.1. Iniciar sesión 
    ```console
       vtex login <vendor>
    ```

    6.2. Elegir el `workspace` en el cual se esta trabajando
    ```console
       vtex use <nombre_worksapce>
    ```

    6.3. Linkear el componente
    ```console
       vtex link
    ```

    6.4. Verificar que el componente quede linkeado, para eso se emplea el siguiente comando

     ```console
        vtex ls
     ```

    En consola debe verse las aplicaciones linkeadas al proyecto, verificando de esta forma que el componente quedo listo para emplearse:

    ```console
        Linked Apps in <vendor> at workspace <nombre_store_theme>
        itgloberspartnercl.add-to-cart-info             0.0.1
     ```
      
7. Hacer el llamado del componente desde el `store theme`


## Personalización
      

Para personalizar el componente con CSS, siga las instrucciones que se encuentran en [Using CSS Handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization).

Las clases empleadas en el componente son:

| CSS Handles |
| ----------- | 
| `buttonContinueShop` | 
| `quick__container` | 
| `container` | 
| `container__img` | 
| `container__item` | 
| `container__text` | 
| `container__text2` | 
| `containerPhone` | 
| `textShop` | 

<!-- DOCS-IGNORE:start -->

## Colaboradores ✨

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Mariana Orrego Franco

<!-- DOCS-IGNORE:end -->
