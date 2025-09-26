import { type FormEvent, useRef, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { NavLink, useNavigate } from "react-router-dom";

export default function LogIn(){
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { logIn } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();

        if(!emailRef.current || !passwordRef.current) return
        
        try{
            setError("")
            setLoading(true);
            await logIn(emailRef.current?.value, passwordRef.current?.value);
            navigate("/", { replace: true})
        } catch{
            setError("Invalid credentials")
        }

        setLoading(false);
    }
    
    return (<>
        <div className="mt-20 mx-auto bg-amber-300 w-[300px] lg:w-lg p-5 rounded-lg shadow-md">
            <h2 className="text-center text-2xl">Log In</h2>
            {error && <div className="text-center bg-red-200 border-2 border-red-500 rounded-md p-2 mt-5 w-[200px] mx-auto">{error}</div>}
            <form className="flex flex-col p-5 gap-3" onSubmit={handleSubmit}>
                <label htmlFor="email">Email: </label>
                <input type="email" id="email" className="bg-amber-400 border-2 border-slate-800 rounded-md px-1" ref={emailRef} />
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" className="bg-amber-400 border-2 border-slate-800 rounded-md px-1" ref={passwordRef} />
                <button type="submit" disabled={loading} className={`mt-10 mx-auto border-2 border-slate-800 w-[120px] h-[40px] rounded-md text-md ${loading ? "bg-neutral-400" : "bg-amber-400 hover:bg-amber-500 cursor-pointer"}`}>Log In</button>
            </form>
        </div>
        <div className="m-2 mx-auto w-[300px] lg:w-lg p-5 flex justify-center gap-3">
            <span>Don't have an account?</span>
            <NavLink to="/sign-up" className="underline hover:text-amber-500">Sign up</NavLink>
        </div>
    </>)
}