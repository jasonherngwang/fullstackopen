const _ = require('lodash')

const dummy = (blogs) => 1

const simplifyBlogObj = ({ title, author, likes }) => ({ title, author, likes })

const totalLikes = (blogs) =>
  blogs.reduce((total, blog) => total + blog.likes || 0, 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  if (blogs.length === 1) {
    return simplifyBlogObj(blogs[0])
  }

  let mostLiked = blogs[0]

  blogs.slice(1).forEach((blog) => {
    if (blog.likes > mostLiked.likes) mostLiked = blog
  })

  return simplifyBlogObj(mostLiked)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1,
    }
  }

  let blogCounts = Object.entries(_.countBy(blogs, 'author'))
  blogCounts = _.sortBy(blogCounts, [({ author, count }) => count])
  const mostPublishedAuthor = blogCounts[blogCounts.length - 1]

  return {
    author: mostPublishedAuthor[0],
    blogs: mostPublishedAuthor[1],
  }
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      likes: blogs[0].likes,
    }
  }

  const likesByAuthor = {}
  let mostLikedAuthor = null

  blogs.forEach((blog) => {
    likesByAuthor[blog.author] = (likesByAuthor[blog.author] || 0) + blog.likes

    if (
      !mostLikedAuthor ||
      likesByAuthor[blog.author] > mostLikedAuthor.likes
    ) {
      mostLikedAuthor = {
        author: blog.author,
        likes: likesByAuthor[blog.author],
      }
    }
  })

  return mostLikedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
