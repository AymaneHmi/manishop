import ProductsCom from "../../components/products-component";
import Container from "../../components/ui/container";
import useData from "../../hooks/use-data";
import Categories from "../../components/Categories";
import Banner from "../../components/banner";
import Features from "../../components/features";
import Testimonials from "../../components/testimonials";

export default function Home() {

  const {products, isLoadingProducts, errorProducts} = useData();

  const productsData = products?.slice(0, 4).sort((a, b) => {
    const averageRateA = a.reviews?.averageRate ?? 0;
    const averageRateB = b.reviews?.averageRate ?? 0;
    return averageRateB - averageRateA;
  })

  return (
    <>
      <Container className={"my-4 flex flex-col gap-8"}>
        <Banner />
        <h1 className="text-2xl lg:text-4xl font-bold">Most Popular Products</h1>
        <ProductsCom products={productsData} isLoading={isLoadingProducts} error={errorProducts} />
        <h1 className="text-2xl lg:text-4xl font-bold">Explore Our Categories</h1>
        <Categories />
        <h1 className="text-2xl lg:text-4xl font-bold">How It's Works</h1>
        <Features />
        <h1 className="text-2xl lg:text-4xl font-bold">What Our Customers Say</h1>
        <Testimonials />
      </Container>
    </>
  )
}