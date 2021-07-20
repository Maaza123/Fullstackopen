describe('Blog app', function() {
  const user = {
    username: 'Maaza123',
    name: 'Matti',
    password: 'Salasana'
  }

    beforeEach(function() {
      
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')
      
    })
  
    it('Login form is shown', function() {
      cy.get('#loginForm');
    })

    describe('Login', function(){
      it('succeeds with correct credentials', function(){
        cy.get('#username').type(user.username)
        cy.get('#password').type(user.password)
        cy.get('#loginButton').click()
        cy.contains(`Logged in as ${user.name}`)

      })
      it('Fails with wrong credentials', function(){
        cy.get('#username').type('JUHANI')
        cy.get('#password').type('JUHANI')
        cy.get('#loginButton').click()
        cy.get('#loginForm')
      })
    })
    describe('Create blog', function() {
      // ...
    
      describe('When logged in', function() {
        beforeEach(function() {
          cy.get('#username').type(user.username)
          cy.get('#password').type(user.password)
          cy.get('#loginButton').click()
          cy.contains(`Logged in as ${user.name}`)
        })
    
        it('A blog can be created', function() {
          cy.contains('Add new').click();
          cy.get('#title').type('Juhanin kootut tarinat');
          cy.get('#author').type('testi author');
          cy.get('#url').type('www.TESTITESTI.fi')
          cy.get('#submit').click();

          cy.contains('Juhanin kootut tarinat');
          
        })

        it('A blog can be liked', function(){
          cy.contains('Add new').click();
          cy.get('#title').type('Juhanin kootut tarinat');
          cy.get('#author').type('testi author');
          cy.get('#url').type('www.TESTITESTI.fi')
          cy.get('#submit').click();

          cy.contains('Juhanin kootut tarinat');
          cy.contains('More info').click();
          cy.contains('like').click();
          cy.contains('likes 1');
        })

        it('Blog can be deleted', function() {
          cy.contains('Add new').click();
          cy.get('#title').type('Juhanin kootut tarinat');
          cy.get('#author').type('testi author');
          cy.get('#url').type('www.TESTITESTI.fi')
          cy.get('#submit').click();

          cy.contains('More info').click();
          cy.contains('Delete blogs').click();

          cy.contains('More info').should('not.exist')
        })
        
      })
    
    })
    describe('Check that blogs are in alphabetical order', function(){
      describe('When blogs are created', function(){
        beforeEach(function(){
          cy.get('#username').type(user.username)
          cy.get('#password').type(user.password)
          cy.get('#loginButton').click()
          cy.contains(`Logged in as ${user.name}`)
          cy.contains('Add new').click();
        })
        it('Check that likes are in correct order', function(){
          for(let i =0; i< 4; i++){
            cy.get('#title').type(`testi${i}`);
            cy.get('#author').type('testi author');
            cy.get('#url').type('www.TESTITESTI.fi')
            cy.get('#submit').click();
            cy.wait(1000);
          }
          cy.get('.moreInfoButton').then(buttons => {
            for(let i = 0; i< buttons.length; i++){
              cy.wrap(buttons[i]).click();
              cy.wait(1000);
            }
          })
          
          cy.get('.likeButton').then(buttons => {
            for(let i = 0; i< buttons.length; i++){
              for(let a = 0; a<i; a++){
                cy.wrap(buttons[i]).click();
                cy.wait(500)
              } 
            }
          })
          cy.wait(1000)
          cy.get('.blog').then(blogs => {
            cy.wrap(blogs[0]).contains('likes 3');
            cy.wrap(blogs[1]).contains('likes 2');
            cy.wrap(blogs[2]).contains('likes 1');
            cy.wrap(blogs[3]).contains('likes 0')
          })

        })
        
      })
      
    })
  })