import { initializeServerApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import app from '@/lib/firebase/init'

export async function DELETE() {
    const authIdToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjkyODg2OGRjNDRlYTZhOThjODhiMzkzZDM2NDQ1MTM2NWViYjMwZDgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbmV4dGpzLWFwcC01NGJmZCIsImF1ZCI6Im5leHRqcy1hcHAtNTRiZmQiLCJhdXRoX3RpbWUiOjE3MzI1MjY4ODMsInVzZXJfaWQiOiJuU3NnQjdjMlRkYnZSWWZRaHg3eUlTNDA0QnIxIiwic3ViIjoiblNzZ0I3YzJUZGJ2UllmUWh4N3lJUzQwNEJyMSIsImlhdCI6MTczMjUyNjg4MywiZXhwIjoxNzMyNTMwNDgzLCJlbWFpbCI6ImhlcnJ5QHNhbmt5by5jby5pZCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJoZXJyeUBzYW5reW8uY28uaWQiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.CtShKwU6oH3gm3d5C0DMCl0Te6TX7RleSaJQzPsd__Lzcfs1QYgCO6FUHlGVQwuuQ7ZYG-Gmc2xHD0IC9FwMRV4Y-Kq8Arnz1yVFdBw0PJYXgRcS_XMOcColTbkjF9j14lK6biufcUUYY7OBuhqx4tuyDBbBPflGInS8mJUx13lmPMjdmhoSBhgT-YUOj2m2g2yMGv4Hfqqhqsi-X5BnxPdsPWUTcap3CJKwk1Y8VpSfsI_MztjnOdctK71fRcWdrl7qwV3xriEIMaR0yQ0UpHoQH4bHHsOL8pmEFagMk0VAp2PRGIKPCg16dqmmrWwxboiBQqS8KedQ4UwO95sFXA";

    const serverApp = await initializeServerApp(app, { authIdToken })
    try {
        const auth = await getAuth(serverApp)

        return Response.json(
            {
                auth
            },
            {
                status: 200, statusText: 'OK',
                headers: { 'content-type': 'application/json' }
            }
        )
    } catch (error) {
        return Response.json(
            {
                error
            },
            {
                status: 400, statusText: 'Credential invalid',
                headers: { 'content-type': 'application/json' }
            }
        )

    }




}