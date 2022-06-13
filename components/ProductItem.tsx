import{ memo, useState} from  'react'
import { AddProductToWishListProps } from './AddProductToWishList';
import dynamic from 'next/dynamic'
import lodash from 'lodash'

const AddProductToWishList = dynamic<AddProductToWishListProps>(()=>{
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
},{
  loading:()=><span>Carregando ....</span> //lazy loading
})

interface ProductItemProps{
  product:{
    id: number;
    price:number;
    title: string;
  }
  onAddToWishlist: (id:number) =>void

}

 function ProductItemComponent({product,onAddToWishlist}:ProductItemProps){
  const [isAddingToWishlist,setIsAddingToWishlist]=useState(false)

  return (
    <div>
      {product.title} - <strong>{product.price}</strong>
      <button onClick={()=>setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

      {isAddingToWishlist &&(
        <AddProductToWishList 
        onAddProductToWishList={()=>onAddToWishlist(product.id)}
        onRequestClose={()=>setIsAddingToWishlist(false)}
      />
      )}
      
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent,(prevProps,nextProps)=>{
  // return Object.is(prevProps.product,nextProps.product)
  return lodash.isEqual(prevProps.product,nextProps.product)

})