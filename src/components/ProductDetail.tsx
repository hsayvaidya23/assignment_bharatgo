import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext, useRef } from "react";
import { ShoppingCartContext } from "../contexts"; 
import { CSSTransition } from 'react-transition-group';

function ProductDetail() {
  const context = useContext(ShoppingCartContext);
  const nodeRef = useRef(null);

  return (
    <CSSTransition
      in={context.isProductDetailOpen}
      timeout={400}
      classNames="fade"
      nodeRef={nodeRef}
      unmountOnExit
    >
      <aside
        ref={nodeRef}
        className="fixed right-0 top-[70px] w-[360px] h-[calc(100vh-68px)] bg-white border border-black rounded-lg"
      >
        <div className="flex justify-between items-center p-6">
          <h2 className="font-medium text-xl">Detail</h2>
          <XMarkIcon
            onClick={context.closeProductDetail}
            className="h-6 w-6 text-black cursor-pointer animate-pulse"
          />
        </div>
        <div className="flex flex-col items-center gap-4 p-4">
          <img
            className="w-4/5 h-48 object-cover rounded-lg"
            src={context.productToShow?.image?.[0]}
            alt={context.productToShow?.title}
          />
          <p className="flex flex-col items-center text-center">
            <span className="font-medium text-2xl mb-2">
              ${context.productToShow?.price}
            </span>
            <span className="font-medium text-md">
              {context.productToShow?.title}
            </span>
            <span className="font-light text-sm">
              {context.productToShow?.description}
            </span>
          </p>
        </div>
      </aside>
    </CSSTransition>
  );
}

export default ProductDetail;