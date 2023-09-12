import { useEffect, useState } from "react";
import ProductCom from "./ProductCom"
import EmptyState from "./ui/EmptyState";

export default function ProductsCom ({products}) {

    const [loading , setLoading] = useState(true)
    
    useEffect(() => {
        if(products) {
            setLoading(false)
        }
    },[products])

    let loadingArray = new Array(4).fill(null);

    if(loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {loadingArray.map((_,index) => (
                    <div key={index} className="space-y-4 rounded flex flex-col items-center">
                        <div className="animate-pulse bg-gradient-to-r from-gray-200 via-gray-700/50 via-0% to-gray-500 h-10 rounded-lg h-[55vh] rounded w-full"></div>
                        <div className="animate-pulse bg-gradient-to-r from-gray-200 via-gray-700/50 via-0% to-gray-500 h-10 rounded-lg h-4 rounded w-2/3"></div>
                        <div className="animate-pulse bg-gradient-to-r from-gray-200 via-gray-700/50 via-0% to-gray-500 h-10 rounded-lg h-4 rounded w-4/5"></div>
                        <div className="animate-pulse bg-gradient-to-r from-gray-200 via-gray-700/50 via-0% to-gray-500 h-10 rounded-lg h-5 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        )
    }

    if(!products && !loading) {
        return <EmptyState 
            title="No Product Found"
            subtitle="Looks like no product exist here."
        />
    }
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {products?.map(product => (
                    <ProductCom key={product.id} product={product} />
                ))}    
            </div>
        </>
    )
}