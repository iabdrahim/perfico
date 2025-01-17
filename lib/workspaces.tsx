"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { ISelector } from "@/components/Selector";

export interface IWorkspace {
  urls: string;
  template: ISelector[];
  data: string;
  isPuppetter: boolean;
}

export const WorkspaceContext = createContext<{
  workspaces: IWorkspace[];
  setWorkspaces: (w: IWorkspace[]) => void;
  isSideBarMax: boolean;
  setSideBar: (w: boolean) => void;
}>({
  workspaces: [{ urls: "", template: [], data: "", isPuppetter: false }],
  setWorkspaces: (w) => {},
  setSideBar: (v) => {},
  isSideBarMax:true,
});

export const WorkspaceProvider = ({ children }: { children: any }) => {
    let [isSideBarMax, setSideBar] = useState(true);

  let [workspaces, setWorkspaces] = useState<IWorkspace[]>([
    { urls: "https://exemple.com", template: [], data: "", isPuppetter: false },
  ]);
  let [localIsLoaded, setlocalIsLoaded] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("workspaces") != null) {
      let data = JSON.parse(localStorage.getItem("workspaces") as string);
      setWorkspaces(data);
    }
    setlocalIsLoaded(true);
  }, []);
  useEffect(() => {
    if (localIsLoaded) {
      let data = JSON.stringify(workspaces);
      localStorage.setItem("workspaces", data);
    }
  }, [workspaces, setWorkspaces]);

  return (
    <>
      <WorkspaceContext.Provider value={{ workspaces, setWorkspaces,isSideBarMax,setSideBar }}>
        {children}
      </WorkspaceContext.Provider>
    </>
  );
};
export const WorkspaceConsumer = WorkspaceContext.Consumer;

export const useWorkspace = () => useContext(WorkspaceContext);
