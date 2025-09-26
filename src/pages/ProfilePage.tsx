import { useUserProfile } from "../hooks/useUserProfile"



export default function ProfilePage(){
    const userProfile = useUserProfile();

    return(<div className="m-20 justify-center flex flex-col">
            <h1 className="text-3xl text-center mb-10">Your information:</h1>
            <p className="inline text-center m-3">Name: <p className="text-center inline text-xl">{userProfile?.name}</p></p>
            <p className="inline text-center m-3">Email: <p className="text-center inline text-xl">{userProfile?.email}</p></p>
            <p className="inline text-center m-3">Phone number: <p className="text-center inline text-xl">{userProfile?.phone}</p></p>
        </div>
    )
}