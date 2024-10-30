from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pymongo


app = Flask(__name__)

# Habilitar CORS para permitir solicitudes desde React Native
CORS(app)

# en esta conexión agregué 'tlsAllowInvalidCertificates=True' para ver si es un error, despues debes quitarlo ya que no es recomendable para un despliegue
#uri = "mongodb+srv://jovannaescogar9:141592@streaming.ahi3lnk.mongodb.net/?retryWrites=true&w=majority&appName=Streaming&tlsAllowInvalidCertificates=true"
uri = "mongodb+srv://jovannaescogar9:141592@streaming.ahi3lnk.mongodb.net/?retryWrites=true&w=majority&appName=Streaming"


# Create a new client and connect to the server
#client = MongoClient(uri, server_api=ServerApi('1'))
client = MongoClient(uri, server_api=pymongo.server_api.ServerApi(version="1", strict=True, deprecation_errors=True))

                     
db = client.rayman_store
collection = db.usuarios




# Send a ping to confirm a successful connection
""" try:
    db.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e) """

try:

    # start example code here

    # end example code here

    db.command("ping")

    print("Connected successfully")

    # other application code

    client.close()

except Exception as e:

    raise Exception(

        "The following error occurred: ", e)


if __name__ == "__main__":
    app.run(debug=True)