const interceptCommonRoutes = () => {
  cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('GET', '**/orders/all', { fixture: 'feeds.json' }).as(
    'getFeeds'
  );
  cy.intercept('GET', '**/orders', { fixture: 'feeds.json' }).as('getOrders');
  cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
};

describe('Конструктор бургера', () => {
  beforeEach(() => {
    interceptCommonRoutes();
  });

  it('добавляет ингредиент из списка в конструктор', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.contains('li', 'Котлета премиум')
      .should('exist')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.get('[data-cy="constructor-elements"]').should(
      'contain.text',
      'Котлета премиум'
    );
  });

  it('добавляет булку в конструктор — их должно быть две', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    // Находим булку и добавляем её
    cy.contains('li', 'Булка традиционная')
      .should('exist')
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.get('[data-cy="constructor-bun-top"]').should(
      'contain.text',
      'Булка традиционная'
    );
    cy.get('[data-cy="constructor-bun-bottom"]').should(
      'contain.text',
      'Булка традиционная'
    );
  });

  it('открывает и закрывает модалку ингредиента и показывает его данные', () => {
    cy.visit('/');
    cy.wait('@getIngredients');

    cy.contains('Котлета премиум').click();

    cy.get('[data-cy="modal"]').as('modal');
    cy.get('@modal').should('contain.text', 'Детали ингредиента');

    cy.get('@modal').should('contain.text', 'Котлета премиум');

    cy.get('@modal').find('[data-cy="modal-close"]').click();
    cy.get('@modal').should('not.exist');
  });

  it('создает заказ и очищает конструктор', () => {
    cy.setCookie('accessToken', 'test-token');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh');
      }
    });

    cy.wait('@getIngredients');
    cy.wait('@getUser');

    cy.contains('li', 'Булка традиционная')
      .should('exist')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('li', 'Котлета премиум')
      .should('exist')
      .within(() => {
        cy.contains('Добавить').click();
      });

    cy.contains('button', 'Оформить заказ').click();

    cy.wait('@createOrder');

    cy.get('[data-cy="modal"]').should('contain.text', '424242');

    cy.get('[data-cy="constructor-elements"]').should(
      'not.contain.text',
      'Котлета премиум'
    );

    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
