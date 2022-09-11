interface Post extends TableData {
    title: string,
    sourceId: number,
}

interface PostCsvImportData {
    csvText: string
}