# TP 1

Vous développez une API REST pour gérer des salles de sport.

L’API doit permettre de gérer plusieurs salles de sport.
Une salle de sport est composée d’un nom et d’une adresse.

Chaque salle de sport possède plusieurs équipements (nom, marque, prix, charge maximale).
Un équipement est rattaché à exactement une seule salle de sport et pas aucune.

Voici la liste unique EXACT des fonctionnalités à implémenter via vos routes : 

- Lister les salles de sport
- Lister une salle de sport avec ses équipements

- Afficher un équipement par son ID 
- Ajouter un équipement à une salle de sport
- Supprimer un équipement d'une salle de sport
- Modifier un équipement


Vous utiliserez Sequelize pour gérer la base de données, avec SqLite3 (ou autre si vous préférez...)