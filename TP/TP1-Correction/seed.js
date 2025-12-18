const db = require('./config/database');
const { Gym, Equipment } = require('./config/associations');

const seedDatabase = async () => {
    try {
        // Synchroniser la base de données (créer les tables)
        await db.sync({ force: true }); // force: true supprime et recrée les tables
        console.log('Base de données synchronisée');

        // Créer des salles de sport
        const gym1 = await Gym.create({
            name: 'FitZone Paris',
            address: '123 Rue du Sport, 75001 Paris'
        });

        const gym2 = await Gym.create({
            name: 'PowerGym Lyon',
            address: '456 Avenue de la Forme, 69001 Lyon'
        });

        const gym3 = await Gym.create({
            name: 'MusclePlus Marseille',
            address: '789 Boulevard du Fitness, 13001 Marseille'
        });

        console.log('Salles de sport créées');

        // Créer des équipements pour FitZone Paris
        await Equipment.create({
            name: 'Tapis de course',
            brand: 'TechnoGym',
            price: 2500,
            maxLoad: 150,
            gymId: gym1.id
        });

        await Equipment.create({
            name: 'Banc de musculation',
            brand: 'LifeFitness',
            price: 800,
            maxLoad: 200,
            gymId: gym1.id
        });

        await Equipment.create({
            name: 'Vélo elliptique',
            brand: 'Precor',
            price: 1500,
            maxLoad: 120,
            gymId: gym1.id
        });

        // Créer des équipements pour PowerGym Lyon
        await Equipment.create({
            name: 'Rameur',
            brand: 'Concept2',
            price: 1200,
            maxLoad: 180,
            gymId: gym2.id
        });

        await Equipment.create({
            name: 'Cage à squat',
            brand: 'Rogue Fitness',
            price: 3500,
            maxLoad: 300,
            gymId: gym2.id
        });

        await Equipment.create({
            name: 'Haltères réglables',
            brand: 'Bowflex',
            price: 600,
            maxLoad: 50,
            gymId: gym2.id
        });

        // Créer des équipements pour MusclePlus Marseille
        await Equipment.create({
            name: 'Presse à cuisses',
            brand: 'Matrix',
            price: 2800,
            maxLoad: 400,
            gymId: gym3.id
        });

        await Equipment.create({
            name: 'Pull-up bar',
            brand: 'Eleiko',
            price: 450,
            maxLoad: 150,
            gymId: gym3.id
        });

        console.log('Équipements créés');
        console.log('✅ Base de données initialisée avec succès !');

        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        process.exit(1);
    }
};

seedDatabase();
