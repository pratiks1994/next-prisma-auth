"use client"

import { Button } from "@/components/ui/button"
import {useFormStatus} from "react-dom"

function LogoutBtn() {
     const { pending  } = useFormStatus()

  return (
    <Button type="submit" variant="ghost" disabled={ pending }>{ pending  ? "logging out...":"Logout"}</Button>
  )
}

export default LogoutBtn