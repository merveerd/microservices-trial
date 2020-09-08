#specify a base image, we use node image(which has npm installed) attached with alphine
FROM node:alpine
#workdir defines where our web app is located in container file system
WORKDIR /app 
#Install related dependencies, for that it needs to reach package.json so:

COPY ./package.json ./ 
RUN npm install
#By seperating copy steps, we wont gonna rebuild npm install, it will use cache till here
COPY ./ ./ 

#Default command
CMD ["npm", "start"]