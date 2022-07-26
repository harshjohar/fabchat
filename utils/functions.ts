import { NextRouter } from "next/router"

export const redirectToLogin = (router: NextRouter) => {
    router.push('/login')
}