export interface AddProductToWishListProps {
  onAddProductToWishList:() => void;
  onRequestClose: () => void;
}

export function AddProductToWishList({
  onAddProductToWishList,
  onRequestClose
}:AddProductToWishListProps){
  return(
  <span>
    Deseja adicionar aos favoritos?
    <button onClick={onAddProductToWishList}>Sim</button>
    <button onClick={onRequestClose}>Não</button>

  </span>    
  )
}