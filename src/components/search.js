import algoliasearch from "algoliasearch/lite"
import { Link } from "gatsby"
import React from "react"
import {
  connectAutoComplete,
  Highlight,
  InstantSearch,
  PoweredBy,
  Snippet,
  Stats,
} from "react-instantsearch-dom"
import "../styles/search.less"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

const Autocomplete = ({ hits, currentRefinement, refine }) => (
  <div className="search-box">
    <div className="bar">
      <input
        id="article-search"
        type="search"
        autoComplete="off"
        placeholder="在此输入搜索内容 ..."
        value={currentRefinement}
        onChange={event => refine(event.currentTarget.value)}
        aria-label="Search"
      />
      <button id="close-search" title="关闭搜索窗口" aria-label="关闭搜索窗口">
        <svg
          aria-label="Close Icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            fillRule="evenodd"
            d="M18.78 15.28a.75.75 0 000-1.06l-6.25-6.25a.75.75 0 00-1.06 0l-6.25 6.25a.75.75 0 101.06 1.06L12 9.56l5.72 5.72a.75.75 0 001.06 0z"
          ></path>
        </svg>
      </button>
    </div>

    <ul>
      <li className="search-tips" tabIndex="-1">
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
              #&nbsp;
              <Highlight
                hit={hit}
                attribute="tags"
                tagName="mark"
                separator="&nbsp;&nbsp;&nbsp;&nbsp;#&nbsp;"
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
      <li className="search-tips full-height">已经到底了 : )</li>
    </ul>
  </div>
)

const AutocompleteSearch = connectAutoComplete(Autocomplete)

const Search = () => (
  <InstantSearch searchClient={searchClient} indexName="Pages" role="search">
    <AutocompleteSearch></AutocompleteSearch>
  </InstantSearch>
)

export default Search
