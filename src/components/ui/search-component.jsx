import { SearchIcon } from "lucide-react";
import Input from "./input";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SearchComp() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const [searchValue, setSearchValue] = useState('')

    const query = queryParams.get('q')

    const handleInput = (e) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        if(query !== '') {
            setSearchValue(query)
        }
    },[query])

    const handleSearch = (e) => {
        e.preventDefault();
        if(searchValue !== '') {
            queryParams.set('q', searchValue?.toLowerCase())
        } else {
            queryParams.delete('q')
        }
        navigate(`/products?${queryParams.toString()}`)
    }

    return (
        <form onSubmit={handleSearch} className="w-full">
            <div className="flex flex-row justify-center border border-primary rounded-md">
                <Input 
                    onChange={e => handleInput(e)}
                    value={searchValue}
                    placeholder={"Search Products .."}
                    type={"text"}
                    varient={"outline"}
                />
                <span type="submit" className="flex flex-col justify-center px-2 text-primary cursor-pointer">
                    <SearchIcon />
                </span>
            </div>
        </form>
    )
}