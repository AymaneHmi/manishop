import { useEffect, useState } from "react";
import { useFavorites } from "../../hooks/use-favorites";
import Container from "../../components/ui/Container";
import PageHeading from "../../components/ui/PageHeading";
import ProductsCom from "../../components/ProductsCom";
import getProducts from "../../actions/getProducts";

export default function Favorites () {

    const products = getProducts();
    const {favorites} = useFavorites();
    const [favoritesProducts, setFavoritesProducts] = useState(null);
    
    useEffect(() => {
        setFavoritesProducts(products?.filter(product => favorites?.some((favorite) => favorite.product_id === product.id)
        ))
    },[favorites, products])

    return (
        <Container>
            <PageHeading 
                title="Favorites"
                subtitle="See your favorites products."
            />
            <ProductsCom
                products={favoritesProducts}
            />
        </Container>
    )
}