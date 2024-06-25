import { useParams } from "react-router-dom";
import useUser from "../hooks/use-user";
import axios from "axios";
import { useQuery } from "react-query";
import { useUpdateData } from "../hooks/use-data";
import { useEffect, useState } from "react";
import Loader from "./ui/loader";
import EmptyState from "./ui/empty-state";
import ReviewRate from "./review-rate";
import Avatar from "./ui/avatar";
import { format } from "date-fns";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { useSheet } from "../hooks/use-sheet"
import Sheet from "./ui/sheet"
import PageHeading from "./ui/page-heading";
import Button from "./ui/button";
import toast from "react-hot-toast";
import Textarea from "./ui/textarea";
import { useForm } from "react-hook-form";
import Label from "./ui/label";

const api = import.meta.env.VITE_API;
const USER_SPENT = 20;

export default function Reviews () {
    const {productSlug} = useParams();
    const {user} = useUser();
    const {reloadReviews, updateReviews} = useUpdateData();
    const {isOpen, onOpen, onClose, sheetType, data} = useSheet();
    const isOpenSheet = isOpen && (sheetType === "deleteReview" || sheetType === "editReview");

    const [isLoadingAddReview, setIsLoadingAddReview] = useState(false)
    const [isLoadingReview, setIsLoadingReview] = useState(false);
    const [reviewError, setReviewError] = useState('');

    const {
        register,
        setValue,
        handleSubmit,
        reset,
        watch
    } = useForm()

    const onSubmit = async (data) => {

        if(sheetType === "editReview") {
            const resData = {
                reviewId: data.reviewId,
                rating: data.editedRating,
                comment: data.editedComment
            }
            setIsLoadingReview(true)
            axios.patch(api + '/reviews/review', resData)
            .then(res => {
                setReviewError('')
                reset();
                onClose();
                toast.success("Review updated seccussfuly")
                updateReviews();
            })
            .catch(err => {
                setReviewError(err.response.data.error)
            })
            .finally(() => {
                setIsLoadingReview(false)
            })
            return;
        }

        setIsLoadingAddReview(true)
        axios.post(api + '/reviews/review', data)
        .then(res => {
            toast.success('Review Added Seccussfuly');
            updateReviews();
            reset();
        })
        .catch(err => {
            setReviewError(err.response.data.error)
        })
        .finally(() => {
            setIsLoadingAddReview(false)
        })
    }

    useEffect(() => {
        setValue("productSlug", productSlug)
    },[productSlug])

    useEffect(() => {
        setValue("userId", user?.id)
    },[user])

    useEffect(() => {
        setValue("reviewId", data?.review?.id);
        setValue("editedRating", data?.review?.rating);
        setValue("editedComment", data?.review?.comment);
    },[data?.review])

    const fetchReviews = async (productSlug) => {
        const res = await axios.get(api + '/reviews/review?productSlug=' + productSlug)
        return res.data
    }

    const {data:reviews, isLoading, error, refetch} = useQuery({
        queryKey: ['reviews', productSlug],
        queryFn: () => fetchReviews(productSlug),
        initialData: [],
    })

    const sortReviews = reviews?.sort((a, b) => {
        if (a.username === user?.username) return -1;
        if (b.username === user?.username) return 1;
        return 0;
    });

    useEffect(() => {
        refetch();
    },[reloadReviews])

    const handleDeleteReview = async () => {
        setIsLoadingReview(true)
        axios.delete(api + '/reviews/review?reviewId=' + data?.reviewId)
        .then(res => {
            onClose();
            updateReviews();
            setReviewError('')
        })
        .catch(err => {
            setReviewError(err.response.data.error)
        })
        .finally(() => {
            setIsLoadingReview(false)
        })
    }

    let sheetBody;

    switch (sheetType) {
        case "deleteReview":
            sheetBody = (<>
                <h2 className="text-2xl font-bold">Delete Review</h2>
                <PageHeading
                    varient={"large"}
                    title="Are you absolutely sure?"
                    subtitle="This action cannot be undone."
                />
                <Label className={'text-red-500'}>{reviewError}</Label>
                <div className="flex flex-row gap-2 lg:w-1/2">
                    <Button
                        varient={"secondary"}
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        varient={"destructive"}
                        onClick={handleDeleteReview}
                        isLoading={isLoadingReview}
                        disabled={isLoadingReview}
                    >
                        Delete
                    </Button>
                </div>
            </>);
            break;
        case "editReview":
            sheetBody = (<>
                <h2 className="text-2xl font-bold">Edit Review</h2>
                <ReviewRate
                    rate={watch("editedRating")}
                    handleRate={(rating) => setValue("editedRating", rating)}
                />
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 lg:w-1/2">
                    <Textarea
                        placeholder={"tell us about your experience (optional)"} 
                        {...register("editedComment")}
                    />
                    <Label className={'text-red-500'}>{reviewError}</Label>
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
                            isLoading={isLoadingReview}
                            disabled={isLoadingReview}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </>);
            break;
    }

    if(isLoading){
        return <Loader
            isLoading
        />
    }

    if(error) {
        return <EmptyState
            title={'Uh No! Something went wrong'}
            subtitle={"check your connection and try again."}
        />
    }

    return (
        <>
            <Sheet
                isOpen={isOpenSheet}
                side="bottom"
                onClose={onClose}
                className={"h-fit gap-2"}
            >
                {sheetBody}
            </Sheet>
            <section>
                <h2 className="my-2 text-3xl font-bold">
                    {'Reviews (' + reviews?.length + ')'}
                </h2>
                <section className="my-4 flex flex-col gap-4">

                    {user?.amountSpent > USER_SPENT && <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-2">
                            <div className="w-10 h-10">
                                <Avatar imageSrc={user?.imageSrc} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label className={"font-bold"}>{user?.fullName}</Label>
                                <Label className={"text-xs"}>@{user?.username}</Label>
                            </div>
                        </div>
                        <ReviewRate
                            handleRate={rate => setValue("rating", rate)}
                        />
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-row items-start gap-2 w-full lg:w-1/2">
                            <Textarea 
                                placeholder={"tell us about your experience (optional)"} 
                                {...register("comment")}
                            />
                            <Button 
                                className={"w-1/3"}
                                type={"submit"}
                                disabled={!watch("rating")}
                                isLoading={isLoadingAddReview}
                            >
                                Add Review
                            </Button>
                        </form>
                        <Label className={'text-red-500'}>{reviewError}</Label>
                    </div>}

                    <section className="flex flex-col gap-2 w-full lg:w-1/2">
                        {sortReviews?.map(review => (
                            <div key={review.id} className="relative flex flex-col gap-2 py-4 border-b">
                                {user?.username === review.username && <div className="relative group">
                                    <MoreVertical size={20} className="absolute top-2 right-2 cursor-pointer hover:text-gray-800" />
                                    <div className="absolute z-[20] top-5 right-10 max-h-0 bg-white group-hover:max-h-[300px] flex flex-col items-left text-black rounded group-hover:border shadow-xl min-w-[130px] transition-all duration-150 overflow-hidden">
                                        <div onClick={() => onOpen("editReview", {review})} className="flex flex-row items-center gap-1 cursor-pointer py-1 px-2 text-sm hover:bg-gray-50">
                                            <Edit size={15} />
                                            Edit
                                        </div>
                                        <div  onClick={() => onOpen("deleteReview", {reviewId: review.id})} className="flex flex-row items-center gap-1 cursor-pointer py-1 px-2 text-sm hover:bg-gray-50">
                                            <Trash size={15} />
                                            Delete
                                        </div>
                                    </div>
                                </div>}
                                <ReviewRate
                                    rate={review.rating}
                                    viewOnly
                                />
                                <p className="text-sm font-bold">{review.comment}</p>
                                <div className="flex flex-row gap-2 items-center">
                                    <div className="w-8 h-8">
                                        <Avatar imageSrc={review.userImage} />
                                    </div>
                                    <span className="text-xs font-bold">@{review.username}</span>
                                    <span className="text-xs font-bold">{format(new Date(review.createdAt) , "PPP")}</span>
                                </div>
                            </div>
                        ))}
                    </section>

                </section>
            </section>
        </>
    )
}