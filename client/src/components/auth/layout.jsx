import { Outlet } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex justify-center items-center bg-black w-1/2 px-12">
        <div className="max-w-md space-y-6 text-center text-primary-foreground">
          <Avatar className="mx-auto w-[250px] h-[250px]">
            <AvatarImage src="https://res.cloudinary.com/dddjh584x/image/upload/v1778347938/veeAngelsLogo-bg_su3osc.png" />
            <AvatarFallback>V-A</AvatarFallback>
          </Avatar>

          <h1 className="text-5xl font-extrabold tracking-tight">
            Welcome to Vee&lsquo;s Angels
          </h1>
          <h2 className="text-secondary font-bold">get yo freaky on ahhhhh...</h2>
        </div>
      </div>
      <div className="flex flex-1 justify-center items-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout

// compose 10 seductive and sexy bio message for a dating app profile

/*
"Flirty by nature, dangerous by choice. I’ll ruin your sleep in the best way possible… care to find out how?"

"Soft lips, wicked mind, and a body that knows how to keep secrets. Let’s create some together."

"I don’t do boring. I do late nights, slow touches, and conversations that start innocent and end breathless."

"Your favorite kind of trouble. Sultry eyes, sinful smile, and zero intention of behaving."

"Seduction is my love language. Come closer… I want to whisper the rest against your skin."

"Part angel, mostly temptation. I’ll make you laugh, then make you forget your own name."

"Looking for someone who can match my energy between the sheets and between deep conversations."

"Curves that demand attention and a tongue that always gets what it wants. Think you can handle both?"

"I taste like trouble and feel like heaven. Swipe right if you’re brave enough to take a bite."

"Let’s skip the small talk. I want stolen kisses, wandering hands, and mornings where we don’t want to leave the bed."

"Catch me sipping wine by candlelight—care to join me for a taste of something irresistible?"

"Silk sheets, soft whispers, and a wild side—think you can keep up?"

"I’m the spark you didn’t know you needed. Let’s ignite something unforgettable."

"Flirty eyes and a dangerous smile—meet me halfway and let’s break all the rules."

"I’ve got a secret talent for making hearts race. Want a private demonstration?"

""

""

*/
