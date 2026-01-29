
import WeekList from "@/components/WeekList"

export default async function Week(props: PageProps<'/dashboard/week/[week]'>) {
    const { week: slug } = await props.params;

    return (
        <>
            <div className="container mx-auto p-6 bg-white shadow-sm rounded-md">
                <WeekList week={slug} />
            </div>
        </>
    )

}