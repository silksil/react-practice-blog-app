import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params; //is directly provided by react router > params list wild-card tokens
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    });
  }

  render() {
    const { post } = this.props;
    if(!post) {
      return <div className="loader"></div>
    }
    return (
      <div>
        <div className="top-container">
          <Link to="/"> Back to Index </Link>
        </div>
        <div className="bottom-container">
          <h3>{post.title}</h3>
          <h6 className="txt-hashtag">{post.categories}</h6>
          <p>{post.content}</p>
          <p>{post.author}</p>
          <button
            className="btn btn-danger"
            onClick={this.onDeleteClick.bind(this)}
          > Delete Post
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps( { posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
