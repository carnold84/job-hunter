import { Link, Outlet, useSearchParams } from "react-router-dom";

import toSentenceCase from "../../utils/toSentenceCase";

const Root = () => {
  const [searchParams] = useSearchParams();
  const filters = searchParams.get("filter");

  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="fixed top-0 z-10 flex h-14 w-full items-center justify-between border-b border-solid border-gray-200 bg-white">
        <h1 className="ml-5 text-2xl">Job Hunter</h1>
        <Link
          className="flex h-full items-center bg-orange-600 px-10 text-center text-white hover:bg-orange-700"
          to={"?modals=new"}
        >
          New
        </Link>
      </header>
      <aside className="fixed left-0 top-0 h-screen w-52 border-r border-solid border-gray-200 pt-14">
        <ul className="grid">
          {["all Jobs", "active", "applied", "expired"].map((item) => {
            return (
              <li key={item}>
                <Link
                  className={`flex h-14 items-center border-l-4 px-4 text-base ${
                    (item === "all Jobs" && !filters) || filters?.includes(item)
                      ? "border-orange-600"
                      : "border-transparent"
                  }`}
                  to={item === "all Jobs" ? "/" : `?filter=${item}`}
                >
                  {toSentenceCase(item)}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <main className="grow pl-52 pt-14">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
