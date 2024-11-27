from flask import Flask, json, jsonify, request
from flask_cors import CORS
from jwt import ExpiredSignatureError, InvalidTokenError
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import pymongo
from werkzeug.security import generate_password_hash, check_password_hash
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, decode_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta, timezone
from pprint import pprint

app = Flask(__name__)
bcrypt = Bcrypt(app)

# Habilitar CORS para permitir solicitudes desde React Native
CORS(app)

now = datetime.now(timezone.utc)

app.config['JWT_SECRET_KEY'] = 'zanahorias'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=10)    # El token durará 10 mins

jwt = JWTManager(app)

# en esta conexión agregué 'tlsAllowInvalidCertificates=True' para ver si es un error, despues debes quitarlo ya que no es recomendable para un despliegue
#uri = "mongodb+srv://jovannaescogar9:141592@streaming.ahi3lnk.mongodb.net/?retryWrites=true&w=majority&appName=Streaming&tlsAllowInvalidCertificates=true"
uri = "mongodb+srv://jovannaescogar9:141592@streaming.ahi3lnk.mongodb.net/?retryWrites=true&w=majority&appName=Streaming"


client = MongoClient(uri, server_api=pymongo.server_api.ServerApi(version="1", strict=True, deprecation_errors=True))

                     
db = client.rayman_store
collection_users = db.usuarios



try:

    # el ping es un mensaje que se manda a la bd para saber si hay conexión
    db.command("ping")
    print("Connected successfully bby")
except Exception as e:
    raise Exception(
        "The following error occurred: ", e)




@app.route('/', methods=['POST'])
def home():
    print('Hello, world')
    return 'Hello, world'

# ----------------------------------------API OBTENER TODOS LOS USUARIOS
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
    






# ----------------------------------------API REGISTRAR USUARIO
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







# ----------------------------------------FUNCIÓN PARA VALIDAR EL USUARIO Y CONTRASEÑA
def validar_usuario(mail, passw):
    
    password = collection_users.find_one({"email": mail}, {"contrasena": 1, '_id': 0})
    dato = None
    if password:
        dato = password.get('contrasena')
    print(dato)

    if dato is None:
        print("No se encontró el usuario o la contraseña no está configurada")
        return False
    
    if check_password_hash(dato, passw):
        print('Contraseña correcta, bb')
        return True
    else:
        print('Contraseña No es correcta, bb')
        return False

   
# API LOGIN USUARIO
@app.route('/userValidation', methods=['POST'])
def login ():
    # datos requeridos para hacer la petición o validación
    data = request.json

    # Validar si se proporcionan todos los campos requeridos
    if not data or not data.get('mail') or not data.get('passw'):
        print('Faltan datos bb')
        return jsonify({'error': 'Faltan datos requeridos bby'}), 400
    
    print(data.get('mail'))
    print(data.get('passw'))
    print("--------")
    username = data.get('mail')
    password = data.get('passw')

    if validar_usuario(username, password):
        print("Login exitoso")
        access_token = create_access_token(identity=username)
        
        return jsonify({"message": "Login exitoso", "token": access_token}), 200
    else:
        return jsonify({"error": "Usuario o contraseña incorrectos"}), 401
    





# ----------------------------------------API actualizar contraseña
@app.route('/updatePassword', methods=['PUT'])
def actualizarContrasena():
    data = request.json
    new_passw = data.get('passw')
    correo = data.get('correo')

    if not data or not data.get('passw') or not data.get('correo'):
        print('Faltan datos bb')
        return jsonify({'error': 'Faltan datos requeridos bby'}), 400
    
    try:
        collection_users.update_one({"email": correo}, {"$set": {"contrasena": generate_password_hash(new_passw)}})
        print(collection_users.find_one({"email": correo}, {"contrasena": 1, '_id': 0}))
        return jsonify({"mensaje": "Cambios guardados!"}), 200
    except Exception as e:
        print("Error al obtener registrar el usuario:", str(e))
        return jsonify({"error": "Ocurrió un error al hacer el registro"}), 500 



#ruta para obtener el usuario desde el token
@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    print("este es la info de mi token",get_jwt_identity())
    current_user = get_jwt_identity()
    #return jsonify({"message": f"Hola {current_user}, estás viendo una ruta protegida"}), 200
    return str(current_user)

@app.route('/getUser', methods=['GET'])
@jwt_required()
def username():
    print("este es la info de mi token",get_jwt_identity())
    actualUsuario = get_jwt_identity()
    return actualUsuario
    


# Ruta para validar el token
@app.route('/validateToken', methods=['POST'])
def validate_token():
    token = request.headers.get('Authorization')
    
    if not token or not token.startswith("Bearer "):
        return jsonify({"error": "Token no proporcionado"}), 401

    # Quitar el prefijo "Bearer "
    token = token.split(" ")[1]

    try:
        # Decodificar el token
        decoded_token = decode_token(token)
        pprint(decoded_token)

        # Validar que no haya expirado
        exp = decoded_token.get('exp')
        if exp < now.timestamp():
            return jsonify({"error": "Token expirado"}), 401

        # Obtener información adicional si es necesario
        identity = decoded_token.get('sub')
        return jsonify({"message": "Token válido", "user_data": identity}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 401
    




if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)