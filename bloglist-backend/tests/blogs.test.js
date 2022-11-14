const listHelper = require('../utils/list_helper')

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test("when list has 1 blog is that blog's likes", () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(7)
  })

  test('of a list of more than 1 blog is calculated correctly', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(38)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBeNull()
  })

  test('when list has 1 blog is that blog', () => {
    const firstBlog = {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7,
    }
    const result = listHelper.favoriteBlog([blogs[0]])
    expect(result).toEqual(firstBlog)
  })

  test('of a list of more than 1 blog is calculated correctly', () => {
    const mostLikedBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    const result = listHelper.favoriteBlog(blogs.slice(0, 3))
    expect(result).toEqual(mostLikedBlog)
  })

  test('when there is a tie is the first one', () => {
    const mostLikedBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(mostLikedBlog)
  })
})

describe('author with most blogs', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBeNull()
  })

  test('when list has 1 blog is that blog', () => {
    const blogCount = {
      author: 'Michael Chan',
      blogs: 1,
    }
    const result = listHelper.mostBlogs([blogs[0]])
    expect(result).toEqual(blogCount)
  })

  test('of a list of more than 1 blog is calculated correctly', () => {
    const blogCount = {
      author: 'Robert C. Martin',
      blogs: 3,
    }
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(blogCount)
  })
})

describe('author with most likes', () => {
  test('of empty list is null', () => {
    const result = listHelper.mostLikes([])
    expect(result).toBeNull()
  })

  test('when list has 1 blog is that blog', () => {
    const mostLikedAuthor = {
      author: 'Michael Chan',
      likes: 7,
    }
    const result = listHelper.mostLikes([blogs[0]])
    expect(result).toEqual(mostLikedAuthor)
  })

  test('of a list of more than 1 blog is calculated correctly', () => {
    const mostLikedAuthor = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    }
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostLikedAuthor)
  })
})
