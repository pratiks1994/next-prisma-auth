"use client"

import { Button } from "@/components/ui/button"
import {useFormStatus} from "react-dom"

function ActionBtn({className,lable,pendingLable,variant}) {
     const { pending  } = useFormStatus()

  return (
    <Button type="submit" variant={variant || "default"} className={className} disabled={ pending }>{ pending  ? pendingLable:lable}</Button>
  )
}

export default ActionBtn