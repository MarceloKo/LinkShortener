import { createBrowserRouter, RouterProvider } from "react-router"
import PageLinkView from "../pages/link-redirect"
import PageLinkRegistration from "../pages/link-registration"
import PageNotFound from "../pages/not-found"

export default function AppRoutes() {
    const router = createBrowserRouter([
        { path: '/', element: <PageLinkRegistration /> },
        { path: '/:short-url', element: <PageLinkView /> },
        { path: '*', element: <PageNotFound /> },
    ])

    return <RouterProvider router={router} />
}
