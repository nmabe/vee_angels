/* eslint-disable react/prop-types */
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, LayoutDashboard, Leaf, Rotate3d,  UserCog2 } from "lucide-react"
import { Sheet, SheetTitle, SheetContent, SheetHeader } from "../ui/sheet";


const adminSidebarItems = [
  {
      id: "dashboard",
      label: "Dashboard",
      path: "/admin/dashboard",
      icon : <LayoutDashboard/>,
  },
  {
      id: 'angels',
      label: 'Angels',
      path: '/admin/angels',
      icon : <Leaf />,
  },
  {
      id: "users",
      label: "Users",
      path: "/admin/Users",
      icon: <UserCog2 />,
  },
  {
      id: "features",
      label: "Features",
      path: "/admin/features",
      icon: <Rotate3d />,
  }
];

const MenuItems = ({open, setOpen}) => {
  const navigate = useNavigate();

  
  return (<nav className="mt-8 flex-col flex gap-2">
    {
      adminSidebarItems.map((item) => (
        <div key={item.id} onClick={() => {
            navigate(item.path)
            open ? setOpen(!open) : null;
          }} className="flex items-center gap-2 py-2 px-3 rounded-md text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer">
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
  </nav>);
}

export default function AdminSidebar({open, setOpen}) {
  const navigate  = useNavigate();

  return (
    <Fragment>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side='left' className="w-64" >
            <div className="flex flex-col h-full">
              <SheetHeader className='border-b'>
                <SheetTitle className='flex gap-2 mb-5 mt-5 '>
                <div onClick={() => navigate('/admin/dashboard')} className="flex cursor-pointer items-center gap-2 py-4 px-4">
                <ShieldAlert size={30}/>
                  <h1 className="text-xl font-extrabold">Admin Panel</h1>
                </div>
                </SheetTitle>
                </SheetHeader>
                <MenuItems open={open} setOpen={setOpen}/>

            </div>
          </SheetContent>
        </Sheet>
      <aside className="hidden flex-col w-64 border-r bg-background p-6 lg:flex">
        <div onClick={() => navigate('/admin/dashboard')} className="flex cursor-pointer items-center gap-2 py-4 px-4">
        <ShieldAlert size={30}/>
          <h1 className="text-xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems open={open} setOpen={setOpen} />
      </aside>
    </Fragment>
  )
}
