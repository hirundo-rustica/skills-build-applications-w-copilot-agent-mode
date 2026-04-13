from django.test import TestCase
from .models import UserProfile, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(str(team), 'Test Team')

    def test_userprofile_creation(self):
        team = Team.objects.create(name='Test Team')
        user = UserProfile.objects.create(username='testuser', email='test@example.com', team=team)
        self.assertEqual(str(user), 'testuser')

    def test_activity_creation(self):
        team = Team.objects.create(name='Test Team')
        user = UserProfile.objects.create(username='testuser', email='test@example.com', team=team)
        activity = Activity.objects.create(user=user, activity='running', duration=30)
        self.assertEqual(str(activity), 'testuser - running')

    def test_leaderboard_creation(self):
        team = Team.objects.create(name='Test Team')
        user = UserProfile.objects.create(username='testuser', email='test@example.com', team=team)
        leaderboard = Leaderboard.objects.create(user=user, score=100)
        self.assertEqual(str(leaderboard), 'testuser - 100')

    def test_workout_creation(self):
        workout = Workout.objects.create(name='Cardio', description='Cardio workout')
        self.assertEqual(str(workout), 'Cardio')
