import Loader from "./ui/loader";
import EmptyState from "./ui/empty-state";
import Gallery from "./gallery";
import { twMerge } from "tailwind-merge";
import Badge from "./ui/badge";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import Label from "./ui/label";

export default function OrdersComponent ({orders, isLoadingOrders, errorOrders}) {

    if(isLoadingOrders) {
        return <Loader isLoading />
    }

    if(errorOrders?.response?.status && errorOrders?.response?.status !== 200 && errorOrders?.response?.status !== 404) {
        return <EmptyState
            title={"Uh No! Something went wrong."}
            subtitle={"Error Type:" + errorOrders}
        />
    }

    if(errorOrders?.response?.status && errorOrders?.response?.status === 404) {
        return <EmptyState
            title={'No order found.'}
            subtitle={'Looks like no order exist.'}
            varient="notfound"
        />
    }

    return (
        <div className="flex flex-col gap-4">
            {orders?.length > 0 && orders?.map(order => (
                <div key={order.id} className={twMerge("flex flex-row gap-4 items-center", order?.orderProducts?.length > 1 && 'flex-col md:flex-row items-left md:items-center')}>
                    <div className="flex flex-row gap-2 items-center">
                        {order?.orderProducts.map((orderProduct, i) => (
                            <Link key={i} to={'/products/' + orderProduct.slug} className="h-[14vh] lg:h-[20vh] aspect-square hover:scale-95 transition duration-200">
                                <Gallery
                                    media={orderProduct?.media}
                                />
                            </Link>
                        ))}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex flex-row items-center gap-2">
                            <Label>Order id:</Label>
                            <h2 className="font-bold text-sm md:text-base">{order.orderId}</h2>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Label>Total Price:</Label>
                            <h2 className="font-bold text-sm md:text-base">${order.totalPrice}</h2>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Label>Status:</Label>
                            <Badge
                                className={'w-fit'}
                                style={{borderColor: order.status.value, color: order.status.value}}
                            >
                                {order.status.name}
                            </Badge>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Label>Date:</Label>
                            <h2 className="font-bold text-sm md:text-base">{format(new Date(order.createdAt), "PPP")}</h2>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}