FROM python:3.7-alpine
MAINTAINER Sonia

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache postgresql-client
RUN apk add --update --no-cache --virtual .tmp-build-deps \
     gcc libc-dev linux-headers postgresql-dev
RUN pip install -r /requirements.txt

RUN mkdir /app
COPY . /app
WORKDIR /app

RUN adduser -D user
USER user
