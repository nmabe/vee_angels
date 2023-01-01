import { Button } from "@/components/ui/button"
import { signOutUser } from "@/store/auth-slice";
import { AlignJustify, LogOut } from "lucide-react"
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";



export default function AdminHeader({setOpen}) {
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signOutUser()).then((data) => {
      if (data?.payload?.success) {
        console.log('Signed out successfully');
      }else {
        toast.warning({
          title: 'There was a problem processing your request',
          description: 'Please try to signout again..',
          variant: 'destructive'
        });
      }
    });
  }

  return (
    <header className='flex items-center justify-between px-4 py-3 bg-background border-b'>
      <Button className='lg:hidden sm:block' onClick={() => setOpen(true)}>
      <AlignJustify />
      <span className="sr-only">Toggle Menu</span>
      </Button>

      
      <div className="flex flex-1 justify-end">
        <Button onClick={onSubmit} className='inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow'>
        <LogOut />
          signout</Button>
      </div>
    </header>
  )
}
