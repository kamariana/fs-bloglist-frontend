describe('Blog app', function() {

  /*
  * E2E tests by controlling the state of the database
  * make sure to:
  *  1. create API endpoints to the backend for the test
  *  2. Make sure your backend is running in test mode by starting it with this command
  * (previously configured in the package.json file): npm run start:test
  */

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'A Camariana',
      username: 'camariana',
      password: 'jannata'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user1)
    const user2 = {
      name: 'E Faalisco',
      username: 'faalisco',
      password: 'efaal'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user2)
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

    it('fails with wrong credentials', function() {
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

  describe('and several blogs exist', function() {
    beforeEach(function() {
      cy.login({
        username: 'camariana',
        password: 'jannata'
      })
      cy.createBlog({
        title: 'I am not your Yoko Ono',
        author: 'Jane Yang',
        url: 'https://janeyang.org/2021/04/13/in-search-of-dignity-at-work/',
        likes: 10
      })
      cy.login({
        username: 'faalisco',
        password: 'efaal'
      })
      cy.createBlog({
        title: 'Start Your Journey Through The Quran\'s Language',
        author: 'Norman Ali Khan',
        url: 'https://dream.bayyinahtv.com/',
        likes: 100
      })
      cy.createBlog({
        title: 'University of the People Reviews: What it\'s Like to Study at UoPeople',
        author: 'U of People',
        url: 'https://www.uopeople.edu/student-reviews/',
        likes: 5
      })
      cy.createBlog({
        title: 'Quotes for Software Engineers',
        author: 'Damith C. Rajapakse',
        url: 'https://www.comp.nus.edu.sg/~damithch/pages/SE-quotes.htm',
        likes: 35
      })

      cy.contains('Login').click()
      cy.get('#username').type('faalisco')
      cy.get('#password').type('efaal')
      cy.get('#login-button').click()

      cy.contains('E Faalisco logged in')
    })

    it('can be deleted by the user who created it', function() {
      cy.contains('Start Your Journey Through The Quran\'s Language').parent().find('.btn--show').as('showButton')
      cy.get('@showButton').click()

      cy.get('.btn--delete')
        .then(buttons => {
          //console.log('number of buttons', buttons.length)
          cy.wrap(buttons[0]).click()
        })

      cy.get('.blog').should('not.contain', 'Start Your Journey Through The Quran\'s Language')
    })

    it('cannot be deleted by the user who did not create it', function() {
      cy.contains('I am not your Yoko Ono').parent().find('.btn--show').as('showButton')
      cy.get('@showButton').click()

      cy.get('.open')
        .should('not.contain', 'Delete')

      cy.get('@showButton').click()
    })

    it('checks that the blogs are ordered according to likes with the blog with the most likes being first.', function() {
      cy.get('.btn--show').click({ multiple: true })

      cy.get('.blog__likes').first().should('have.text', 'Likes 100')
      cy.get('.blog__likes').last().should('have.text', 'Likes 5')
    })
  })

})




