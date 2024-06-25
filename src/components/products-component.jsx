import ProductCom from "./product-component"
import EmptyState from "./ui/empty-state";

export default function ProductsCom ({products, isLoading, error}) {

    let loadingArray = new Array(4).fill(null);

    if(isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {loadingArray.map((_,index) => (
                    <div key={index} className="space-y-4 rounded flex flex-col items-center">
                        <div className="animate-pulse bg-gray-400 h-10 rounded-lg h-[30vh] lg:h-[45vh] rounded w-full"></div>
                        <div className="animate-pulse bg-gray-400 h-10 rounded-lg h-4 rounded w-2/3"></div>
                        <div className="animate-pulse bg-gray-400 h-10 rounded-lg h-4 rounded w-4/5"></div>
                        <div className="animate-pulse bg-gray-400 h-10 rounded-lg h-5 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        )
    }

    if(products?.length === 0) {
        return <EmptyState 
            title="No Product Found"
            subtitle="Looks like no product exist here."
            varient="notfound"
        />
    }

    if(error) {
        return <EmptyState 
            title="Problem accured when loading Products"
            subtitle="Check your connection please."
        />
    }


    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products?.map(product => (
                    <ProductCom key={product.id} product={product} />
                ))}    
            </div>
        </>
    )
}