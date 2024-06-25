import OrdersComponent from "../../components/orders-component";
import ProfileSettings from "../../components/profile-settings";
import Avatar from "../../components/ui/avatar";
import Container from "../../components/ui/container";
import EmptyState from "../../components/ui/empty-state";
import Input from "../../components/ui/input";
import Label from "../../components/ui/label";
import PageHeading from "../../components/ui/page-heading";
import useData from "../../hooks/use-data";
import useUser from "../../hooks/use-user";

export default function Profile () {
    const {user} = useUser();
    const {orders, isLoadingOrders, errorOrders} = useData();

    return (
        <>
            <Container>
                <PageHeading
                    title="My profile"
                    subtitle="See/edit your profile."
                />
                <section className="flex flex-col gap-6 my-8">
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex flex-row items-center gap-4">
                            <div className="w-20 h-20">
                                <Avatar imageSrc={user?.imageSrc} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label className={'font-bold'}>{user?.fullName}</Label>
                                <Label className={'text-xs'}>@{user?.username}</Label>
                            </div>
                        </div>
                        <hr />
                        <div className="flex flex-wrap gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Email</Label>
                                <Input disabled value={user?.email} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Number</Label>
                                <Input disabled value={user?.number} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Address</Label>
                                <Input disabled value={user?.address} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>City</Label>
                                <Input disabled value={user?.city} />
                            </div>
                        </div>
                    </div>
                    <h2 className="font-bold text-2xl">Recently Orders</h2>
                    {errorOrders?.response?.status && errorOrders?.response?.status === 404 ? 
                        <EmptyState
                            title={'No order found.'}
                            subtitle={'Looks like no order exist.'}
                            varient="notfound"
                            className={"h-fit"}
                            iconSize={40}
                        /> :
                        <OrdersComponent orders={orders?.slice(0, 3)} isLoadingOrders={isLoadingOrders} errorOrders={errorOrders} />
                    }
                    <h2 className="font-bold text-2xl">Settings</h2>
                    <ProfileSettings />
                </section>
            </Container>
        </>
    )
}