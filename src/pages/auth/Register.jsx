import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/input";
import { useEffect, useMemo, useState } from "react";
import Button from "../../components/ui/button";
import { toast } from "react-hot-toast";
import { useConvertImages } from "../../hooks/use-convert-image";
import Avatar from "../../components/ui/avatar";

import { codePattern, emailPattern, usernamePattern } from "../../hooks/patterns";
import { passwordPattern } from "../../hooks/patterns";
import { ArrowLeft } from "lucide-react";
import Label from "../../components/ui/label";
import { useForm } from "react-hook-form";
import axios from "axios";
import OTPInput from "../../components/ui/OTP-input";

const endPoint = import.meta.env.VITE_API;;

const STEPS = {
    INFO: 0,
    VERIFY_EMAIL: 1,
    PASSWORD: 2,
    IMAGE: 3,
    EXTRA_INFO: 4
}

export default function Register () {

    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors },
        watch
    } = useForm()

    const navigate = useNavigate();

    const [step , setStep] = useState(STEPS.INFO);
    const [registerError , setRegisterError] = useState('')
    const [userImage , setUserImage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onBack = (e) => {
        e.preventDefault();
        setStep(value => value - 1);
    }

    const onNext = () => {
        setRegisterError('')
        setStep(value => value + 1);
    }

    const onSubmit = async (data) => {
        if(isLoading) return;

        if(step === STEPS.INFO) {
            setIsLoading(true)
            axios.get(endPoint + "/user/register/email?username=" + data.username + '&email=' + data.email)
            .then(_ => {
                onNext();
            })
            .catch(err => {
                return setRegisterError(err.response.data.error)
            })
            .finally(() => {
                setIsLoading(false)
            })
        }

        if(step === STEPS.VERIFY_EMAIL) {
            setIsLoading(true)
            const resData = {
                email: data.email,
                code: data.code
            }
            axios.post(endPoint + "/user/register/email", resData)
            .then(res => {
                onNext();
            })
            .catch(err => {
                setRegisterError(err.response.data.error)
                return;
            })
            .finally(() => {
                setIsLoading(false)
            })
        }

        if(step === STEPS.IMAGE || step === STEPS.PASSWORD) {
            onNext();
        }

        if(step === STEPS.EXTRA_INFO){
            setIsLoading(true)
            const resData = {
                username: data.username,
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                userImage: data.userImage,
                number: data.number,
                address: data.address,
                city: data.city
            }
            axios.post(endPoint + 'user/register', resData)
            .then(_ => {
                reset()
                setUserImage('')
                setRegisterError('')
                toast.success('Register successfuly.')
                navigate('/login')
            })
            .catch(err => {
                setRegisterError(err.response.data.error);
            })
            .finally(() => {
                setIsLoading(false)
            })
        }

    }

    const primaryLabel = useMemo(() => {
        if (step === STEPS.EXTRA_INFO) {
            return 'Finish';
        }
        return "Continue"
    },[step])

    const secondaryLabel = useMemo(() => {
        if(step === STEPS.INFO || step === STEPS.VERIFY_EMAIL) {
            return;
        }

        return 'Back';
    },[step])

    const handleUploadImage = async (image) => {
        const uploadImage = await useConvertImages(image,0.5);
        setUserImage(uploadImage[0])
    }

    useEffect(() => {
        setValue("userImage", userImage)
    },[userImage])

    let body;

    if(step === STEPS.INFO){
        body = (
            <>
                <Label>Username</Label>
                <Input 
                    type="text"
                    placeholder="johndoe"
                    {...register("username" , {required: true, pattern: usernamePattern})}
                />
                {!!errors.username && <Label className={"text-red-500 text-sm"}>This field is required</Label>}
                <Label>Full Name</Label>
                <Input 
                    type="text"
                    placeholder="John Doe"
                    {...register("fullName", {required: true})}
                />
                {!!errors.fullName && <Label className={"text-red-500 text-sm"}>This field is required</Label>}
                <Label>Email</Label>
                <Input 
                    type="email"
                    placeholder={"johndoe@gmail.com"}
                    {...register("email", {required: true, pattern: emailPattern})}
                />
                {!!errors.email && <Label className={"text-red-500 text-sm"}>This field is required</Label>}
            </>
        )
    }

    if(step === STEPS.VERIFY_EMAIL){
        body = (
            <>
                <p>We send a 4 digit code to your email, please insert code here to verify it's yours.</p>
                <OTPInput 
                    length={4}
                    pattern={codePattern}
                    onComplete={e => setValue("code", e)}
                />
                <Input 
                    className={"hidden"}
                    {...register("code", {required: !watch("code")})}
                />
                {!!errors.code && <Label className={"text-red-500 text-sm"}>This field is required</Label>}
            </>
        )
    }

    if(step === STEPS.PASSWORD){
        body = (
            <>
                <Label>Password</Label>
                <Input 
                    type="password"
                    placeholder="password"
                    {...register("password", {required: true, min: 8, pattern: passwordPattern})}
                />
                {!!errors.password && <Label className={"text-red-500 text-sm"}>This field is required</Label>}
                <Label>Verify Password</Label>
                <Input 
                    type="password"
                    placeholder="verify password"
                    {...register("verifyPassword", {required: true, min: 8, pattern: passwordPattern, validate: watch("password")})}
                />
                {!!errors.verifyPassword && <Label className={"text-red-500 text-sm"}>This field is required</Label>}
            </>
        )
    }

    if(step === STEPS.IMAGE) {
        body = (
            <>
                <Label>Profile image (optional)</Label>
                <div className="w-full flex flex-col gap-2 items-center">
                    <div className="w-28 h-28 drop-shadow-xl">
                        <Avatar 
                            imageSrc={userImage} 
                        />
                    </div>
                    <Input 
                        type="file"
                        placeholder="password"
                        onChange={(e) => handleUploadImage(e.target.files)}
                    />
                </div>
            </>
        )
    }

    if(step === STEPS.EXTRA_INFO){
        body = (
            <>
                <Label>Number (optional)</Label>
                <Input 
                    type="number"
                    placeholder="Number"
                    {...register("number")}
                    />
                <Label>Address (optional)</Label>
                <Input 
                    type="text"
                    placeholder="Address"
                    {...register("address")}
                    />
                <Label>City (optional)</Label>
                <Input 
                    type="text"
                    placeholder="City"
                    {...register("city")}
                />
            </>
        )
    }

    return (
        <div className="w-screen h-screen flex flex-row">
            <div className="hidden lg:block w-7/12 h-full overflow-hidden relative">
                <div className="absolute top-5 left-5 text-white z-[1]">
                    <Link to={'/'}>
                        <ArrowLeft size={30} />
                    </Link>
                </div>
                <div className="absolute inset-0 bg-black/80"></div>
                <img src="/bg.jpg" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="w-full lg:w-5/12 h-full flex flex-col justify-center items-center bg-gray-50">
                <div className="w-full px-10 lg:px-20 flex flex-col gap-4">
                    <div className="flex flex-row items-center gap-2">
                        <img src="/MS.svg" alt="ms logo" className="w-10" />
                        <h2 className="font-bold text-md">Welcome to Manishop</h2>
                    </div>
                    <hr />
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                        {body}
                        {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
                        <div className="flex flex-col-reverse md:flex-row gap-2">
                            {secondaryLabel && 
                            <Button 
                                type={"button"}
                                onClick={onBack} 
                                varient={"secondary"}
                                className={"text-black"}
                            >
                                {secondaryLabel}
                            </Button>}
                            <Button 
                                disabled={isLoading}
                                isLoading={isLoading}
                                type="submit"
                            >
                                {primaryLabel}
                            </Button>
                        </div>
                    </form>
                    <hr />
                    <div className="flex flex-row gap-2 items-center">
                        <span className="text-sm font-medium">Already have an account ?</span>
                        <Link 
                            className="text-secondary text-sm font-medium" 
                            to={'/login'}
                        >Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}