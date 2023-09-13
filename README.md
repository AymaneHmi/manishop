Manishop is an e-commerce website that sells a range of categories of products.

I use React for the front end and PHP with MySQL in the back end.

the website handles login or registers for the user before doing any action on the website, in the register, The user should input the username and email, and it will check in the database if this email or username does not exist before and send a code to the inserted email to check the user's email and then insert the password and user image and more data like number, address, and city.

the forget password redirects the user to insert his email and then it asks him to insert the code that is sent to his email, and then he inserts the new password.

When the user adds a product to the cart, the product and the quantity and the size (if the product is in the clothes category) are added to the database, which means the cart products are saved until he removes them.

when the user clicks the heart button the product is added to favorites and the can user access the favorites collection on the favorites page.

after the user added the products he wanted to buy and clicked the checkout it redirected to the generated link that came from the back-end using Stripe and handled the payment action, where the user inputs the number and cart information and the location and address, and then adds to orders table in database after that the user redirected to the orders page where he sees the orders he has.
