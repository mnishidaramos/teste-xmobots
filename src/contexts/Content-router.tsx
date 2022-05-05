import React from "react";
import { createContext, ReactNode, useEffect, useState } from "react";

type PageContextData = {
    user: string;
    setUser: (user: string) => void;
    page: string;
    setPage: (page: string) => void;
    signIn: () => void;
    signOut: () => void;
}

export const PageContext = createContext({} as PageContextData);

type PageProvider = {
    children: ReactNode;
}

export function PageProvider(props: PageProvider) {
    const [user, setUser] = useState('');
    const [page, setPage] = useState('index');

    /* 
        Função será chamada quando o usuário logar e estiver
        selecionada a opção de memorização
    */
    function signIn() {
        localStorage.setItem('@testeXmobots:user', user);
    }

    function signOut() {
        setUser('');
        localStorage.removeItem('@testeXmobots:user');
    }

    return (
        <PageContext.Provider
            value={{
                user,
                setUser,
                page,
                setPage,
                signIn,
                signOut
            }}
        >
            {props.children}
        </PageContext.Provider>
    )
}