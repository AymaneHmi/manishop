import ProductsCom from "../../components/ProductsCom";
import Container from "../../components/ui/Container";
import Categories from "../../components/Categories";
import Banner from "../../components/Banner";
import getProducts from "../../actions/getProducts";

export default function Home() {

  const products = getProducts();

  return (
    <>
      <Banner />
      <Container className={"my-4 flex flex-col gap-8"}>
        <h1 className="text-4xl font-bold">Categories</h1>
        <Categories />
        <h1 className="text-4xl font-bold">Featured Products</h1>
        <ProductsCom products={products} />
      </Container>
    </>
  )
}