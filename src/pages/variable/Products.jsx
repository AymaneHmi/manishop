import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"
import ProductsCom from "../../components/ProductsCom"
import Container from "../../components/ui/Container"
import { Search } from "lucide-react"
import PageHeading from "../../components/ui/PageHeading"
import Input from "../../components/ui/Input"
import getProducts from "../../actions/getProducts"

export default function Products () {

    const products = getProducts();

    const [searchValue , setSearchValue] = useState('')
    const [searchedProducts , setSearchedProducts] = useState(null)
    const [categoriesProducts , setCategoriesProducts] = useState(null)

    const {category} = useParams() 
    
    useEffect(() => {
        if(category === 'products') {
            setCategoriesProducts(products)
        } else {
            setCategoriesProducts(products?.filter(product => {
                const products = product.category === category;
                if(products){
                    return products;
                } else {
                    return null;
                }
            }))
        }
    },[category , products])
        
    const handleSearch = (e) => {
        setSearchValue(e.target.value)
        const filteredProducts = categoriesProducts?.filter( product => {
            return Object.values(product).some(val => {
              if (typeof val === "string") {
                return val.toLowerCase().includes(searchValue.toLowerCase());
              }
              if (Array.isArray(val)) {
                return val.some(obj => Object.values(obj).some(str => str.toLowerCase().includes(searchValue.toLowerCase())));
              }
              return false;
            });
        })
        setSearchedProducts(filteredProducts)
    }
    return (
        <Container>
            <PageHeading
                title={`Products ${category !== 'products' ? '/ ' + category : ''}`}
                subtitle="Discover all products."
            />
            <section className="flex flex-col items-center">
                <div className="w-full flex flex-row justify-center">
                    <Input 
                        onChange={handleSearch}
                        value={searchValue}
                        placeholder={"Search Products .."}
                        type={"text"}
                        className="w-3/5 border-primary rounded-none rounded-l-lg"
                    />
                    <span className="bg-primary p-2.5 text-white rounded-r-lg">
                        <Search />
                    </span>
                </div>
                {searchValue.length > 0 ? <p className="font-bold my-2">"{searchValue}"</p> : null}
                <div className="w-full my-4">
                    <ProductsCom products={searchValue.length > 0 ? searchedProducts : categoriesProducts} />
                </div>
            </section>
        </Container>
    )
}