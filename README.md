
# Ionic Product Management App

This application was developed using Ionic for managing simple products. It provides functionalities to list and perform CRUD (Create, Read, Update, Delete) operations on products. The database used is a Firebase service, specifically Firestore. The application also includes authentication, allowing users to log in with a username and password.

## Installation

To use our Project you must use git to download the repository:

```bash
  git clone https://github.com/Dabrox02/app-gestion-productos-ionic.git
```

It is also necessary to have some dependencies to test and run the application through its source code.

### First step:
You need node and in this case npm the package manager.

Here I give you a [link](https://kinsta.com/es/blog/como-instalar-node-js/) to install node on different most common operating systems.

Install Ionic:

```bash
    npm install -g @ionic/cli
```

Install Angular:

```bash
    npm install -g @angular/cli
```

    
## Tech Stack

**Server:** Firebase, Firestore

**Libreries:** Ionic, Angular, Firebase-admin

## Documentation

Ok after having the necessary installed we are going to proceed to use it from the source code on a computer with the above installed
The command to execute the application execution operation is:

```bash
    ionic serve
```

By default the application will run at http://localhost:8100

This image will appear where it should be achieved:

![](./img/login-app.jpeg)
![](./img/loging-acces.jpeg.jpeg)

After that, a list of the products will appear. Also above, a search engine for the products by name will appear.

![](./img/list-product.jpeg)
![](./img/search-product.jpeg)


Also below is the add button where if we click on it, an interface will appear to add the product.

![](./img/add-producto.jpeg)


You also have the option to edit and delete specific products, these appear as a button in the product information:

![](./img/info-product.jpeg)

To delete, click on the delete option and an alert will appear that will ask for confirmation to delete the item:

![](./img/delete-product.jpeg)

To edit, an interface similar to that of adding the product will appear with the product data to edit it:7
![](./img/edit-product.jpeg)

## Authors

- [johanp0308](https://github.com/johanp0308)
- [Dabrox02](https://github.com/Dabrox02)
- [Dark](https://github.com/DarkConecta)

