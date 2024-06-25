import { useEffect, useState } from "react"

import { useLocation, useNavigate } from "react-router-dom"
import ProductsCom from "../../components/products-component"
import Container from "../../components/ui/container"
import PageHeading from "../../components/ui/page-heading"
import useData from "../../hooks/use-data"
import Label from "../../components/ui/label"
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react"
import Button from "../../components/ui/button"
import { useSheet } from "../../hooks/use-sheet"
import Sheet from "../../components/ui/sheet"
import SearchComp from "../../components/ui/search-component"

export default function Products () {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);

    const {products, isLoadingProducts, errorProducts} = useData();
    const {categories} = useData();
    const {onOpen, isOpen, onClose, sheetType} = useSheet();
    const isOpenSheet = isOpen && sheetType === "filtersSheet"

    const [filteredProducts, setFilteredProducts] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);
    const nPages = Math.ceil(products?.length / productsPerPage) || 0;
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)    
    const goToNextPage = () => {
        if(currentPage !== nPages) setCurrentPage(currentPage + 1)
    }
    const goToPrevPage = () => {
        if(currentPage !== 1) setCurrentPage(currentPage - 1)
    }

    const query = queryParams.get('q')
    const categoryFilter = queryParams.get('category');
    const subcategoryFilter = queryParams.get('subcategory');
    const filter = queryParams.get("filter");

    useEffect(() => {
        const filterProducts = () => {
            let filtered = currentProducts;

            if (categoryFilter) {
                filtered = filtered?.filter(product =>
                    product?.category?.name?.toLowerCase() === categoryFilter.toLowerCase()
                );
            }

            if (subcategoryFilter) {
                filtered = filtered?.filter(product =>
                    product?.subcategory?.name?.toLowerCase() === subcategoryFilter.toLowerCase()
                );
            }

            if (query) {
                filtered = filtered?.filter(product =>
                    Object.values(product).some(val => {
                        if (typeof val === "string") {
                            return val.toLowerCase().includes(query.toLowerCase());
                        }
                        if (Array.isArray(val)) {
                            return val.some(obj =>
                                Object.values(obj).some(str =>
                                    typeof str === 'string' && str.toLowerCase().includes(query.toLowerCase())
                                )
                            );
                        }
                        return false;
                    })
                );
            }

            if(filter === "new") {
                filtered = filtered?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }

            if(filter === "best-seller") {
                filtered = filtered?.sort((a, b) => {
                    const totalReviewsA = a.reviews?.totalReviews ?? 0;
                    const totalReviewsB = b.reviews?.totalReviews ?? 0;
                    return totalReviewsB - totalReviewsA;
                });
            }

            return filtered;
        };

        setFilteredProducts(filterProducts());
    }, [categoryFilter, subcategoryFilter, query, filter, products]);

    const handleCategoryFilter = (e, category) => {
        if(categoryFilter === category.name.toLowerCase()) {
            queryParams.delete('category')
            if(subcategoryFilter) {
                queryParams.delete('subcategory')
            }
        }else {
            queryParams.set('category', e.target.value)
        }
        navigate('?' + queryParams.toString())
    }

    const handleSubcategoryFilter = (e, subcategory, category) => {
        if(subcategoryFilter === subcategory.toString().toLowerCase()) {
            queryParams.delete('subcategory')
            queryParams.delete('category')
        } else {
            queryParams.set('subcategory', e.target.value.toLowerCase())
            queryParams.set('category', category.name.toLowerCase())
        }
        navigate('?' + queryParams.toString())
    }

    const handleFilter = (e) => {
        if(filter === e.toLowerCase()) {
            queryParams.delete("filter")
        } else {
            queryParams.set("filter", e)
        }
        navigate('?' + queryParams.toString())
    }

    const filters = (<>
        <div className="flex flex-row items-center gap-2">
            <SlidersHorizontal size={16} />
            <h2 className="font-bold">Filters</h2>
        </div>
        <hr />
        <div className="flex flex-col gap-3 px-2">
            {categories?.map(category => (
                <div key={category.id} className="flex flex-col gap-3">
                    <div className="flex flex-row gap-2">
                        <input 
                            onChange={e => handleCategoryFilter(e,category)} 

                            checked={categoryFilter === category.name.toLowerCase()}

                            type="checkbox" 
                            id={`category_checkbox_${category.id}`}

                            value={category.name.toLowerCase()} />
                        <Label htmlFor={`category_checkbox_${category.id}`}>{category.name}</Label>
                    </div>
                    {category.subcategories?.map(subcategory => (
                        <div key={subcategory} className="ml-4">
                            <div className="flex flex-row gap-2">
                                <input 
                                    type="checkbox"
                                    id={`checkbox_${category}_${subcategory}`}

                                    onChange={e => handleSubcategoryFilter(e,subcategory,category)}

                                    checked={subcategoryFilter ? (subcategoryFilter === subcategory.toString().toLowerCase() && categoryFilter === category.name.toLowerCase()) : categoryFilter === category.name.toLowerCase()}

                                    value={subcategory.toString().toLowerCase()}
                                />
                                <Label htmlFor={`checkbox_${category}_${subcategory}`}>{subcategory}</Label>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
        <hr />
        <div className="flex flex-col gap-3 px-2">
            <div className="flex flex-row gap-2">
                <input type="checkbox" value={"new"} onChange={e => handleFilter(e.target.value)} checked={filter === "new"} />
                <Label htmlFor="">New</Label>
            </div>
            <div className="flex flex-row gap-2">
                <input type="checkbox" value={"best-seller"} onChange={e => handleFilter(e.target.value)} checked={filter === "best-seller"} />
                <Label htmlFor="">Best seller</Label>
            </div>
        </div>
    </>)

    return (
        <Container className={'flex flex-row items-start'}>
            <section className="hidden lg:flex sticky top-24 left-0 w-1/5 flex-col gap-4 my-4 border-r">
                {filters}
            </section>
            <section className="pl-0 lg:pl-4 w-full lg:w-4/5">
                <PageHeading
                    title={'Products'}
                    subtitle="Discover all products."
                />
                <div className="flex flex-row gap-2 lg:hidden my-4">
                    <Button 
                        varient={"secondary"}
                        onClick={() => onOpen("filtersSheet")} 
                        className={"justify-start gap-2 w-fit"}
                    >
                        <SlidersHorizontal size={15} />
                        Filters
                    </Button>
                    <SearchComp />
                </div>
                <Sheet
                    isOpen={isOpenSheet}
                    side="bottom"
                    onClose={onClose}
                    className={"h-fit gap-6"}
                >
                    {filters}
                </Sheet>
                <section className="flex flex-col items-center">
                    {query && <p className="font-bold my-2">"{query}"</p>}
                    <div className="w-full my-4">
                        <ProductsCom products={filteredProducts} isLoading={isLoadingProducts} error={errorProducts} />
                    </div>
                    {products?.length > productsPerPage && <nav className="mx-auto flex w-full justify-center my-2">
                        <ul className="flex flex-row items-center gap-1">
                            <li>
                                <Button
                                    varient={"secondary"}
                                    className={"gap-1"}
                                    onClick={goToPrevPage}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span>Previous</span>
                                </Button>
                            </li>
                            {pageNumbers.map((pageNumber, i) => (
                                <li key={i}>
                                    <Button
                                        varient={currentPage === pageNumber ? "outline" : "ghost"}
                                        className={"gap-1"}
                                        onClick={() => setCurrentPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </Button>
                                </li>
                            ))}
                            <li>
                                <Button
                                    varient={"secondary"}
                                    className={"gap-1"}
                                    onClick={goToNextPage}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                    <span>Next</span>
                                </Button>
                            </li>
                        </ul>
                    </nav>}
                </section>
            </section>
        </Container>
    )
}