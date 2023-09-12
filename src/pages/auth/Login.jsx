import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";
import { useRequest } from "../../hooks/useRequest";
import { useMemo, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { toast } from "react-hot-toast";

const initialState = {
    username_email: '',
    password: '',
    email: '',
    code: '',
    new_passrowd: '',
    verify_new_password: ''
}

const STEPS = {
    LOGIN: 0,
    FORGET_PASSWORD: 1,
    INSERT_CODE: 2,
    INSERT_PASSWORD: 3
}

export default function Login () {
    
    const navigate = useNavigate();
    const {
        formData: loginInfo ,
        handleChange: handlechange, 
        resetForm: handleReset
    } = useForm(initialState);
    
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(isLoading) return;

        if(step === STEPS.LOGIN){
            if(!loginInfo.username_email || !loginInfo.password){
                setLoginError('Fields are required!')
                return;
            }
            setIsLoading(true)
            const data = {
                username_email: loginInfo.username_email,
                password: loginInfo.password
            }
            const responseData = await useRequest.post(data, '/login/user_login.php');
            setIsLoading(false)
            if(responseData.error){
                setLoginError(responseData.error);
                return;
            }
            handleReset(initialState);
            document.cookie = `ms_user_token=${responseData.user_token}; expires=${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
            navigate(0)
        }

        if(step === STEPS.FORGET_PASSWORD){
            if(!loginInfo.email) return;
            setIsLoading(true)
            const data = {
                email: loginInfo.email
            }
            const responseData = await useRequest.post(data, '/forget_password/check_email.php');
            setIsLoading(false)
            if(responseData.error) return;
        }

        if(step === STEPS.INSERT_CODE){
            if(!loginInfo.code) return;
            setIsLoading(true)
            const data = {
                email: loginInfo.email,
                code: loginInfo.code
            }
            const responseData = await useRequest.post(data, '/forget_password/check_code.php');
            setIsLoading(false)
            if(responseData.error) return;
        }
        
        if(step !== STEPS.INSERT_PASSWORD && step !== STEPS.LOGIN) {
            setStep(prev => prev + 1)
        }

        if(step === STEPS.INSERT_PASSWORD) {
            if(!loginInfo.new_passrowd || !loginInfo.verify_new_password) return;
            if(loginInfo.new_passrowd !== loginInfo.verify_new_password) return;
            setIsLoading(true)
            const  data = {
                email: loginInfo.email,
                password: loginInfo.new_passrowd
            }
            const responseData = await useRequest.post(data, '/forget_password/update_password.php')
            setIsLoading(false)
            if(responseData.error) return;
            handleReset(initialState);
            toast.success('password updated.')
            navigate('/login')
        }
    }

    let content;
    let body;

    
    const buttons = (
        <div className="flex flex-row gap-2">
            {secondaryLabel && 
            <Button 
                disabled={isLoading}
                onClick={() => setStep(prev => prev - 1)}
                outline
            >
                {secondaryLabel}
            </Button>}
            <Button 
                type={'submit'}
                disabled={isLoading}
            >
                {primaryLabel}
            </Button>
        </div>
    )
    
    const footer = (
        <div className="flex flex-row gap-2 items-center">
            <span>New on Manishop ?</span>
            <Link className="text-secondary" to={'/register'}>Register</Link>
        </div>
    )

    const header = (
        <div className="flex flex-row items-center gap-2">
            <img src="/MS.svg" alt="ms logo" className="w-10" />
            <h2 className="font-bold text-xl">Welcome back to Manishop</h2>
        </div>
    )

    if(step === STEPS.LOGIN){
        body = (
            <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <label htmlFor="username">Username or Email</label>
                <Input 
                    type="text"
                    placeholder="username or email"
                    value={loginInfo.username_email}
                    required
                    onChange={(e) => handlechange('username_email' , e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <Input 
                    type="password"
                    placeholder="password"
                    value={loginInfo.password}
                    required
                    onChange={(e) => handlechange('password' , e.target.value)}
                />
                <div 
                    onClick={() => setStep(prev => prev + 1)}
                    className="hover:underline cursor-pointer w-fit"
                >
                    Forget password
                </div>
                {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                {buttons}
            </form>
            </>
        )
    }


    if(step === STEPS.LOGIN){
        content = (
            <>
                {header}
                <hr />
                {body}
                <hr />
                {footer}
            </>
        )
    }

    if(step === STEPS.FORGET_PASSWORD) {
        content = (
            <>
                {header}
                <hr />
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label htmlFor="email">Email</label>
                    <Input 
                        type="email"
                        placeholder="insert your email"
                        value={loginInfo.email}
                        required
                        onChange={(e) => handlechange('email' , e.target.value)}
                    />
                    {buttons}
                </form>
            </>
        )
    }

    if (step === STEPS.INSERT_CODE){
        content = (
            <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label htmlFor="code">Code</label>
                    <Input 
                        type="text"
                        placeholder="insert your code"
                        value={loginInfo.code}
                        required
                        onChange={(e) => handlechange('code' , e.target.value)}
                    />
                    {buttons}
                </form>
            </>
        )
    } 

    if (step === STEPS.INSERT_PASSWORD) {
        content = (
            <>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <label htmlFor="password">New password</label>
                    <Input 
                        type="password"
                        placeholder="password"
                        value={loginInfo.new_passrowd}
                        required
                        onChange={(e) => handlechange('new_passrowd' , e.target.value)}
                    />
                    <label htmlFor="password">Verify password</label>
                    <Input 
                        type="password"
                        placeholder="verify password"
                        value={loginInfo.verify_new_password}
                        required
                        onChange={(e) => handlechange('verify_new_password' , e.target.value)}
                    />
                    {buttons}
                </form>
            </>
        )
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <Card>
                {content}
            </Card>
        </div>
    )
}