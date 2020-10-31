import algoliasearch from "algoliasearch/lite"
import { Link } from "gatsby"
import React from "react"
import {
  InstantSearch,
  Stats,
  PoweredBy,
  connectAutoComplete,
} from "react-instantsearch-dom"

import "../styles/search.less"

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

const Autocomplete = ({ hits, currentRefinement, refine }) => (
  <div className="search-box">
    <input
      id="article-search"
      type="search"
      autocomplete="off"
      placeholder="在此输入搜索内容 ..."
      value={currentRefinement}
      onChange={event => refine(event.currentTarget.value)}
    />

    <ul>
      <li className="search-tips" tabIndex="-1">
        <Stats
          translations={{
            stats(nbHits, timeSpentMS) {
              return `${nbHits} results | ${timeSpentMS} ms`
            },
          }}
        />
        <PoweredBy
          translations={{
            searchBy: "",
          }}
        />
      </li>
      {hits.map((hit, index) => (
        <>
          <li key={hit.objectID}>
            <Link className="link" to={`/article/${hit.name}`}>
              <span className="num">{index + 1}</span>
              <p className="tags">
                {hit.tags.map(tag => (
                  <span key={tag} className="tag">
                    # {tag}
                  </span>
                ))}
              </p>
              <h6 className="title">{hit.title}</h6>
              <p className="descriptions">
                {hit.descriptions.map((description, index) => (
                  <span key={description} className="description">
                    {description}
                    {index !== hit.descriptions.length - 1 && <br />}
                  </span>
                ))}
              </p>
            </Link>
          </li>
          {index !== hits.length - 1 && <hr />}
        </>
      ))}
      <li className="search-tips full-height">已经到底了 : )</li>
    </ul>
  </div>
)

const AutocompleteSearch = connectAutoComplete(Autocomplete)

const Search = () => (
  <InstantSearch searchClient={searchClient} indexName="Pages">
    <AutocompleteSearch></AutocompleteSearch>
  </InstantSearch>
)

export default Search
