const { test, expect } = require('@playwright/test');

// Defining the url and username password and a product name
const LOGIN_URL = 'https://www.saucedemo.com/';
const USERNAME = 'visual_user';
const PASSWORD = 'secret_sauce';
const PRODUCT_NAME = 'Sauce Labs Backpack';


test('Basic Login, Add Product, Verify Cart, and Logout', async ({ page }) => {

    const waitTime = 1000; // 1 second delay after most actions

    console.log('Navigating to the site...');
    await page.goto(LOGIN_URL);
    await page.waitForTimeout(waitTime);

    //Log in with valid credentials
    console.log('Logging in...');
    await page.locator('#user-name').fill(USERNAME);
    await page.waitForTimeout(waitTime / 2); // Shorter wait for filling password
    await page.locator('#password').fill(PASSWORD);
    await page.waitForTimeout(waitTime / 2);
    await page.locator('#login-button').click();

     await expect(page).toHaveURL(/.*inventory.html/); 
    await page.waitForTimeout(waitTime);
    
    console.log('Adding a product to the cart...');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.waitForTimeout(waitTime);

    console.log('Going to the cart and verifying the product...');
    await page.locator('.shopping_cart_link').click();
    
    await expect(page).toHaveURL(/.*cart.html/);
    await page.waitForTimeout(waitTime);
    
    //Checking the name of the product in the cart list
    const productNameInCart = page.locator('.inventory_item_name');
    await expect(productNameInCart).toHaveText(PRODUCT_NAME);
    await page.waitForTimeout(waitTime * 2); // giving longer wait to see the verified item
    
    // 5. Log out
    console.log('Logging out...');
    await page.locator('#react-burger-menu-btn').click();
    
    await page.locator('#logout_sidebar_link').click();
    
    await expect(page).toHaveURL(LOGIN_URL);
    await page.waitForTimeout(waitTime);
    
    console.log('Test finished successfully!');

});