import Loader from "@/components/ui/loader"

export default function BlogsLoading() {
  return (
    <div className="flex flex-col h-[80vh] items-center justify-center p-6">
      <Loader
        size="large"
        text="Loading blogs..."
        color="#5f2995"
      />
    </div>
  )
}