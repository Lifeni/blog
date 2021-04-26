import { RiArrowUpSLine } from "react-icons/ri"
import algoliasearch from "algoliasearch/lite"
import { Link } from "gatsby"
import React, { useEffect, useRef } from "react"
import {
  connectAutoComplete,
  Highlight,
  InstantSearch,
  PoweredBy,
  Snippet,
  Stats,
} from "react-instantsearch-dom"
import "./search.less"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

const Autocomplete = ({ hits, currentRefinement, refine }) => (
  <div className="search-box">
    <div className="input-bar">
      <input
        id="search-input"
        type="search"
        autoComplete="off"
        placeholder="在此输入搜索内容 ..."
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
        aria-label="Search"
      />
      <button id="close-search" title="关闭搜索窗口" aria-label="关闭搜索窗口">
        <RiArrowUpSLine aria-label="Close Icon" size={24} />
      </button>
    </div>

    <ul>
      <li className="tip-bar" tabIndex="-1">
        <Stats
          tabIndex="-1"
          translations={{
            stats(nbHits, timeSpentMS) {
              return `${nbHits} results | ${timeSpentMS} ms`
            },
          }}
        />
        <PoweredBy
          tabIndex="-1"
          translations={{
            searchBy: "",
          }}
        />
      </li>
      {hits.map((hit, index) => (
        <li key={hit.objectID}>
          <Link className="link" to={`/article/${hit.name}`}>
            <span className="num">{index + 1}</span>
            <p className="tags">
              <Highlight
                hit={hit}
                attribute="tags"
                tagName="mark"
                separator="&nbsp;&nbsp;|&nbsp;&nbsp;"
              />
            </p>
            <h6 className="title">
              <Highlight hit={hit} attribute="title" tagName="mark" />
            </h6>
            {hit._snippetResult.excerpt.matchLevel === "none" ? (
              <p className="descriptions">
                {hit.descriptions.map((description, index) => (
                  <span key={description} className="description">
                    {description}
                    {index !== hit.descriptions.length - 1 && <br />}
                  </span>
                ))}
              </p>
            ) : (
              <p className="preview">
                <Snippet hit={hit} attribute="excerpt" tagName="mark" />
              </p>
            )}
          </Link>
        </li>
      ))}
      <li className="tip-bar full-height">已经到底了 : )</li>
    </ul>
  </div>
)

const AutocompleteSearch = connectAutoComplete(Autocomplete)

const Search = () => {
  const searchRef = useRef()

  const focusSearchInput = () => {
    setTimeout(() => {
      document.querySelector("#search-input").focus()
    }, 300)
  }

  const handleSearch = show => {
    const search = document.querySelector("#search-container")

    if (show) {
      if (search) {
        search.classList.add("show")
        setTimeout(() => {
          document.querySelector("#search-input").focus()
        }, 300)
      }
    } else {
      search.classList.remove("show")
    }
  }

  useEffect(() => {
    // 监听 关闭按钮 的点击事件
    const closeSearch = document.querySelector("#close-search")
    if (closeSearch) {
      closeSearch.addEventListener("click", () => {
        handleSearch(false)
      })
    }

    // 监听按键，实现 / 打开搜索框，<Enter> 打开结果第一项
    const keypress = window.addEventListener("keypress", e => {
      if (e.key === "/") {
        if (!searchRef.current?.classList.contains("show")) {
          e.preventDefault()
        }
        handleSearch(true)
        focusSearchInput()
      } else if (
        e.key === "Enter" &&
        searchRef.current?.classList.contains("show")
      ) {
        if (
          searchRef.current?.querySelectorAll("ul > li > a") &&
          searchRef.current?.querySelectorAll("ul > li > a")[0]
        ) {
          searchRef.current.querySelectorAll("ul > li > a")[0].click()
        }
      }
    })

    // 监听按键，实现 <Esc> 关闭搜索框
    const keydown = window.addEventListener("keydown", e => {
      if (e.key === "Escape" && searchRef.current.classList.contains("show")) {
        handleSearch(false)
      }
    })

    // 修正 Algolia `PoweredBy` 组件包含 Tab 焦点的问题
    document.querySelector(".tip-bar a").setAttribute("tabindex", "-1")

    return () => {
      window.removeEventListener("keypress", keypress)
      window.removeEventListener("keydown", keydown)
    }
  }, [])

  return (
    <div
      className={"search-container"}
      id="search-container"
      aria-label="搜索对话框"
      role="dialog"
      ref={searchRef}
    >
      <div
        className="mask"
        id="close-dialog"
        onClick={() => handleSearch(false)}
        aria-hidden="true"
      ></div>
      <div className="dialog">
        <InstantSearch
          searchClient={searchClient}
          indexName="Pages"
          role="search"
        >
          <AutocompleteSearch></AutocompleteSearch>
        </InstantSearch>
      </div>
    </div>
  )
}

export default Search
