describe('Todo List App', () => {

  // Before each Test case, visit the Todo List application
  beforeEach(() => {
    cy.visit('http://localhost:8000/challenge.html');
  });

  /*
    PASS: IF the text on the page contains "Todo List"
    FAIL: IF the text on the page does not contain "Todo List"
  */

  it('Test case#1 Should contain "Todo List" Text ', () => {
    cy.get('h1').should('contain.text', 'Todo List');
  });

  /*
    PASS: IF EMPTY RECORD IS NOT ADDED
    FAIL:  IF EMPTY RECORD IS ADDED
  */

  it('Test case#2 Should not add an empty todo item', () => {
    // Save the current number of rows in the task list
    cy.get('#taskList tr').then(($rows) => {
      const initialRowCount = $rows.length;
      // Add an empty task by clearing the input and clicking "Add Task"
      cy.get('#taskInput').clear().click();
      cy.get('button').contains('Add Task').click();

      // Verify that the number of rows in the task list has not increased
      cy.get('#taskList tr').should('have.length', initialRowCount);
    
    });
  });


  /*
    PASS: If duplicate entries are not there
    FAIL: If duplicate entries are there
    
  */ 
    it('Test case#3 Should not allow adding duplicate Todo items', () => {
      // Add a task name to the list
      cy.get('#taskInput').type('testABC');
      cy.get('button').contains('Add Task').click();
    
      //Save the current number of rows in the task list
      cy.get('#taskList tr').then(($rows) => {
        const initialRowCount = $rows.length;
    
        // Verify the task is added correctly
        cy.get('#taskList tr').eq(1).should('contain.text', 'testABC');
     
        // Attempt to add the duplicate task (same as the first one)
        cy.get('#taskInput').type('testABC');
        cy.get('button').contains('Add Task').click();
    
        // Verify that the number of rows in the task list has not increased
        cy.get('#taskList tr').should('have.length', initialRowCount);
      });
    });
  
  /*
    PASS: IF Text contain not Special characters
    FAIL: IF Text contain special characters
  */

  it('Test case#4 Should not allow adding Todo tasks with special characters', () => {
    // Define an array of special characters to test
    const specialCharacters = ['!', '@', '#' , '*'];

    // Save the current number of rows in the task list
    cy.get('#taskList tr').then(($rows) => {
      const initialRowCount = $rows.length;
    
      // Try adding each special character as a task
      specialCharacters.forEach((char) => {
        cy.get('#taskInput').clear().type(char);
        cy.get('button').contains('Add Task').click();
    });
    
    // After adding special characters, verify the number of rows has not increased
    cy.get('#taskList tr').should('have.length', initialRowCount);

    });

  });
});
