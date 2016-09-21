import React from 'react'
import { composeWithTracker } from 'react-komposer'
import ReactMarkdown from 'react-markdown'
import { Editor, EditorState, ContentState, RichUtils } from 'draft-js'

class About extends React.Component {

  constructor() {
    super()
    this.state = {
      editorState: EditorState.createEmpty()
    }
  }

  updateAboutContent(editorState) {
    let page = Pages.findOne({title: 'about'})
    let content = editorState.getCurrentContent().getPlainText()

    savePage.call({
      id: page._id,
      title: page.title,
      content: content
    }, (err) => err && console.error(err))

    this.state.editorState = editorState
    this.setState(this.state)
  }

  componentWillMount() {
    let {content} = Pages.findOne({title: 'about'}) || {}
    let contentState = ContentState.createFromText(content || '')
    this.state.editorState = EditorState.createWithContent(contentState)
  }

  componentWillUnmount() {
    this.state.subscription.stop()
  }

  handleKeyCommand(command) {
    let newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.state.editorState = newState
      this.setState(this.state)
      return true
    }
    return false
  }

  getEditorWithContent() {
    return (
      <Editor editorState={this.state.editorState}
        handleKeyCommand={this.handleKeyCommand.bind(this)}
        onChange={this.updateAboutContent.bind(this)}/>
    )
  }

  getContentMarkup() {
    let page = Pages.findOne({title: 'about'})
    let content = page && page.content || ''
    return (
      <div id="about-page-content">
        <ReactMarkdown source={content} />
      </div>
    )
  }

  render() {
    return (
      <div id="about">
        {
          Meteor.user.isLoggedIn
            ? this.getEditorWithContent()
            : this.getContentMarkup()
        }
      </div>
    )
  }
}

function composer(props, onData) {
  if (Meteor.subscribe('pages').ready()) {
    const pages = Pages.find().fetch()
    onData(null, {pages})
  }
}

export default composeWithTracker(composer)(About)
