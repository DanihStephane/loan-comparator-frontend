import { cn } from "@/lib/utils"
import { spacing } from "@/styles/spacing"

export function Container({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        spacing.layout.container,
        className
      )}
      {...props}
    />
  )
}
