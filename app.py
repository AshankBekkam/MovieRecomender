from genericpath import isfile
import os
from flask_cors.extension import CORS
import joblib
from flask import Flask,jsonify,request
import requests
import urllib.request
from flask_restful import Api,Resource
from modeler.Modeler import Modeler
from flask_cors import cross_origin

app = Flask(__name__)
CORS(app)
api = Api(app)

class Predict(Resource):
    @staticmethod
    def post():
        data = request.get_json()
        movie = data['movie']
        m = Modeler()
        if(not os.path.isfile('models/webclass.joblib')):
            
            m.fit()
        recs = m.predict(movie)
        print(recs)
        return jsonify({
            'movie':movie,
            'recs':recs
        })

api.add_resource(Predict,'/predict')
if __name__ == '__main__':
    app.run(debug = True)


