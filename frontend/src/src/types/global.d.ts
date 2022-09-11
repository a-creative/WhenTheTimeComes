interface TableData {
    id?: number;
}
interface Tag extends TableData {
    name: string,
    category_id?: number,
}

interface TagCategory extends TableData {
    name: string,
}

enum ELoading {
    idle,
    loading,
    loaded,
    failed,
}

interface IMemberUpdatePostItem {
    username: string,
    name?: string,
    pronouns?: string
}

interface SubMenuRouteTarget {
    routeName: string,
    label: string
}