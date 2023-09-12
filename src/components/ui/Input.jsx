
export default function Input (
    {
        value,
        onChange,
        defaultvalue,
        type,
        placeholder,
        required,
        pattern,
        disabled,
        className,
        textarea,
        rows,
        cols
    }) {

    if(textarea) {
        return (
            <textarea
                type={type} 
                value={value} 
                onChange={onChange} 
                defaultValue={defaultvalue} 
                placeholder={placeholder}
                required={required}
                pattern={pattern}
                disabled={disabled}
                className={`border rounded py-3 px-4 focus:outline-primary
                required:border-red-500
                invalid:border-red-500 dark:bg-dark-200 ${className}`}
                cols={cols} 
                rows={rows}
            >

            </textarea>
        )
    }
    return (
        <input 
            type={type} 
            value={value} 
            onChange={onChange} 
            defaultValue={defaultvalue} 
            placeholder={placeholder}
            required={required}
            pattern={pattern}
            disabled={disabled}
            className={`border rounded py-3 px-4 focus:outline-primary
            required:border-red-500
            invalid:border-red-500 dark:bg-dark-200 ${className}`}
        />
    )
}