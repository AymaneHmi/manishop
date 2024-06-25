import { useSheet } from "../hooks/use-sheet";
import Button from "./ui/button";
import Input from "./ui/input";
import Label from "./ui/label";
import Sheet from "./ui/sheet";

export default function ProfileSettings () {
    const {onOpen, isOpen, onClose, sheetType} = useSheet();
    const isOpenSheet = isOpen && sheetType === "changePassword"

    let sheetBody;

    switch (sheetType) {
        case "changePassword":
            sheetBody = (<>
                <h2 className="font-bold text-2xl">Change Password</h2>
                <div className="lg:w-1/3 flex flex-col gap-4">
                    <Label>Current Password</Label>
                    <Input 
                        type={"password"}
                    />
                    <Label>New Password</Label>
                    <Input 
                        type={"password"}
                    />
                    <div className="flex flex-row gap-2">
                        <Button
                            type={"button"}
                            varient={"secondary"}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type={"submit"}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </>)
            break;
        default:
            break;
    }
    return (
        <>
            <Sheet
                isOpen={isOpenSheet}
                side="bottom"
                onClose={onClose}
                className={"h-fit"}
            >
                {sheetBody}
            </Sheet>
            <div className="flex flex-col gap-2 w-full">
                <Button
                    varient={"secondary"}
                    className={"justify-start"}
                    onClick={() => onOpen("changePassword")}
                >
                    Change Password
                </Button>
                <Button
                    varient={"destructive"}
                    className={"justify-start"}

                >
                    Delete Account
                </Button>
            </div>
        </>
    )
}