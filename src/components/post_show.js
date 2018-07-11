import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions'

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params; //is directly provided by react router > params list wild-card tokens
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params; //alternative you could do this.props.post.id > it assumes that the post is existence, but component will render without the post being available > this this is safer.
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    });
  }

  render() {
    const { post } = this.props;
    if(!post) {
      return <div> Loading...</div>;
    }
    // if a property doesn't exist yet > it will return undefined as the props
    return (
      <div>
        <Link to="/"> Back to Index </Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick.bind(this)}
        > Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

//the second argument is ownProps > everytime the render PostsShows this will render > ownProps === to all props
// this way of doing (instead of getting the value in the render function) is especially common in large app that have mapStateToProps located in seperate files
function mapStateToProps( { posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
