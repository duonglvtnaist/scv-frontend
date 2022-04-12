import React, { useState } from 'react'
import { Input, Icon } from 'semantic-ui-react'

export default function AddTagKeyWord(props) {
  const [tagKeyWords, setTagKeyWords] = useState([])

  function handleKeyDown(e) {
    if (e.key !== 'Enter') return
    const value = e.target.value
    if (!value.trim()) return
    setTagKeyWords([...tagKeyWords, value])
    console.log(setTagKeyWords)
    e.target.value = ''
  }

  function removeTag(index) {
    setTagKeyWords(tagKeyWords.filter((el, i) => i !== index))
  }
  return (
    <div className="tagKeyWordContainer">
      <div className="tagKeyWord">
        {tagKeyWords.map((tag, index) => (
          <div className="tagItem">
            <span className="textTag">{tag}</span>
            <span onClick={() => removeTag(index)}>
              <Icon name="times" size="small" className="iconClose" />
            </span>
          </div>
        ))}
        <Input
          icon="tags"
          iconPosition="left"
          labelPosition="right"
          placeholder="Enter Keyword"
          onKeyDown={handleKeyDown}
          className="inputTagKeyWord"
          name="keywords"
        />
      </div>
    </div>
  )
}
