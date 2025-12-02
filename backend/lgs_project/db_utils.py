from pymongo import MongoClient
from django.conf import settings

def get_mongo_db():
    client = MongoClient(settings.MONGODB_URI)
    db = client[settings.MONGODB_DB_NAME]
    return db

def get_topic_analyses_collection():
    db = get_mongo_db()
    return db['topic_analyses']

