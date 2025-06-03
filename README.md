## This Dime - b2b analytics app is built with Next.js.

I've used tanstack query & axios to fetch data from json-server, designed with TailwindCSS.

## Brief overview of the app - 

![image](https://github.com/user-attachments/assets/12e6604b-24ec-43cc-806c-92497f3aa445)

![image](https://github.com/user-attachments/assets/b5e97f64-3d57-4d9c-8d52-ca98628e3a90)

![image](https://github.com/user-attachments/assets/2c3240d5-f254-43af-8cfa-be50ec9dc6de)

![image](https://github.com/user-attachments/assets/370af516-9b88-4e39-8609-9bfde0bbec6c)


## Running locally - 

To run this project locally you'll need to clone the repo then install dependencies using 

```
$ npm install
# or
$ yarn install
```

Create .env.local and add -

```
NEXT_PUBLIC_BASE_URL=http://localhost:4200
```

afterwards run 

```
$ npm run dev
# or
$ yarn dev
```

then open a different terminal and run 

```
$ json-server --watch db.json --port 4200
```

It will start the json-server where all the page data is stored and being fetched from.

You need to navigate to - http://localhost:3000/clients?tab=analytics to see the results from the screenshots.


