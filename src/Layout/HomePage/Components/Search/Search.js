import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import {
  category,
  experience,
  position,
  searchType,
  workingType,
} from '../../../../Components/Data/Data'
import './search.css'

export default function Search({onChangeKeywords, onSearchSmartCV, 
  onChangeWorkType, onChangeCategory, onChangePosition, 
  onChangeExperience, onApplyToFilterJob, onKeySearch}) {
  return (
    <div className="searchJob">
      <div className="search">
        <input placeholder="Search" className="inputSearch" type="search" onChange={onChangeKeywords} 
        onKeyUp ={onKeySearch} />
        {/* <Dropdown
          placeholder="Search Type"
          selection
          options={searchType}
          className="searchOption"
        /> */}
        <button className="iconSearch" onClick={onSearchSmartCV}>
          <Icon name="search" style={{ color: '#ffffff' }} size="large" />
        </button>
      </div>
      <div className="filterBar">
        <div className="filterJob">
          <Dropdown onChange={onChangeWorkType}
            placeholder="Working Type"
            selection
            options={workingType}
            className="filterType"
          />
          <Dropdown onChange={onChangeCategory}
            placeholder="Category"
            selection
            options={category}
            className="filterType"
          />
          <Dropdown onChange= {onChangePosition}
            placeholder="Position"
            selection
            options={position}
            className="filterType"
          />
          <Dropdown onChange={onChangeExperience}
            placeholder="Experience"
            selection
            options={experience}
            className="filterType"
          />
        </div>
        <div className="buttonApplyFilter" onClick={onApplyToFilterJob}>
          <Icon name="sliders" size="large" style={{ color: '#ffffff' }}></Icon>
          <span className="textApply">Apply</span>
        </div>
      </div>
      <div className="sort">
        <Dropdown
          className="sortBy"
          selection
          placeholder="Sort By"
          options={searchType}
        ></Dropdown>
      </div>
    </div>
  )
}
