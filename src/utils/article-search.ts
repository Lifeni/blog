class ArticleSearch {
  private documents: ArticleFrontmatterGraphQL[] = []
  constructor(documents: ArticleFrontmatterGraphQL[]) {
    this.documents = documents
  }

  search(text: string): ArticleFrontmatterGraphQL[] {
    if (!text.trim()) return this.documents

    const [prefix, target] = text.split(/:|：/)
    if (target?.trim()) {
      switch (prefix.trim().toLowerCase()) {
        case "标题":
        case "title": {
          return this.documents.filter(document =>
            document.title
              .trim()
              .toLowerCase()
              .includes(target.trim().toLowerCase())
          )
        }

        case "描述":
        case "description":
        case "desc": {
          return this.documents.filter(document =>
            document.description
              .trim()
              .toLowerCase()
              .includes(target.trim().toLowerCase())
          )
        }

        case "日期":
        case "时间":
        case "date": {
          const [year, month, day] = target.split(/\.|。/)
          let query = `${year}`

          if (month?.trim()) {
            query = `${year} 年 ${month}`
            if (day?.trim()) query = `${year} 年 ${month} 月 ${day}`
          }
          return this.documents.filter(document => {
            return document.date.trim().toLowerCase().startsWith(query)
          })
        }
      }
    }
    return this.documents.filter(document =>
      JSON.stringify(document)
        .trim()
        .toLowerCase()
        .includes(text.trim().toLowerCase())
    )
  }
}

export default ArticleSearch
