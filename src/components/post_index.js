import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { fetchPosts } from '../actions';

class PostIndex extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    const posts = this.props.posts;
    if (Object.keys(posts).length === 0 && posts.constructor === Object) {
      return <div className="loader"></div>
    }
    return _.map(posts, post => {
      console.log(post)
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
          <p className="txt-hashtag">{post.categories}</p>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="text-xs-right">
        </div>
        <h3> Blog Posts </h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
        <Link className="btn" to="/posts/new">
          Add Post
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostIndex);
