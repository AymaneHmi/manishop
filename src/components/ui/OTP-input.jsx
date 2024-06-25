import { useEffect, useRef, useState } from "react";
import Input from "./input";

export default function OTPInput ({length, pattern, onComplete}) {

    const lenghtArray = new Array(length).fill(null) || [];
    const [OTP, setOTP] = useState(['']);

    const inputRef = useRef([])

    const handleTextChange = (input, index) => {
        const newPin = [...OTP];
        newPin[index] = input;
        setOTP(newPin);    
    
        if (input.length === 1 && index < length - 1) {
          inputRef?.current?.[index + 1]?.focus();
        }
    
        if (input.length === 0 && index > 0) {
          inputRef?.current?.[index - 1]?.focus();
        }    
    
        if (newPin.every((digit) => digit !== '')) {
          onComplete?.(newPin.join(''));
        }
    }

    useEffect(() => {
        inputRef.current = inputRef.current.slice(0, length);
    }, [length]);

    return (
        <div className="flex flex-row gap-2 w-fit mx-auto">
            {lenghtArray?.map((_, index) => (
                <Input
                    key={index}
                    type={"text"}
                    className={"w-10"}
                    pattern={pattern}
                    maxLength={1}
                    value={OTP?.[index]}
                    onChange={(e) => handleTextChange(e.target.value.toUpperCase(), index)}
                    ref={(el) => inputRef.current[index] = el}
                />
            ))}
        </div>
    )
}