import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useEffect, useMemo, useState } from "react";
import Button from "../../components/ui/Button";
import { useForm } from "../../hooks/useForm";
import { useRequest } from "../../hooks/useRequest";
import { toast } from "react-hot-toast";
import { useConvertImages } from "../../hooks/use-convert-image";
import Avatar from "../../components/ui/Avatar";

import { emailPattern } from "../../hooks/patterns";
import { passwordPattern } from "../../hooks/patterns";


const initialState = {
    username: '',
    email: '',
    email_verify: '',
    password: '',
    password_verify: '',
    image: '',
    number: '',
    address: '',
    city: ''
}

export default function Register () {

    const {
        formData: registerInfo, 
        handleChange: handlechange, 
        resetForm: handleReset
    } = useForm(initialState);

    const navigate = useNavigate();

    const STEPS = {
        INFO: 0,
        VERIFY_EMAIL: 1,
        PASSWORD: 2,
        IMAGE: 3,
        EXTRA_INFO: 4
    }

    const [step , setStep] = useState(STEPS.INFO);
    const [registerError , setRegisterError] = useState('')
    const [userImage , setUserImage] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onBack = (e) => {
        e.preventDefault();
        setStep(value => value - 1);
    }

    const onNext = () => {
        setStep(value => value + 1);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(step === STEPS.INFO) {
            if(!registerInfo.username || !registerInfo.email){
                setRegisterError('email and username are required!')
                return;
            }
            if(!emailPattern.test(registerInfo.email)) {
                setRegisterError('Enter a valid email!')
                return;
            }
            setIsLoading(true)
            const data = {
                username: registerInfo.username,
                email: registerInfo.email
            }
            const responseData = await useRequest.post(data, '/register/check_email.php')
            setIsLoading(false)
            if(responseData.error){
                setRegisterError(responseData.error)
                return;
            }
        }
        if(step === STEPS.VERIFY_EMAIL) {
            if(!registerInfo.email_verify) {
                setRegisterError('This fields is requiered!')
                return;
            }
            setIsLoading(true)
            const data = {
                email: registerInfo.email,
                code: registerInfo.email_verify
            }
            const responseData = await useRequest.post(data, '/register/verify_email.php');
            setIsLoading(false)
            if(responseData.error) {
                setRegisterError(responseData.error)
                return;
            }
        }
        if(step === STEPS.PASSWORD){
            if(!registerInfo.password || !registerInfo.password_verify){
                setRegisterError('These fields are reqired!')
                return;
            }
            if(registerInfo.password.length < 8){
                setRegisterError('enter password with at least 8 characters!')
                return;
            }
            if(!passwordPattern.test(registerInfo.password)){
                setRegisterError('enter a special character in your password!')
                return
            }
            if(registerInfo.password !== registerInfo.password_verify) {
                setRegisterError('password is not verified!')
                return;
            }
        }
        if(step !== STEPS.EXTRA_INFO) {
            setRegisterError('')
            onNext();
        }
        if(step === STEPS.EXTRA_INFO){
            setIsLoading(true)
            const data = {
                username: registerInfo.username,
                email: registerInfo.email,
                password: registerInfo.password,
                image: registerInfo.image,
                number: registerInfo.number,
                address: registerInfo.address,
                city: registerInfo.city
            }
            const responseData = await useRequest.post(data, '/register/new_user.php')
            setIsLoading(false)
            if(responseData.error){
                toast.error('something went wrong!');
                return;
            }
            handleReset(initialState);
            setUserImage('')
            toast.success('Register successfuly.')
            navigate('/login')
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
        handlechange('image', userImage);
    },[userImage])

    const footer = (
        <div className="flex flex-row gap-2 items-center">
            <span>Already have an account ?</span>
            <Link 
                className="text-secondary" 
                to={'/login'}
            >Log in</Link>
        </div>
    )
    let body;

    let buttons = (
        <div className="flex flex-row gap-2">
            {secondaryLabel && 
            <Button 
                onClick={onBack} 
                outline
            >
                {secondaryLabel}
            </Button>}
            <Button 
                type="submit"
                disabled={isLoading}
            >
                {primaryLabel}
            </Button>
        </div>
    )

    if(step === STEPS.INFO){
        body = (
            <>
                <label htmlFor="username">Username</label>
                <Input 
                    type="text"
                    placeholder="username"
                    value={registerInfo.username}
                    required
                    onChange={(e) => handlechange('username' , e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <Input 
                    type="email"
                    placeholder="email"
                    value={registerInfo.email}
                    required
                    pattern={emailPattern}
                    onChange={(e) => handlechange('email' , e.target.value)}
                />
            </>
        )
    }

    if(step === STEPS.VERIFY_EMAIL){
        body = (
            <>
                <p>We send a code to your email, please insert code here to verify it's yours.</p>
                <label htmlFor="code">Code</label>
                <Input 
                    type="text"
                    placeholder="Code"
                    value={registerInfo.email_verify}
                    required
                    onChange={(e) => handlechange('email_verify' , e.target.value)}
                />
            </>
        )
    }

    if(step === STEPS.PASSWORD){
        body = (
            <>
                <label htmlFor="password">Password</label>
                <Input 
                    type="password"
                    placeholder="password"
                    value={registerInfo.password}
                    required
                    onChange={(e) => handlechange('password' , e.target.value)}
                />
                <label htmlFor="password">Verify password</label>
                <Input 
                    type="password"
                    placeholder="verify password"
                    value={registerInfo.password_verify}
                    required
                    onChange={(e) => handlechange('password_verify' , e.target.value)}
                />
            </>
        )
    }

    if(step === STEPS.IMAGE) {
        body = (
            <>
                <div className="w-28 h-28 drop-shadow-xl">
                    <Avatar 
                        imageSrc={userImage} 
                    />
                </div>
                <label htmlFor="password">Profile image (optional)</label>
                <Input 
                    type="file"
                    placeholder="password"
                    onChange={(e) => handleUploadImage(e.target.files)}
                />
            </>
        )
    }

    if(step === STEPS.EXTRA_INFO){
        body = (
            <>
                <label htmlFor="number">Number (optional)</label>
                <Input 
                    type="number"
                    placeholder="Number"
                />
                <label htmlFor="address">Address (optional)</label>
                <Input 
                    type="text"
                    placeholder="Address"
                />
                <label htmlFor="city">City (optional)</label>
                <Input 
                    type="text"
                    placeholder="City"
                />
            </>
        )
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <Card>
                <div className="flex flex-row items-center gap-2">
                    <img src="/MS.svg" alt="ms logo" className="w-10" />
                    <h2 className="font-bold text-xl">Welcome to Manishop</h2>
                </div>
                <hr />
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {body}
                    {registerError && <p className="text-red-500 text-sm">{registerError}</p>}
                    {buttons}
                </form>
                <hr />
                {footer}
            </Card>
        </div>
    )
}