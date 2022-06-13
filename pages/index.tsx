import type { NextPage } from 'next'
import { FormEvent, useCallback, useState } from 'react'
import { SearchResults } from '../components/SearchResults'

type ResultsProps = {
  totalPrice:number;
  data:any[];
}

const Home: NextPage = () => {
  const [search,setSearch] =useState('')
  const [results,setResults] =useState<ResultsProps>({
    totalPrice:0, data:[]
  })


  async function handleSearch(event: FormEvent){
    event.preventDefault();

    if(!search.trim()){
      return ;
    }

    const formatter =new Intl.NumberFormat('pt-BR',{
      style:'currency',
      currency:'BRL'
    })
  

    const response = await  fetch(`http://localhost:3333/products?q=${search}`)

    const data = await response.json();

    const products = data.map((product: { id: any; title: any; price: number | bigint; }) =>{
      return{
        id:product.id,
        title:product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      }
    })

    
    const totalPrice = data.reduce((total:number,product:any)=>{
      return  total + product.price;
    },0)

    setResults({totalPrice,data:products})
  }

  const  addToWishlist = useCallback(async(id:number)=>{
    console.log(id)
  },[])
 
  return (


    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input type="text" 
                value ={search}  
                onChange={e => setSearch(e.target.value)}
        />
        <button type ="submit">Buscar</button>
      </form>
      <SearchResults
        results={results.data}
        totalPrice = {results.totalPrice}
        onAddToWishlist ={addToWishlist} />
    </div>
  )
}

export default Home

// Fluxo de renderização do React js
// 1. Criar uma nova versão do componente
// 2. Comparar com a versão anterior
// 3. Se houverem alterações, vai atualizar o que alterou