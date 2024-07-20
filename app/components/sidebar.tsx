"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IoMdTrash } from "react-icons/io";
import { useWorkspace } from "../lib/workspaces";

export default function WorkSpaces() {
  let p = useSearchParams();
  let { workspaces, setWorkspaces } = useWorkspace();
  let addWorkSpace = () => {
    let temp = workspaces;
    temp.push({
      urls: "https://exemple.com",
      template: [],
      data: "",
      isPuppetter:false
    });
    setWorkspaces([...temp]);
  };
  let removeWorkSpace = (i: number) => {
    let temp = workspaces.filter((e, idx) => idx != i);
    setWorkspaces([...temp]);
  };
  return (
    <aside className="max-w-[250px] fixed left-0 top-0 py-4 px-2 w-full bg-gray-100 h-screen flex-col gap-4">
      <div className="logo flex flex-row gap-2 items-center">
        <Link href="/">
          <div className="logo">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              data-darkreader-inline-fill=""
              data-darkreader-inline-stroke=""
            >
              <path d="M253.98 16.568c-19.754.19-39.8 2.847-59.75 8.194-13.14 3.52-25.717 8.085-37.695 13.554-14.434-12.764-33.376-20.54-54.09-20.54-45.06 0-81.79 36.73-81.79 81.79 0 20.214 7.406 38.736 19.624 53.034C16.353 202.41 9.42 260.675 24.827 318.172c34.216 127.695 165.715 203.614 293.41 169.398 127.695-34.216 203.617-165.713 169.4-293.408C458.77 86.42 360.643 15.536 253.98 16.568zm4.598 18.653c44.993.432 88.104 14.7 123.996 39.7L182.04 80.74c-2.4-10.103-6.684-19.488-12.452-27.77 9.446-4.01 19.277-7.426 29.476-10.16 18.43-4.937 36.93-7.4 55.155-7.587 1.454-.015 2.907-.016 4.358-.002zm-156.133 1.235c34.965 0 63.112 28.146 63.112 63.11 0 34.967-28.147 63.11-63.112 63.11s-63.11-28.143-63.11-63.11c0-34.964 28.145-63.11 63.11-63.11zM407.793 95.39c9.687 9.122 18.59 19.158 26.562 30.024l-138.742-27.54 112.18-2.483zm-223.58 2.94l262.664 46.162c6.486 11.1 12.07 22.89 16.625 35.307L335.01 161.337l140.267 66.225c1.672 12.647 2.232 25.244 1.73 37.675L180.18 124.936c2.62-7.995 4.056-16.517 4.056-25.37 0-.414-.017-.823-.023-1.236zm-12.848 45.162l279.662 216.906c-7.326 13.688-16.084 26.596-26.136 38.49L266.616 265.26l129.13 162.26c-12.544 10.217-26.328 19.134-41.202 26.498l-203.78-288.536c8.147-5.99 15.14-13.455 20.602-21.99zM54.613 165.828c6.874 4.98 14.548 8.914 22.783 11.58L48.06 330.033c-1.928-5.45-3.66-11.017-5.183-16.697-13.694-51.107-8.327-102.78 11.736-147.508zm76.102 10.48L248.84 476.99c-19.05-.62-37.726-3.716-55.617-9.05l-51.33-154.96 2.472 133.698c-16.458-9.664-31.675-21.445-45.2-35.102L95.92 181.096c2.153.17 4.327.26 6.523.26 9.93 0 19.453-1.786 28.27-5.05zm171.98 34.81l170.47 87.068c-2.177 11.218-5.222 22.2-9.07 32.863l-161.4-119.93zM80.518 254.825l4.01 140.416c-9.004-11.115-16.992-23.196-23.786-36.142l19.776-104.274zm127.21 39.9L323.49 466.558c-3.323 1.06-6.683 2.054-10.088 2.966-9.395 2.518-18.81 4.384-28.197 5.64L207.73 294.726z"></path>
            </svg>
          </div>
        </Link>
        <div className="font-bold">
          <span className="text-amber-500">Ui</span>Scraper
        </div>
      </div>
      <div className="workspacs flex flex-col gap-2 w-full mt-12">
        <button
          className="rounded-lg bg-orange-300 px-4 py-2 text-sm"
          onClick={addWorkSpace}
        >
          Create new workspace
        </button>
        <h3 className="mb-2">Workspaces</h3>
        {workspaces.map((workspace, i) => (
          <Link
            href={"/?workspace=" + i}
            key={i}
            className={`workspace py-2 px-2 w-full justify-between items-center rounded-lg flex flex-row ${
              parseInt(p.get("workspace") || "0") == i ? "bg-orange-400" : ""
            }`}
          >
            <p className="text-ellipsis max-w-full text-nowrap overflow-hidden text-sm">
              {workspace.urls.substring(0, 50)}
            </p>
            <div className="actions flex gap-4 ml-2 items-center">
              <button
                onClick={() => removeWorkSpace(i)}
                className="bg-white p-1 rounded-lg hover:bg-red-500"
              >
                <IoMdTrash />
              </button>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
