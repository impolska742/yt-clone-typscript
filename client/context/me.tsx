import { Loader } from '@mantine/core'
import { createContext, ReactNode, useContext } from 'react'
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
    useQuery,
} from 'react-query'
import { getMe } from '../api'
import { Me, QueryKeys } from '../types'

const MeContext = createContext<{
    user: Me
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
    ) => Promise<QueryObserverResult<any, unknown>>
    // @ts-ignore
}>(null)

function MeContextProvider({ children }: { children: ReactNode }) {
    const { data, isLoading, refetch } = useQuery(QueryKeys.me, getMe)

    return (
        <MeContext.Provider value={{ user: data, refetch }}>
            {isLoading ? <Loader /> : children}
        </MeContext.Provider>
    )
}

const useMe = () => useContext(MeContext)

export { MeContextProvider, useMe }
