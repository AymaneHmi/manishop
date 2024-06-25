import { X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { useSheet } from "../../hooks/use-sheet";
import { useEffect, useRef } from "react";

export default function Sheet({children, isOpen=false, onClose, side="right", forMobile=false, className}) {
    const {showSheet} = useSheet();

    const sheetContainer = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (sheetContainer.current && !sheetContainer.current.contains(e.target)) {
                onClose();
            }
        };

        if (showSheet) {
            document.body.addEventListener('click', handleClickOutside);
        } else {
            document.body.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [sheetContainer, showSheet]);

    let sheetVarient;

    switch (side) {
        case "left":
            sheetVarient = "w-3/4 h-full border-r top-0 left-0 transform transtion-all data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full";
            break;
        case "top":
            sheetVarient = "w-full h-2/5 border-b top-0 inset-x-0 transform transtion-all data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-full";
            break;
        case "bottom":
            sheetVarient = "w-full h-2/5 border-t bottom-0 inset-x-0 transform transtion-all data-[state=open]:translate-y-0 data-[state=closed]:translate-y-full";
            break;
        default:
            sheetVarient = "w-3/4 h-full border-l top-0 right-0 transform transtion-transform data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full";
    }

    if (!isOpen) {
        return null;
    }
    
    return (
        <div data-state={showSheet ? "open" : "closed"} className={twMerge("fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:opacity-100 data-[state=closed]:opacity-0 transtion duration-300", forMobile && "lg:hidden")}>
            <aside ref={sheetContainer} data-state={showSheet ? "open" : "closed"} className={twMerge("relative fixed z-50 flex flex-col gap-4 bg-gray-50 text-black p-6 shadow-lg duration-200", sheetVarient, forMobile && "lg:hidden", className)}>
                <X size={20} className="absolute top-5 right-5 cursor-pointer" onClick={onClose} />
                {children}
            </aside>
        </div>
    )
}