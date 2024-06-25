import { useEffect, useState } from "react";
import Container from "../../components/ui/container";
import PageHeading from "../../components/ui/page-heading";
import ProductsCom from "../../components/products-component";
import useFavorite from "../../hooks/use-favorite";
import useData from "../../hooks/use-data";

export default function Favorites () {

    const {products, isLoadingProducts, errorProducts} = useData();

    const {favorites} = useFavorite();
    const [favoritesProducts, setFavoritesProducts] = useState([]);
    
    useEffect(() => {
        setFavoritesProducts(products?.filter(product => favorites?.some((favorite) => favorite.id === product.id)
        ))
    },[favorites, products])

    return (
        <Container>
            <PageHeading 
                title="Favorites"
                subtitle="See your favorites products."
            />
            <div className="my-4">
                <ProductsCom
                    products={favoritesProducts}
                    isLoading={isLoadingProducts}
                    error={errorProducts}
                />
            </div>
        </Container>
    )
}