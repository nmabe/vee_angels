import { Outlet } from 'react-router-dom';
import AdminHeader from './header';
import AdminSidebar from './sidebar';
import { useState } from 'react';

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

    return (
        <div className="flex min-h-screen w-full">
            {/* Side Bar */}
            < AdminSidebar open={open} setOpen={setOpen}/>
            <div className="flex flex-1 flex-col">
            {/* Header */}
            < AdminHeader setOpen={setOpen}/>
                <main className="flex-1 flex-col flex bg-muted/40 p-0 md:p-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;