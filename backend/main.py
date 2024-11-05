from flask import Flask, json, jsonify, request
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pymongo
from werkzeug.security import generate_password_hash, check_password_hash


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


# API OBTENER TODOS LOS USUARIOS
@app.route('/listOfUsers', methods=['GET'])
def get_users():
    try:
        # Agregar mensaje de impresión para verificar que se obtuvo la lista de plantas correctamente
        print("Lista de usuarios obtenida")

        # Obtiene todas las plantas de la colección y excluye el campo _id
        users = collection_users.find({}, {'_id': 0})

        #retorna la lista jsonificada
        return jsonify(list(users))
    except Exception as e:
        print("Error al obtener la lista de plantas:", str(e))
        return jsonify({"error": "Ocurrió un error al obtener los usuarios"}), 500 
    
# API REGISTRAR USUARIO
@app.route('/userRegistration', methods=['POST'])
def registrar_usuario():

    #esto es para obtener el cuerpo de la solicitud
    data = request.get_json()

    # Validar si se proporcionan todos los campos requeridos
    if not data or not data.get('name') or not data.get('mail') or not data.get('age') or not data.get('passw'):
        print('Faltan datos bb')
        return jsonify({'error': 'Faltan datos requeridos'}), 400
    
    # Verificar si el usuario ya existe
    if collection_users.find_one({'email': data['mail']}):
        print('El usuario ya existe, bb')
        return jsonify({'error': 'El usuario ya está registrado'}), 400
    

    try:

        nuevo_usuario = {
        'nombre': data['name'],
        'email': data['mail'],
        'edad': data['age'],
        'contrasena': generate_password_hash(data['passw'])  # Encriptar la contraseña
        #'contrasena': data['passw']
        }

        # Insertar el usuario en la base de datos
        collection_users.insert_one(nuevo_usuario)
        print('Ya se registró')
        return jsonify({'mensaje': 'Usuario registrado exitosamente'}), 201

    except Exception as e:
        print("Error al obtener registrar el usuario:", str(e))
        return jsonify({"error": "Ocurrió un error al hacer el registro"}), 500 




if __name__ == "__main__":
    app.run(debug=True)