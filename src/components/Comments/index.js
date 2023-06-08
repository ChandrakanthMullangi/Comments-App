import {Component} from 'react'

import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {nameInput: '', commentInput: '', commentsList: []}

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()

    const {nameInput, commentInput} = this.state

    const initialBackgroundColorClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = commentId => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== commentId),
    })
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="app-container">
        <h1 className="heading"> Comments </h1>
        <div className="add-comment-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            className="comments-image"
            alt="comments"
          />
          <div className="comment-input-container">
            <p className="topic"> Say Something About 4.0 Technologies </p>
            <form onSubmit={this.onAddComment}>
              <input
                type="text"
                className="username"
                onChange={this.onChangeNameInput}
                value={nameInput}
                placeholder="Your Name"
              />
              <textarea
                placeholder="Your Comment"
                className="comment"
                onChange={this.onChangeCommentInput}
                value={commentInput}
              />
              <button type="submit" className="add-comment-button">
                Add Comment
              </button>
            </form>
          </div>
        </div>
        <hr />
        <p>
          <span className="comments-count"> {commentsList.length} </span>
          Comments
        </p>
        <ul className="comments-container">
          {commentsList.map(eachComment => (
            <CommentItem
              key={eachComment.id}
              commentDetails={eachComment}
              deleteComment={this.deleteComment}
              toggleIsLiked={this.toggleIsLiked}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
