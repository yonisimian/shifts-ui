FROM python:3.8.1

RUN mkdir -p /usr/src/shifts-ui

WORKDIR /usr/src/shifts-ui


COPY requirements.txt /usr/src/shifts-ui

RUN pip install -r requirements.txt


ENTRYPOINT [ "flask" ]

CMD ["run", "--host=0.0.0.0", "--port=5000"]
