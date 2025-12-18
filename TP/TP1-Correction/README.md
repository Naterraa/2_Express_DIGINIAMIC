## Initialisation de la base de données

Pour créer la base de données et l'initialiser avec des données de test :

```bash
npm run seed
```

Cela créera :
- 3 salles de sport
- 8 équipements répartis dans ces salles


## Routes API

### Salles de Sport (Gyms)

#### GET /gyms
Lister toutes les salles de sport

**Réponse:**
```json
{
  "success": true,
  "data": [...],
  "count": 2
}
```

#### GET /gyms/:id
Lister une salle de sport avec ses équipements

**Réponse:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "FitZone",
    "address": "123 Rue du Sport",
    "equipments": [...]
  }
}
```

### Équipements (Equipments)

#### GET /equipments/:id
Afficher un équipement par son ID

**Réponse:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Tapis de course",
    "brand": "TechnoGym",
    "price": 2500,
    "maxLoad": 150,
    "gymId": 1
  }
}
```

#### POST /equipments
Ajouter un équipement à une salle de sport

**Body:**
```json
{
  "name": "Tapis de course",
  "brand": "TechnoGym",
  "price": 2500,
  "maxLoad": 150,
  "gymId": 1
}
```

**Réponse:**
```json
{
  "success": true,
  "message": "Équipement créé avec succès",
  "data": {...}
}
```

#### PUT /equipments/:id
Modifier un équipement

**Body:**
```json
{
  "name": "Tapis de course Pro",
  "price": 3000
}
```

**Réponse:**
```json
{
  "success": true,
  "message": "Équipement mis à jour avec succès",
  "data": {...}
}
```

#### DELETE /equipments/:id
Supprimer un équipement d'une salle de sport

**Réponse:**
```json
{
  "success": true,
  "message": "Équipement supprimé avec succès",
  "data": {...}
}
```

## Modèles de Données

### Gym (Salle de sport)
- `id` (INTEGER, PK, AUTO_INCREMENT)
- `name` (STRING, NOT NULL)
- `address` (STRING, NOT NULL)

### Equipment (Équipement)
- `id` (INTEGER, PK, AUTO_INCREMENT)
- `name` (STRING, NOT NULL)
- `brand` (STRING, NOT NULL)
- `price` (FLOAT, NOT NULL)
- `maxLoad` (FLOAT, NOT NULL)
- `gymId` (INTEGER, FK, NOT NULL)

## Relations

- Une salle de sport possède plusieurs équipements (hasMany)
- Un équipement appartient à exactement une salle de sport (belongsTo)
