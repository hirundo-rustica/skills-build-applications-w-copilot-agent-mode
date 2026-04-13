from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import connection

# Sample data for users, teams, activities, leaderboard, and workouts
SUPERHEROES = [
    {"username": "superman", "email": "superman@dc.com", "team": "dc"},
    {"username": "batman", "email": "batman@dc.com", "team": "dc"},
    {"username": "wonderwoman", "email": "wonderwoman@dc.com", "team": "dc"},
    {"username": "ironman", "email": "ironman@marvel.com", "team": "marvel"},
    {"username": "spiderman", "email": "spiderman@marvel.com", "team": "marvel"},
    {"username": "captainmarvel", "email": "captainmarvel@marvel.com", "team": "marvel"},
]

TEAMS = [
    {"name": "marvel"},
    {"name": "dc"},
]

ACTIVITIES = [
    {"user": "superman", "activity": "flying", "duration": 60},
    {"user": "batman", "activity": "training", "duration": 45},
    {"user": "ironman", "activity": "engineering", "duration": 50},
]

LEADERBOARD = [
    {"user": "superman", "score": 100},
    {"user": "ironman", "score": 95},
    {"user": "batman", "score": 90},
]

WORKOUTS = [
    {"name": "strength", "description": "Strength training"},
    {"name": "agility", "description": "Agility drills"},
]

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        from django.apps import apps
        from django.conf import settings
        from pymongo import MongoClient

        # Connect to MongoDB
        client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
        db = client[settings.DATABASES['default']['NAME']]

        # Drop collections if they exist
        db.users.drop()
        db.teams.drop()
        db.activities.drop()
        db.leaderboard.drop()
        db.workouts.drop()

        # Insert teams
        db.teams.insert_many(TEAMS)
        # Insert users
        db.users.insert_many(SUPERHEROES)
        # Insert activities
        db.activities.insert_many(ACTIVITIES)
        # Insert leaderboard
        db.leaderboard.insert_many(LEADERBOARD)
        # Insert workouts
        db.workouts.insert_many(WORKOUTS)

        # Create unique index on email for users
        db.users.create_index("email", unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
