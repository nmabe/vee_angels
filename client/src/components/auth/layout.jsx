import { Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AuthLayout = ()  => {
    return (
        <div className="flex min-h-screen w-full">
            <div className="hidden lg:flex justify-center items-center bg-black w-1/2 px-12">
            <div className="max-w-md space-y-6 text-center text-primary-foreground">

            <Avatar className="mx-auto w-[250px] h-[250px]">
                <AvatarImage  src="https://res.cloudinary.com/dddjh584x/image/upload/v1775337043/veeAngelsLogo-bg_pjb29t.png" />
                    <AvatarFallback>V-A</AvatarFallback>
                </Avatar>

                    <h1 className="text-5xl font-extrabold tracking-tight">
                        Welcome to Vee&lsquo;s Angels
                    </h1>
                    <h2 className="text-secondary font-bold">get yo freaki on ah!</h2>
                </div>
            </div>
            <div className="flex flex-1 justify-center items-center bg-background px-4 py-12 sm:px-6 lg:px-8">
                    <Outlet />
                </div> 
        </div>
    );
}

export default AuthLayout;

// compose 10 seductive and sexy bio message for a dating app profile

/*

"Catch me sipping wine by candlelight—care to join me for a taste of something irresistible?"

"Silk sheets, soft whispers, and a wild side—think you can keep up?"

"I’m the spark you didn’t know you needed. Let’s ignite something unforgettable."

"Flirty eyes and a dangerous smile—meet me halfway and let’s break all the rules."

"I’ve got a secret talent for making hearts race. Want a private demonstration?"

""

""

*/