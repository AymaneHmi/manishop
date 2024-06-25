import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Button from "./ui/button";
import Input from "./ui/input";
import Label from "./ui/label";
import { codePattern, passwordPattern } from "../hooks/patterns";
import axios from "axios";
import OTPInput from "./ui/OTP-input";

const endPoint = import.meta.env.VITE_API;

const STEPS = {
    LOGIN: 0,
    FORGET_PASSWORD: 1,
    INSERT_CODE: 2,
    INSERT_PASSWORD: 3
}

export default function LoginComp () {
    
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setValue,
        watch
    } = useForm()

    const [loginError , setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.LOGIN);

    const primaryLabel = useMemo(() => {
        if (step === STEPS.INSERT_PASSWORD) {
            return 'Finish';
        }
        if(step === STEPS.LOGIN){
            return 'Log in';
        }
        return "Continue"
    },[step])

    const secondaryLabel = useMemo(() => {
        if(step === STEPS.FORGET_PASSWORD){
            return 'Back';
        } else {
            return null;
        }
    },[step])

    const onNext = () => {
        setLoginError('')
        setStep(value => value + 1);
    }

    const OTPLength = 4;

    const onSubmit = async (data) => {
        if(isLoading) return;

        if(step === STEPS.LOGIN){
            setIsLoading(true)
            const resData = {
                username_email: data.usernameEmail,
                password: data.password
            }
            axios.post(endPoint + '/user/login', resData)
            .then(res => {
                document.cookie = `ms_user_token=${res.data.user_token}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
                reset()
                navigate(0)
            })
            .catch(err => {
                setLoginError(err.response.data.error);
            })
            .finally(() => {
                setIsLoading(false)
            })
        }

        if(step === STEPS.FORGET_PASSWORD){
            setIsLoading(true)
            axios.get(endPoint + '/user/password/verify?email=' + data.email)
            .then(_ => {
                onNext();
            })
            .catch(err => {
                setLoginError(err.response.data.error);
            })
            .finally(() => {
                setIsLoading(false)
            })
        }

        if(step === STEPS.INSERT_CODE){
            setIsLoading(true)
            const resData = {
                email: data.email,
                code: data.code
            }
            axios.post(endPoint + '/user/password/verify', resData)
            .then(res => {
                onNext();
            })
            .catch(err => {
                setLoginError(err.response.data.error);
            })
            .finally(() => {
                setIsLoading(false)
            })
        }

        if(step === STEPS.INSERT_PASSWORD) {
            setIsLoading(true)
            const  resData = {
                email: data.email,
                password: data.new_password
            }
            axios.post(endPoint + '/user/password/reset', resData)
            .then(res => {
                reset()
                setLoginError('')
                setStep(0)
                toast.success('password updated.')
            })
            .catch(err => {
                setLoginError(err.response.data.error);
            })
            .finally(() => {
                setIsLoading(false)
            })
        }


    }

    let content;
    
    if(step === STEPS.LOGIN){
        content = (
            <>
                <Label>Username or Email</Label>
                <Input 
                    type="text"
                    placeholder="johndeo or johndeo@gmail.com"
                    {...register("usernameEmail", {required: true})}
                />
                {!!errors.usernameEmail && <Label className={"text-red-500 text-sm"}>This field is required</Label>}
                <Label>Password</Label>
                <Input 
                    type="password"
                    placeholder="password"
                    {...register("password", {required: true})}
                />
                {!!errors.password && <Label className={"text-red-500 text-sm"}>This field is required</Label>}
                <Label onClick={onNext}
                    className="hover:underline cursor-pointer w-fit"
                >Forget password?</Label>
            </>
        )
    }

    if(step === STEPS.FORGET_PASSWORD) {
        content = (
            <>
                <Label>Email</Label>
                <Input 
                    type="email"
                    placeholder="johndeo@gmail.com"
                    {...register("email", {required: true})}
                />
                {!!errors.email && <Label className={"text-red-500 text-sm"}>This field is required</Label>}
            </>
        )
    }

    if (step === STEPS.INSERT_CODE){
        content = (
            <>
                <Label>Code</Label>
                <OTPInput
                    length={OTPLength}
                    pattern={codePattern}
                    onComplete={e => setValue("code", e)}
                />
                <Input 
                    className={"hidden"}
                    {...register("code", {required: watch("code")?.length !== OTPLength})}
                />
                {!!errors.code && <Label className={"text-red-500 text-sm"}>This field is required</Label>}
            </>
        )
    } 

    if (step === STEPS.INSERT_PASSWORD) {
        content = (
            <>
                <Label>New Password</Label>
                <Input 
                    type="password"
                    placeholder="password"
                    {...register("new_password", {required: true, min: 8, pattern: passwordPattern})}
                />
                {!!errors.new_password && <Label className={"text-red-500 text-sm"}>This field is required</Label>}
                <Label>Verify Password</Label>
                <Input 
                    type="password"
                    placeholder="verify password"
                    {...register("verify_new_password", {required: true, min: 8, pattern: passwordPattern, validate: watch('password')})}
                />
                {!!errors.verify_new_password && <Label className={"text-red-500 text-sm"}>This field is required</Label>}
            </>
        )
    }

    return (
        <>
            <div className="flex flex-row items-center gap-2">
                <img src="/MS.svg" alt="ms logo" className="w-10" />
                <h2 className="font-bold text-md">{step != STEPS.LOGIN ? "Forget Password" : "Welcome back to Manishop"}</h2>
            </div>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {content}   
                {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                <div className="flex flex-col-reverse md:flex-row gap-2">
                    {secondaryLabel && 
                    <Button
                        type={'Button'}
                        disabled={isLoading}
                        onClick={() => setStep(prev => prev - 1)}
                        varient={"secondary"}
                        className={"text-black"}
                    >
                        {secondaryLabel}
                    </Button>}
                    <Button 
                        type={'submit'}
                        disabled={isLoading}
                        isLoading={isLoading}
                    >
                        {primaryLabel}
                    </Button>
                </div>
            </form>
            <hr />
            <div className="flex flex-row gap-2 items-center">
                <span className="text-sm font-medium">New on Manishop ?</span>
                <Link className="text-secondary text-sm font-medium" to={'/register'}>Register</Link>
            </div>
        </>
    )
}