import Container from "../../components/ui/container";
import PageHeading from "../../components/ui/page-heading";
import OrdersComponent from "../../components/orders-component";
import useData from "../../hooks/use-data";

export default function () {
    const {orders, isLoadingOrders, errorOrders} = useData();

    return (
        <Container>
            <PageHeading
                title={"My orders"}
                subtitle={'See your orders.'}
            />
            <div className="my-4">
                <OrdersComponent orders={orders} isLoadingOrders={isLoadingOrders} errorOrders={errorOrders} />
            </div>
        </Container>
    )
}