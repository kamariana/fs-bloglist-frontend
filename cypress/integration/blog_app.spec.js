describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'A Camariana',
      username: 'camariana',
      password: 'jannata'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login({
        username: 'camariana',
        password: 'jannata'
      })
    })

    /* it.only('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('camariana')
      cy.get('#password').type('jannatas')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    }) */
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({
        username: 'camariana',
        password: 'jannata'
      })
    })

    it('A blog can be created', function() {
      cy.createBlog({
        title: 'I am not your Yoko Ono', 
        author: 'Jane Yang', 
        url: 'https://janeyang.org/2021/04/13/in-search-of-dignity-at-work/'
      })
    })

    describe('a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'I am not your Yoko Ono', 
          author: 'Jane Yang', 
          url: 'https://janeyang.org/2021/04/13/in-search-of-dignity-at-work/'
        })
      })

      it('can be liked', function() {
        cy.contains('I am not your Yoko Ono')
          .get('.btn--show')
          .click()
        
        cy.contains('I am not your Yoko Ono')
          .get('.btn--like')
          .click()
        
        cy.get('.open')
          .contains('Likes 1')
      })
    })
  })
  
})


