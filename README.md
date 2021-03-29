This app was built from me to learn the basics of ReactJs and NodeJs.

![image](https://user-images.githubusercontent.com/51769461/112563611-73216780-8db8-11eb-93a0-7f9b91a4d5d3.png)
## Technologies used:
### Backend
* NodeJS
* ExpressJs
* JWT
* MongoDB
* Mongoose
* Joi
* Lodash
* Bcrypt
* Cors

### Frontend
* ReactJs
* Axios

***

#### Create new categories of products

Send a post request to /api/categories, with the name of the category on the body. Categories have unique names.

#### Inserting new products

Send a post request to /api/products, with the product with all his details, that can be found in the "backend/models/product.js" file.

#### Creating new orders

Orders are created by buying products in frontend of the application, to do that, you have to create an user and log in. After a order is created, the products of the order will be subtracted from the DB.
