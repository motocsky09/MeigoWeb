# MeigoWEB (.NET Core & Angular)[Completely receptive]
Technology and libraries used:
```
1. Server: .NET Core, IdentityServer 8 JWT Token, EntityFramework, C#, SqlServer
```
```
2. Client: Angular, TypeScript, HTML & CSS, Flexbox
```
Design patterns and principles used:            
```
REST and Dependecy injection
```
```
OOP and S.O.L.I.D Principles
```
### MeigoWEB is a web platform dedicated to the field of sales, exclusively specializing in apparel.
The application is divided into 5 sections:
```
1. Identity management section: it is responsible for the user authentication and registration 
                             part as well as the role management part. For the server side 
                             I used IdentityServer 8 with JWT Token.  
```
```
2. Profile Management section: It is responsible for enabling users to access and modify their account information, 
                             including personal details such as first name, last name, address, and phone number. 
                             This section ensures secure data handling and provides a user-friendly interface for profile updates.
```
```
3. Products Page section: It provides functionality to categorize products and display each product on a separate page. 
                             Detailed product information, including images, is shown, and users can add items to their shopping cart. 
                             The backend ensures efficient data retrieval and smooth navigation between products.
```
```
4. Shopping Cart section: It manages the user's shopping cart, allowing users to view and modify its contents. 
                             Features include adjusting the quantity of a product or removing items. 
                             The system ensures consistency between the frontend and backend to maintain accurate cart data.
```
```
5. Checkout section: It handles the final step of the purchase process, enabling users to verify or manually enter their delivery address. 
                             The system automatically populates the address from the profile section, ensuring seamless integration and a smooth user experience.

```
## Home page
```
The home page serves as the initial page of the application,
where clients can access essential details about the application.
```
![Home Page](https://github.com/motocsky09/project-shop/raw/main/_screens/home1.png)
![Home Page](https://github.com/motocsky09/project-shop/raw/main/_screens/home2.png)

## About page
```
In this section, users can learn more about the brand and its core values.
The “About us” area provides a short introduction,
highlighting the platform’s mission to offer stylish and eco-friendly clothing made
from high-quality recycled materials.
It emphasizes the minimalist and timeless design of the clothes,
encouraging users to express themselves while contributing to environmental sustainability.

Below, the “Values” section showcases the brand’s principles: sustainability, minimalist design, and quality.
Each value is presented with a clear icon and a short description to reinforce the brand’s message and make it more visually engaging.

A highlighted message draws attention to the brand’s commitment to the environment
by informing users that 50% of the proceeds go to NGOs focused on protecting nature.

At the bottom of the section, social media icons are displayed,
allowing users to easily follow the brand on Instagram, Facebook, and TikTok.
These links open in a new tab, making it convenient for users to stay connected without leaving the site.
```
![About Page](https://github.com/motocsky09/project-shop/raw/main/_screens/about-page1.png)
![About Page](https://github.com/motocsky09/project-shop/raw/main/_screens/about-page2.png)


## Login page
```
In this section, users can log in to the platform by entering their username and password.
The password is automatically hidden, but users can verify its correctness
by clicking the eye icon on the right,which will reveal the password.

Additionally, users who do not have an account or wish to create a new one
can access the "Register" button to be redirected to the registration page.
```
![Login Page](https://github.com/motocsky09/project-shop/raw/main/_screens/login-page.png)

## Register page
```
In this section, users can create a new account by providing the required information.

They must enter a valid email address and choose a unique username.

The password must be entered twice to confirm its accuracy
and must include at least one special character,one digit, and one uppercase letter.

The password is hidden by default, but users can reveal it
by clicking the eye icon on the right.

Once the form is completed correctly, users can proceed by pressing the ‘Register’ button to finalize the account creation.
```
![Register Page](https://github.com/motocsky09/project-shop/raw/main/_screens/register-page.png)

## Profile Account page
```
In this section, users can view and manage their account details.

The displayed information includes the username, full name (last name and first name),
address, city, postal code, email, and phone number.

Users can update their personal information by pressing the ‘Edit’ button,
which allows them to modify all information except the username and email,
as these are unique identifiers and cannot be changed.

The interface is user-friendly, with clear icons accompanying each detail for better navigation.
```
![Profile Account Page](https://github.com/motocsky09/project-shop/raw/main/_screens/profile-no-edit-page.png)
![Profile Account Page](https://github.com/motocsky09/project-shop/raw/main/_screens/profile-edit-page.png)

## All Products Filter page
```
In this section, users can see all products.
They can also use a filter to see only products from a specific category.

To add a product to their cart, simply click on the “Add to Cart” button.
The “+” and “-” symbols allow you to change how many products you want to add to the cart.

To learn more about a product, simply click on its image and it will take you to the Product Page.
```
![Product Filter Page](https://github.com/motocsky09/project-shop/raw/main/_screens/product-list-page.png)

## Product page
```
In this section, users can view detailed product information and interact with various features.

On the left side, they can browse multiple product images, including a main image and a gallery of alternate views,
which can be selected to update the main display.

On the right side, users can see the product name, price, and a brief description.

They can select the desired quantity using “+” and “-” buttons or manually input a number.

Available sizes are clearly displayed as selectable buttons (S, M, L, XL, XXL).

Further details are provided, including the product’s season, color, material,
and care instructions (represented by icons). The product code is also shown.

To finalize the selection, users can click the “Add to Cart” button.

A persistent cart button is available at the bottom of the page,
showing the number of items currently in the cart and providing a quick link to the shopping cart.
```
![Product Page](https://github.com/motocsky09/project-shop/raw/main/_screens/product-page.png)

## Shopping Cart page
```
In this section, users can access a concise summary of the products added to their cart.

They can modify the quantity of products, delete a product from their cart, or delete all products.

Additionally, they can view the total amount paid and the delivery charges.
```
![Shopping Cart Page](https://github.com/motocsky09/project-shop/raw/main/_screens/shoppingcart-page.png)

## Order page
```
In this section, users can verify the automatically populated delivery address
(if entered in their profile) or manually input the delivery address.

Additionally, they can add notes for the order and select their preferred payment method.
```
![Order Page](https://github.com/motocsky09/project-shop/raw/main/_screens/order-page.png)

## Order page Confirm order
```
This is the final section of the product purchase process.

It presents a single order confirmation message,
followed by an email address where additional information can be requested.
```
![Order Page Confirm Order](https://github.com/motocsky09/project-shop/raw/main/_screens/confirm-order-page.png)

# MeigoWeb Resolution for Mobile Devices

## HOME page mobile resolution
```
The home page serves as the initial page of the application,
where clients can access essential details about the application.
```
![Home Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/home1-mobile.png)
![Home Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/home2-mobile.png)

## About page mobile resolution
```
In this section, users can learn more about the brand and its core values.
The “About us” area provides a short introduction,
highlighting the platform’s mission to offer stylish and eco-friendly clothing made
from high-quality recycled materials.
It emphasizes the minimalist and timeless design of the clothes,
encouraging users to express themselves while contributing to environmental sustainability.

Below, the “Values” section showcases the brand’s principles: sustainability, minimalist design, and quality.
Each value is presented with a clear icon and a short description to reinforce the brand’s message and make it more visually engaging.

A highlighted message draws attention to the brand’s commitment to the environment
by informing users that 50% of the proceeds go to NGOs focused on protecting nature.

At the bottom of the section, social media icons are displayed,
allowing users to easily follow the brand on Instagram, Facebook, and TikTok.
These links open in a new tab, making it convenient for users to stay connected without leaving the site.

```
![About Page](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/about-page-mobile1.png)
![About Page](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/about-page-mobile2.png)
![About Page](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/about-page-mobile3.png)

## Login page mobile resolution
```
In this section, users can log in to the platform by entering their username and password.
The password is automatically hidden, but users can verify its correctness
by clicking the eye icon on the right,which will reveal the password.

Additionally, users who do not have an account or wish to create a new one
can access the "Register" button to be redirected to the registration page.
```
![Login Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/login-page-mobile.png)

## Register page mobile resolution
```
In this section, users can create a new account by providing the required information.

They must enter a valid email address and choose a unique username.

The password must be entered twice to confirm its accuracy
and must include at least one special character,one digit, and one uppercase letter.

The password is hidden by default, but users can reveal it
by clicking the eye icon on the right.

Once the form is completed correctly, users can proceed by pressing the ‘Register’ button to finalize the account creation.
```
![Register Page Register](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/register-page-mobile.png)

## Profile Account Page mobile resolution
```
In this section, users can view and manage their account details.

The displayed information includes the username, full name (last name and first name),
address, city, postal code, email, and phone number.

Users can update their personal information by pressing the ‘Edit’ button,
which allows them to modify all information except the username and email,
as these are unique identifiers and cannot be changed.

The interface is user-friendly, with clear icons accompanying each detail for better navigation.
```
![Profile Account Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/profile-no-edit-page-mobile.png)
![Profile Account Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/profile-edit-page-mobile.png)

## All Products Filter page mobile resolution
```
In this section, users can see all products.
They can also use a filter to see only products from a specific category.

To add a product to their cart, simply click on the “Add to Cart” button.
The “+” and “-” symbols allow you to change how many products you want to add to the cart.

To learn more about a product, simply click on its image and it will take you to the Product Page.
```
![Product Filter Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/filter-mobile.png)
![Product Filter Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/product-list-mobile.png)

## Product Page mobile resolution
```
In this section, users can view detailed product information and interact with various features.

On the left side, they can browse multiple product images, including a main image and a gallery of alternate views,
which can be selected to update the main display.

On the right side, users can see the product name, price, and a brief description.

They can select the desired quantity using “+” and “-” buttons or manually input a number.

Available sizes are clearly displayed as selectable buttons (S, M, L, XL, XXL).

Further details are provided, including the product’s season, color, material,
and care instructions (represented by icons). The product code is also shown.

To finalize the selection, users can click the “Add to Cart” button.

A persistent cart button is available at the bottom of the page,
showing the number of items currently in the cart and providing a quick link to the shopping cart.
```
![Product Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/product-page-mobile1.png)
![Product Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/product-page-mobile2.png)

## Shopping Cart Page mobile resolution
```
In this section, users can access a concise summary of the products added to their cart.

They can modify the quantity of products, delete a product from their cart, or delete all products.

Additionally, they can view the total amount paid and the delivery charges.
```
![Shopping Cart Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/shoppingcart-page-mobile1.png)

![Shopping Cart Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/shoppingcart-page-mobile2.png)

## Order Page mobile resolution
```
In this section, users can verify the automatically populated delivery address
(if entered in their profile) or manually input the delivery address.

Additionally, they can add notes for the order and select their preferred payment method.
```
![Order Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/order-page-mobile.png)

## Confirm Order Page mobile resolution
```
This is the final section of the product purchase process.

It presents a single order confirmation message,
followed by an email address where additional information can be requested.
```
![Order Page Confirm Order Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/mobile/confirm-order-page-mobile.png)
