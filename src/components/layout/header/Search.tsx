import { RiSearchLine } from "react-icons/ri"
import Button from "../../app/common/base/Button"

const Search = () => {
  return (
    <Button data-name="未完成" disabled>
      <RiSearchLine aria-label="搜索图标" />
    </Button>
  )
}

export default Search
