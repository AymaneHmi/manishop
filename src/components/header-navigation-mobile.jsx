import { Heart, LucideHome, MenuIcon, Package, Shirt, ShoppingCartIcon, User2Icon } from "lucide-react";
import Button from "./ui/button";
import { useSheet } from "../hooks/use-sheet";
import { Link, useLocation } from "react-router-dom";
import SearchComp from "./ui/search-component";
import Sheet from "./ui/sheet";
import useUser from "../hooks/use-user";

const navigationLinks = [
    {
        label: 'Home',
        icon: LucideHome,
        href: '/',
    },
    {
        label: 'Products',
        icon: Shirt,
        href: '/products'
    },
    {
        label: 'My Orders',
        icon: Package,
        href: '/orders',
        private: true
    },
    {
        label: 'My Favorites',
        icon: Heart,
        href: '/favorites',
    },
    {
        label: 'My Cart',
        icon: ShoppingCartIcon,
        href: '/cart',
    },
    {
        label: 'My Profile',
        icon: User2Icon,
        href: '/profile',
        private: true
    },
]

const HeaderSheet = () => {
    const {isOpen, onClose, sheetType} = useSheet();
    const isOpenModal = isOpen && sheetType === "headerNavigation";
    const location = useLocation();
    const {user} = useUser();

    return (
        <Sheet
            isOpen={isOpenModal}
            side="left"
            onClose={onClose}
            forMobile
        >
            <Link to={'/'}>
                <img className="w-10" src='/MS.svg' alt="" />
            </Link>
            <hr className="w-full" />
            <SearchComp />
            <hr className="w-full" />

            {navigationLinks.map((link, i) => (
                (!link.private || link.private && user) && <Link key={i} to={link.href}>
                    <Button
                        className={'items-center justify-start gap-2'}
                        varient={location.pathname !== link.href && "secondary"}
                    >
                        <link.icon size={18} />
                        <h2>{link.label}</h2>
                    </Button>
                </Link>
            ))}
        
        </Sheet>
    )
}

export default function HeaderNavigationMobile () {
    const {onOpen} = useSheet();

    return (
        <>
            <Button
                type={"button"}
                varient={'secondary'}
                className={"lg:hidden w-fit border-0"}
                onClick={() => onOpen("headerNavigation")}
            >
                <MenuIcon />
            </Button>
            <HeaderSheet />
        </>
    )
}