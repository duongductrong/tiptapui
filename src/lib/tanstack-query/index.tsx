"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental"
import * as React from "react"
import { getQueryClient } from "./query-client"

/**
 * Configuration for Tanstack Query
 * 
 * For more information, visit:
 * https://tanstack.com/query/latest/docs/framework/react/guides/suspense
 */


/**
 * TanstackQueryProviders component
 * 
 * This component sets up the QueryClientProvider and ReactQueryStreamedHydration
 * for Tanstack Query. It initializes the query client and provides it to the
 * QueryClientProvider, which makes it available to the rest of the application.
 * 
 * @param {React.PropsWithChildren} props - The properties passed to the component,
 * including any child components.
 * 
 * @returns {JSX.Element} The QueryClientProvider and ReactQueryStreamedHydration
 * wrapped around the child components.
 */
export function TanstackQueryProviders(props: React.PropsWithChildren) {
  // NOTE: Avoid useState when initializing the query client if you don't
  //       have a suspense boundary between this and the code that may
  //       suspend because React will throw away the client on the initial
  //       render if it suspends and there is no boundary
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {props.children}
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  )
}

/**
 * TanstackQueryClientProvider component
 * 
 * This component is a wrapper around the TanstackQueryProviders component.
 * It provides the QueryClientProvider and ReactQueryStreamedHydration to
 * the child components.
 * 
 * @param {React.PropsWithChildren} props - The properties passed to the component,
 * including any child components.
 * 
 * @returns {JSX.Element} The TanstackQueryProviders wrapped around the child components.
 */
export function TanstackQueryClientProvider(props: React.PropsWithChildren) {
  return <TanstackQueryProviders>{props.children}</TanstackQueryProviders>
}
