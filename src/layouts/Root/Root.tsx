import { Link, Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-100">
      <header className="fixed top-0 z-10 flex h-14 w-full items-center justify-between bg-white">
        <h1 className="ml-5 text-2xl">Job Hunter</h1>
        <Link
          className="flex h-full items-center bg-orange-600 px-10 text-center text-white hover:bg-orange-700"
          to={"?modals=job&action=create"}
        >
          New
        </Link>
      </header>
      <main className="relative min-h-screen pt-14">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
