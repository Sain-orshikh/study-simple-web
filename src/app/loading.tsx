import Loader from "@/components/ui/loader"

export default function Loading() {
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <Loader 
        size="large" 
        text="Loading content..." 
      />
    </div>
  )
}