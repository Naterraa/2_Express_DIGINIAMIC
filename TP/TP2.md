# TP 2

Vous avez développé une API REST pour gérer des salles de sport.

Vous devez maintenant ajouter une authentification avec JWT.

Voici les fonctionnalités à implémenter :

- S'inscrire (/register)
- Se connecter (/login)
- Se déconnecter (/logout)

Toutes les opérations de modifications / ajout / suppression doivent être réalisables uniquement par des personnes connectées.
Vous devez donc ajouter un middleware d'authentification qui vérifie que la personne est connectée avant d'effectuer une opération de modification / ajout / suppression.