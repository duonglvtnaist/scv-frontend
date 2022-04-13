import React, { useState } from 'react'
import { Input, Icon } from 'semantic-ui-react'

export default function AddTagKeyWord(props) {
  const [tagKeyWords, setTagKeyWords] = useState([])

  function handleKeyDown(e) {
    e.preventDefault()
    if (e.key === 'Enter') {
      e.preventDefault()
      const value = e.target.value
      if (!value.trim()) return
      setTagKeyWords([...tagKeyWords, value])
      props.onChangeKeywords([...tagKeyWords, value].toString())
      e.target.value = ''
    }
    
  }

  function removeTag(index) {
    setTagKeyWords(tagKeyWords.filter((el, i) => i !== index))
    props.onChangeKeywords(tagKeyWords.filter((el, i) => i !== index).toString())
  }
  return (
    <div className="tagKeyWordContainer">
      <div className="tagKeyWord">
        {tagKeyWords.map((tag, index) => (
          <div className="tagItem" key={'tagItem'+index +1}>
            <span className="textTag" key={'textTag'+index +1}>{tag}</span>
            <span key={'rmTag'+ index +1} onClick={() => removeTag(index)}>
              <Icon name="times" size="small" className="iconClose" />
            </span>
          </div>
        ))}
        <Input
          icon="tags"
          iconPosition="left"
          labelPosition="right"
          placeholder="Enter Keyword"
          onKeyUp={handleKeyDown}
          className="inputTagKeyWord"
          name="keyword"
        />
      </div>
    </div>
  )
}
