import axios from "axios";
import { useParams } from "react-router-dom";
import ProductsCom from "./products-component";
import { useQuery } from "react-query";

const api = import.meta.env.VITE_API;

export default function RelatedProducts() {

    const {productSlug} = useParams();

    const fetchRelatedProducts = async (productSlug) => {
        const res = await axios.get(api + '/products/product?slug=' + productSlug);
        return res.data;
    }

    const {data:relatedProducts, isLoading, error} = useQuery({
        queryKey: ['relatedProducts', productSlug],
        queryFn: () => fetchRelatedProducts(productSlug),
        initialData: null,
    })

    if(error || relatedProducts === null) {
        return null;
    }
    
    if(isLoading) {
        return <ProductsCom isLoading={true} />
    }

    return (
        <section>
            <h2 className="my-2 text-3xl font-bold">
            Related products
            </h2>
            <section className="my-4">
                <ProductsCom products={relatedProducts} />
            </section>
        </section>
    )
}