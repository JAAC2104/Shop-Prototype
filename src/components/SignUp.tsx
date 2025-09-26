import { type FormEvent, useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { NavLink, useNavigate } from "react-router-dom";

export default function SignUp(){
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(!nameRef.current || !emailRef.current || !phoneNumberRef.current || !passwordRef.current || !passwordConfirmRef.current) return

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError("Passwords do not match");
        }

        const signUpObject = {email: emailRef.current?.value, password: passwordRef.current?.value, name: nameRef.current?.value, phone: phoneNumberRef.current?.value}
        
        try{
            setError("")
            setLoading(true);
            await signUp(signUpObject);
            navigate("/", { replace: true})
        } catch{
            setError("Failed to create an account")
        }

        setLoading(false);
    }
    
    return (<>
        <div className="mt-20 mx-auto bg-amber-300 w-[300px] lg:w-lg p-5 rounded-lg shadow-md">
            <h2 className="text-center text-2xl">Sign Up</h2>
            {error && <div className="text-center bg-red-200 border-2 border-red-500 rounded-md p-2 mt-5 w-[300px] mx-auto">{error}</div>}
            <form className="flex flex-col p-5 gap-3" onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" className="bg-amber-400 border-2 border-slate-800 rounded-md px-1" ref={nameRef} />
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" className="bg-amber-400 border-2 border-slate-800 rounded-md px-1" ref={emailRef} />
                <label htmlFor="phoneNumber">Phone Number: </label>
                <input type="number" id="phoneNumber" className="bg-amber-400 border-2 border-slate-800 rounded-md px-1" ref={phoneNumberRef} />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" className="bg-amber-400 border-2 border-slate-800 rounded-md px-1" ref={passwordRef} />
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input type="password" id="confirmPassword" className="bg-amber-400 border-2 border-slate-800 rounded-md px-1" ref={passwordConfirmRef} />
                <button type="submit" disabled={loading} className={`mt-10 mx-auto border-2 border-slate-800 w-[120px] h-[40px] rounded-md text-md ${loading ? "bg-neutral-400" : "bg-amber-400 hover:bg-amber-500 cursor-pointer"}`}>Sign Up</button>
            </form>
        </div>
        <div className="m-2 mx-auto w-[300px] lg:w-lg p-5 flex justify-center gap-3">
            <span>Already have an account?</span>
            <NavLink to="/log-in" className="underline hover:text-amber-500">Log in</NavLink>
        </div>
    </>)
}