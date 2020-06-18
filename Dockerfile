FROM python:3.7-alpine
MAINTAINER Sonia

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
     gcc libc-dev linux-headers postgresql-dev
RUN pip install -r /requirements.txt
# apk is package manager that goes with python-alpine
# --update - update the registry before installing
# --no-chache - don't store the registry index on Dockerfile
# to install dependencies required by psycopg2 (PostgreSQL adapter for Python)

RUN mkdir /app
COPY ./app /app
WORKDIR /app

RUN adduser -D user
USER user
#create user on the Docker image but only for running project (no home drive)