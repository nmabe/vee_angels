import react, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { Menu, User, LogOut, Heart, LogInIcon, Info } from 'lucide-react'
import { angelHeaderMenuItems } from '@/config'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { signOutUser } from '@/store/auth-slice'
import FullPageDialog from './FullPageDialog'
import HelpContent from './dialogs/HelpContent'

const MenuNavSections = () => {
  return (
    <div className="flex flex-col gap-4 mb-3 lg:mb-0 lg:items-center lg:flex-row">
      {/*   angelHeaderMenuItems.map((section, index) =>  <Link key={index} to={section.link} className="text-sm font-medium hover:font-semibold hover:text-[#892f82]">{section.label}</Link>
    ); */}
    </div>
  )
}

const RightMenuNavSection = () => {
  return (
    <div className="flex h-16 items-center justify-between px-4      md:px-6">
      <Link
        className="flex items-center gap-1 hover:text-[#892f82] block bg-[#892f82] px-4 py-2 rounded-[30px]"
        to="/auth/signIn"
      >
        <LogInIcon className="h-6 w-6 text-white" />
        <span className="sr-only">Sign In</span>
        <span className="text-[15px] text-white hover:text-black font-bold ml-1">
          Sign In
        </span>
      </Link>
    </div>
  )
}

const RightUserMenuNavSection = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return isAuthenticated && user ? (
    <div className="flex flex-col gap-4 mb-3 lg:mb-0 lg:items-center lg:flex-row">
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate('/angels/faves')}
      >
        <Heart className="h-6 w-6" />
        <span className="sr-only">User Account</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-11 w-11">
            <AvatarImage
              src={
                user?.profPic ||
                'https://res.cloudinary.com/dddjh584x/image/upload/v1775337043/veeAngelsLogo-bg_pjb29t.png'
              }
            />
            <AvatarFallback>
              {user?.username?.[0]?.toUpperCase() || 'V'}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 hover:text-[#892f82]">
          <DropdownMenuLabel>Logged in as {user.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => navigate('/angels/account')}>
              <User />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => dispatch(signOutUser())}>
            <LogOut />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <RightMenuNavSection />
  )
}

export default function AngelHeader() {
  const { user, isAuthenticated } = useSelector((state) => state.auth)
  const [helpOpen, setHelpOpen] = useState(false)

  useEffect(() => {
    function onKey(e) {
      if (e.key === '?' || (e.key === '/' && e.shiftKey)) {
        setHelpOpen(true)
      }
      if (e.key === 'Escape') setHelpOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="fixed top-[25px] z-50 bg-background shadow-md border border-gray-200 w-[95%] ml-2 mr-2 mb-10 rounded-[30px] lg:w-[98%]">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          className="flex items-center gap-0 hover:text-[#892f82]"
          to="/angels/home"
        >
          <Avatar className="h-14 w-14">
            <AvatarImage src="https://res.cloudinary.com/dddjh584x/image/upload/v1778347938/veeAngelsLogo-bg_su3osc.png" />
            <AvatarFallback>V-A</AvatarFallback>
          </Avatar>
          <span className="text-[28px] font-extrabold ml-1 font-sans italic font-stretch-expanded tracking-tighter capitalize">
            Vee Angels
          </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="lg:hidden rounded-[25px] "
              size="icon"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pt-20 w-full max-w-xs">
            <div>
              <RightUserMenuNavSection />
            </div>
            <hr className="h-1 w-[90%] self-center bg-gray-300 m-2 rounded" />
            <MenuNavSections />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuNavSections />
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <Info
            onClick={() => setHelpOpen(true)}
            className="text-sm font-medium hover:text-[#892f82] hover:cursor-pointer"
          />
          <div className="hidden lg:block">
            <RightUserMenuNavSection />
          </div>
        </div>
      </div>
      <FullPageDialog
        isOpen={helpOpen}
        onClose={() => setHelpOpen(false)}
        title="Help Center"
      >
        <HelpContent />
      </FullPageDialog>
    </div>
  )
}
