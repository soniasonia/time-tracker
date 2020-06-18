# base nodejs image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /src

# add `/app/node_modules/.bin` to $PATH
ENV PATH /node_modules/.bin:$PATH

# copy all code there
COPY . /src/

# install and cache app dependencies
RUN npm install