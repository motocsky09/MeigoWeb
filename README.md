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
### MeigoWEB is a web platform dedicated to the field of sales, specifically 3D print object.
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
It is accompanied by two accordion items that contribute to a minimalist aesthetic and provide ample spacing.
```
![Home Page](https://github.com/motocsky09/project-shop/raw/main/_screens/home1.png)
![Home Page](https://github.com/motocsky09/project-shop/raw/main/_screens/home2.png)
## Login page
```
In this section, users can log in to the platform by entering their username and password.
The password is automatically hidden, but users can verify its correctness by clicking the eye icon on the right,
which will reveal the password. Additionally, users who do not have an account or wish to create a new one
can access the "Înregistrați-va" / "Register" button to be redirected to the registration page.
```
![Login Page](https://github.com/motocsky09/project-shop/raw/main/_screens/login%20page%20web.png)

## Register page
```
In this section, users can create a new account by providing the required information.
They must enter a valid email address and choose a unique username.
The password must be entered twice to confirm its accuracy and must include at least one special character,
one digit, and one uppercase letter.
The password is hidden by default, but users can reveal it by clicking
the eye icon on the right. Once the form is completed correctly,
users can proceed by pressing the ‘Register’ button to finalize the account creation.
```
![Register Page](https://github.com/motocsky09/project-shop/raw/main/_screens/register%20page%20web.png)

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
![Profile Account Page](https://github.com/motocsky09/project-shop/raw/main/_screens/profile%20account%20page%20web.png)

## All Products Filter page
```
In this section, users can see all products.
They can also use a filter to see only products from a specific category.
To add a product to their cart, simply click on the “Add to Cart” / “Add to Cart” button.
The “+” and “-” symbols allow you to change how many products you want to add to the cart.
To learn more about a product, simply click on its image and it will take you to the Product Page.
```
![Product Filter Page](https://github.com/motocsky09/project-shop/raw/main/_screens/product%20page%20filter%20web.png)

## Product page
```
In this section, users can access additional product details,
including multiple perspective photographs and a concise product description.
Additionally, they can conveniently add the product
to their shopping cart by clicking the "Adaugă în coș" / "Add to Cart" button.
Users can also specify the desired quantity by utilizing the "+" and "-" symbols.
```
![Product Page](https://github.com/motocsky09/project-shop/raw/main/_screens/product%20page%20web.png)

## Shopping Cart page
```
In this section, users can access a concise summary of the products added to their cart.
They can modify the quantity of products, delete a product from their cart, or delete all products.
Additionally, they can view the total amount paid and the delivery charges.
```
![Shopping Cart Page](https://github.com/motocsky09/project-shop/raw/main/_screens/shopping%20cart%20page%20web.png)

## Order page
```
In this section, users can verify the automatically populated delivery address
(if entered in their profile) or manually input the delivery address.
Additionally, they can add notes for the order and select their preferred payment method.
```
![Order Page](https://github.com/motocsky09/project-shop/raw/main/_screens/Order%20page%20web.png)

## Order page Confirm order
```
This is the final section of the product purchase process.
It presents a single order confirmation message,
followed by an email address where additional information can be requested.
```
![Order Page Confirm Order](https://github.com/motocsky09/project-shop/raw/main/_screens/Order%20page%20confirm%20order%20web.png)

# MeigoWeb Resolution for Mobile Devices

## HOME page mobile resolution
```
The home page serves as the initial page of the application,
where clients can access essential details about the application.
It is accompanied by two accordion items that contribute to a minimalist aesthetic and provide ample spacing.
```
![Home Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/home%20page%20mobile.png)

## Element 1 in home page mobile resolution
```
The element "Cum funcționează?" translates to "How does it work?"
provides information on how to use the platform.
To view the contents of the section, press the "+" symbol.
Once pressed, the section will be open.
To close the section, press the "-" symbol again.
This section provides contact information, including email and the app's Instagram page.
Through these channels,
customers can share their customizable ideas that are not available in the products section.
```
![Home Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/home%20page%20mobile%20with%20accordion%20item%201.png)

## Element 2 in home page mobile resolution
```
The element "Cine suntem noi?" translates to "Who we are?" provides a brief description of our website.
To view the contents of the section, is same mode of first section "Cum funcționează?" press the "+" and "-" symbol.
```
![Home Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/home%20page%20mobile%20with%20accordion%20item%202.png)

## Login page mobile resolution
```
In this section, users can log in to the platform by entering their username and password.
The password is automatically hidden, but users can verify its correctness by clicking the eye icon on the right,
which will reveal the password. Additionally, users who do not have an account or wish to create a new one
can access the "Înregistrați-va" / "Register" button to be redirected to the registration page.
```
![Login Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/login%20page%20mobile.png)

## Register page mobile resolution
```
In this section, users can create a new account by providing the required information.
They must enter a valid email address and choose a unique username.
The password must be entered twice to confirm its accuracy and must include at least one special character,
one digit, and one uppercase letter.
The password is hidden by default, but users can reveal it by clicking
the eye icon on the right. Once the form is completed correctly,
users can proceed by pressing the ‘Register’ button to finalize the account creation.
```
![Register Page Register](https://github.com/motocsky09/project-shop/raw/main/_screens/register%20page%20mobile.png)

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
![Profile Account Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/profile%20account%20page%20mobile.png)

## All Products Filter page mobile resolution
```
In this section, users can see all products.
They can also use a filter to see only products from a specific category.
To add a product to their cart, simply click on the “Add to Cart” / “Add to Cart” button.
The “+” and “-” symbols allow you to change how many products you want to add to the cart.
To learn more about a product, simply click on its image and it will take you to the Product Page.
```
![Product Filter Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/product%20page%20filter%20mobile.png)

## Product Page mobile resolution
```
In this section, users can access additional product details,
including multiple perspective photographs and a concise product description.
Additionally, they can conveniently add the product
to their shopping cart by clicking the "Adaugă în coș" / "Add to Cart" button.
Users can also specify the desired quantity by utilizing the "+" and "-" symbols.
```
![Product Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/product%20page%20mobile.png)

## Shopping Cart Page mobile resolution
```
In this section, users can access a concise summary of the products added to their cart.
They can modify the quantity of products, delete a product from their cart, or delete all products.
Additionally, they can view the total amount paid and the delivery charges.
```
![Shopping Cart Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/shopping%20cart%20page%20mobile1.png)

![Shopping Cart Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/shopping%20cart%20page%20mobile%202.png)

## Order Page mobile resolution
```
In this section, users can verify the automatically populated delivery address
(if entered in their profile) or manually input the delivery address.
Additionally, they can add notes for the order and select their preferred payment method.
```
![Order Page Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/Order%20page%20mobile.png)

## Confirm Order Page mobile resolution
```
This is the final section of the product purchase process.
It presents a single order confirmation message,
followed by an email address where additional information can be requested.
```
![Order Page Confirm Order Mobile](https://github.com/motocsky09/project-shop/raw/main/_screens/Order%20page%20confirm%20order%20mobile1.png)
