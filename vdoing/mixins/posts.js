import { filterPosts, sortPosts, sortPostsByDate, groupPosts, categoriesAndTags } from '../util/postData'

export default {
  computed: {
    $filterPosts () { // 过滤非文章页和首页的文章数据
      const data = this.$site.pages.filter(item=>item.relativePath.indexOf('codes') === -1)
      return filterPosts(data)
    },
    $sortPosts () { // 按置顶和时间排序的文章数据
      return sortPosts(this.$filterPosts)
    },
    $sortPostsByDate () { // 仅按时间排序的文章数据
      return sortPostsByDate(this.$filterPosts)
    },
    $groupPosts () { // 按分类和标签分组的文章数据
      return groupPosts(this.$sortPosts)
    },
    $categoriesAndTags () { // 所有分类和标签数据
      return categoriesAndTags(this.$groupPosts)
    }
  }
}
