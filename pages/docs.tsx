import dynamic from "next/dynamic";

//This is a placeholder page so that we can track redirects to our notion site
const Docs = (props: any) => {
    window.location.href = 'https://readmefirst.notion.site/readmefirst/README-8d4f8cb3b9c64b8baabc5d58b42f8194';
    return <div className="h-screen w-screen flex items-center justify-center text-2xl font-semibold">Redirecting to Notion...</div>
}

export default dynamic(() => Promise.resolve(Docs), {
    ssr: false
})