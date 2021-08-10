import os
import joblib
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.pipeline import Pipeline


class Modeler:
    
    def __init__(self):
        
        self.dataset = pd.read_csv('C:/Users/Ashank/MovieRecomendationEngine/modeler/movie_dataset.csv')
        try:
            self.model = joblib.load('models/rec.joblib')
        except:
            self.model = None
            self.count_vectorizer = None

    def get_title_from_index(self,index):
	    return self.dataset[self.dataset.index == index]["title"].values[0]

    def fit(self):
        features = ['keywords','cast','genres','director']
        for f in features:
            self.dataset[f] = self.dataset[f].fillna('')
        self.dataset['text_combined'] =self.dataset['keywords']+" "+self.dataset['cast']+" "+self.dataset['genres']+" "+self.dataset['director']
        cv = CountVectorizer()
        count_mat = cv.fit_transform(self.dataset['text_combined'])
        cosine_sim = cosine_similarity(count_mat)
        joblib.dump(cosine_sim,'models/rec.joblib')

    def predict(self,movie):
        if not os.path.exists('models/rec.joblib'):
            raise Exception("Train model before getting recomendations")
        if(len(movie) == 0):
            raise Exception("No movie entered")
        model = joblib.load('models/rec.joblib')
        index = self.dataset[self.dataset.title == movie]["index"].values[0]
        recomendations = list(enumerate(model[index]))
        sorted_recs = sorted(recomendations,key = lambda x:x[1])[::-1]
        result = []
        i = 0
        # print(sorted_recs)
        for mov in sorted_recs:
            result.append(self.get_title_from_index(mov[0]))
            i+=1
            if(i>11):
                break
        result.pop(0)
        return result


        

            





       