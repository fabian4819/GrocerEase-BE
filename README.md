# GrocerEase Backend Service

Repository to store API logic (controllers) and routes for the GrocerEase service. For more information about GrocerEase itself, visit the FE repository here: https://github.com/fabian4819/GrocerEase-FE/ 

## Dependencies

This project depends on:
- Node.js and Express.js as the backbone service
- JWT and CORS for authentication and FE-BE communication
- Mongoose and MongoDB for database communication
- npm to manage node packages
- Typescript since the project is written using typescript
- Vercel for deployment
- Git for version controlling

## Deploy Your Own GrocerEase Service

To deploy your own instance of GrocerEase, start by installing all the dependencies:

```bash
npm run dev
```

and clone our public repository (using HTTPS):

```bash
git clone https://github.com/fabian4819/GrocerEase-BE.git
```

(or SSH):

```bash
git clone git@github.com:fabian4819/GrocerEase-BE.git
```
Deploy using Vercel or IaaS if you're into it ;)

## Folder Structure

To customize your GrocerEase instance, you can start from the folder structure to see how the project is managed.

.env \
index.ts \
src \
├── config\
├── controllers \
├── cmiddleware \
├── models \
└── routes 
tsconfig.json
vercel.json

Context:
- The `index.ts` page is the main page. Here, you can customize the port of your service.
- You should specify your own `.env` file to store the path to your mongoDB cluster, or make sure to copy these variables when deploying
- `models` is the folder for all of your models (tables in the MongoDB database). You should work on this first before going to other folders.
- `controllers` is the folder for all of your CRUD functions. You should work on this after making your models.
- `routes` is the folder for all of your endpoints. You should work on this after you have created your models and your controllers.
- `middleware` is the folder middlewares. In this project it is used for verifying JWT Tokens and role checks for protected resources.
- `config` is the folder for additional configuration such as mongoose connection and JWT.

All the files in this project are written in typescript and will be compiled when built using Vercel. 

## API Endpoints

We have created multiple endpoints for various use cases. The use cases are categorized to authentication, product management, and store management.

| Use Case                                                    | URL                                     | Method | Arguments              |
|-------------------------------------------------------------|-----------------------------------------|--------|------------------------|
| Login                                                       | grocer-ease-be.vercel.app/api/auth/login| POST   | -                      |
| Regsiter                                                    | grocer-ease-be.vercel.app/api/auth/register| POST   | -                   |
| Edit Profile                                                | grocer-ease-be.vercel.app/api/auth/editProfile/[id]| PUT | [id]                    |
| List all products                                           | grocer-ease-be.vercel.app/api/   | GET   | -                              |                     |
| List description of a specific product                      | grocer-ease-be.vercel.app/api/[id]   | GET   | [id]                       |
List description of a specific store                          | grocer-ease-be.vercel.app/api/stores/[id]   | GET | [id]                  |
List all stores                                               | grocer-ease-be.vercel.app/api/stores/   | GET   | -                       |

## Credits

Made by:
- 22/496484/TK/54400 Bagas Pujangkoro
- 22/505501/TK/55319 Habib Fabian Fahlesi
- 22/492727/TK/53940 Rama Sulaiman Nurcahyo
- 22/496725/TK/54440 Wulan Tiarahayu
- 22/496507/TK/54405 Fidelya Fredelina

## Extras

We use scraping to populate the store information. The scraping repo can be found here: https://github.com/lindduncoding/grocerease-scraper 
The website is deployed at: https://grocer-ease-be.vercel.app/
