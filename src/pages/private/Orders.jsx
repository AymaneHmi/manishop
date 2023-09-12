import { useEffect } from "react";
import getOrders from "../../actions/getOrders";
import Container from "../../components/ui/Container";
import PageHeading from "../../components/ui/PageHeading";
import EmptyState from "../../components/ui/EmptyState";

export default function () {

    const orders = getOrders();

    let content;

    if(orders.length === 0) {
        content = (
            <EmptyState
                title={'No order found.'}
                subtitle={'Looks like no order exist.'}
            />
        )
    } else {
        content = (
            <div className="relative overflow-x-auto rounded mb-8">
                <table className="w-full text-left">
                    <thead className="text-sm capitalize border-b border-primary">
                        <tr>
                            <th scope="col" className="px-6 py-3">Order Id</th>
                            <th scope="col" className="px-6 py-3">Products</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Phone</th>
                            <th scope="col" className="px-6 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order) => (
                            <tr key={order.id} className="border-b border-primary even:bg-gray-100 even:dark:bg-dark-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{order.orderId}</th>
                                <td className="px-6 py-4">{order.products}</td>
                                <td className="px-6 py-4">{order.name}</td>
                                <td className="px-6 py-4">{order.phone}</td>
                                <td className="px-6 py-4">{order.address}</td>
                                <td className="px-6 py-4">{order.createdAt}</td>
                                <td className="px-6 py-4">${order.price}</td>
                                <td className="px-6 py-4">{order.status}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    return (
        <>
            <Container>
                <PageHeading
                    title={"My orders"}
                    subtitle={'See your orders.'}
                />
                
                {content}

            </Container>
        </>
    )
}