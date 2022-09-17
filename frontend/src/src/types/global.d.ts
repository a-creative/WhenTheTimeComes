interface TableData {
    id?: number;
}

enum ELoading {
    idle,
    loading,
    loaded,
    failed,
}

interface SubMenuRouteTarget {
    routeName: string,
    label: string
}