describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:5173/api/testing/reset')
    const user1 = {
      name: 'aaa',
      username: 'aaa',
      password: 'aaa',
    }
    const user2 = {
      name: 'bbb',
      username: 'bbb',
      password: 'bbb',
    }
    cy.request('POST', 'http://localhost:5173/api/users', user1)
    cy.request('POST', 'http://localhost:5173/api/users', user2)
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
    cy.contains('Login')
  })

  it('login form can be opened', function () {
    cy.contains('Login').click()
  })

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('aaa')
      cy.get('#password').type('aaa')
      cy.get('#login-button').click()

      cy.contains('Logged in as: aaa')
    })

    it('fails with incorrect credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('aaa')
      cy.get('#password').type('zzz')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Incorrect credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Logged in as: aaa')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'aaa', password: 'aaa' })
    })

    it('a new blog can be created', function () {
      cy.createBlog({ title: 'title 1', author: 'author 1', url: 'url 1' })
      cy.contains('title 1').contains('author 1')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.login({ username: 'aaa', password: 'aaa' })
        cy.createBlog({ title: 'title', author: 'author', url: 'url' })
      })

      it('users can like the blog', function () {
        cy.contains('View').click()
        cy.contains('button', 'Like').click()
        cy.contains('Likes: 1')
      })

      it('the blog creator can delete the blog', function () {
        cy.contains('View').click()
        cy.contains('button', 'Delete').click()
        cy.contains('title author').should('not.exist')
      })

      it('someone who is not the blog creator cannot delete the blog', function () {
        cy.login({ username: 'bbb', password: 'bbb' })

        cy.contains('View').click()
        cy.contains('button', 'Delete').click()
        cy.contains('title author')
      })
    })
  })

  describe('and multiple blogs exist', function () {
    beforeEach(function () {
      cy.login({ username: 'aaa', password: 'aaa' })
      cy.createBlog({
        title: 'second most likes',
        author: 'author 1',
        url: 'url 1',
      })
      cy.createBlog({ title: 'most likes', author: 'author 2', url: 'url 2' })
      cy.createBlog({ title: 'least likes', author: 'author 3', url: 'url 3' })
    })

    it.only('blogs are ordered by most to least likes', function () {
      cy.get('.toggle-button').click({ multiple: true })

      cy.get('.like-button').eq(0).click()
      cy.wait(200)
      cy.get('.like-button').eq(0).click()
      cy.wait(200)
      cy.get('.like-button').eq(1).click()
      cy.wait(200)
      cy.get('.like-button').eq(1).click()
      cy.wait(200)
      cy.get('.like-button').eq(1).click()
      cy.wait(200)
      cy.get('.like-button').eq(2).click()
      cy.wait(200)

      cy.get('.blog').eq(0).should('contain', 'most likes author 2')
      cy.get('.blog').eq(1).should('contain', 'second most likes author 1')
      cy.get('.blog').eq(2).should('contain', 'least likes author 3')
    })
  })
})
