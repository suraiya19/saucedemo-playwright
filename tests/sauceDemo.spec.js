const { test, expect } = require('@playwright/test');

// Defining the url and username password and a product name
const BASE_URL = 'https://www.saucedemo.com/';
const VALID_USERNAME = 'visual_user';
const VALID_PASSWORD = 'secret_sauce';
const PRODUCT_NAME = 'Sauce Labs Backpack';