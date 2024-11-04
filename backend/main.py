from flask import Flask, json, jsonify, request
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


client = MongoClient(uri, server_api=pymongo.server_api.ServerApi(version="1", strict=True, deprecation_errors=True))

                     
db = client.rayman_store
collection_users = db.usuarios



try:

    # el ping es un mensaje que se manda a la bd para saber si hay conexión
    db.command("ping")
    print("Connected successfully")
except Exception as e:
    raise Exception(
        "The following error occurred: ", e)



@app.route('/listOfUsers', methods=['GET'])
def get_users():
    try:
        # Agregar mensaje de impresión para verificar que se obtuvo la lista de plantas correctamente
        print("Lista de plantas obtenida")

        # Obtiene todas las plantas de la colección y excluye el campo _id
        planets = collection_users.find({}, {'_id': 0})

        #retorna la lista jsonificada
        return jsonify(list(planets))

    except Exception as e:
        print("Error al obtener la lista de plantas:", str(e))
        return jsonify({"error": "Ocurrió un error al obtener los usuarios"}), 500



if __name__ == "__main__":
    app.run(debug=True)