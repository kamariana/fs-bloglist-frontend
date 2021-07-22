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

    it.only('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('camariana')
      cy.get('#password').type('jannatas')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })
  
})


