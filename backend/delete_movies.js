const sequelize = require('./src/config/sequelize');
const Movie = require('./src/models/User'); // Need to check if I can load Movie safely
const { User, Movie: MovieModel, Comment } = require('./src/models/associations');

async function deleteSpecificMovies() {
    try {
        const titlesToDelete = ['buhjnk', 'aaaaaaa'];
        console.log('Searching for movies:', titlesToDelete);

        for (const title of titlesToDelete) {
            const movie = await MovieModel.findOne({ where: { title } });
            if (movie) {
                console.log(`Found movie: "${movie.title}" (ID: ${movie.id}). Deleting...`);
                await movie.destroy();
                console.log(`Movie "${title}" deleted successfully.`);
            } else {
                console.log(`Movie "${title}" not found.`);
            }
        }

        process.exit(0);
    } catch (err) {
        console.error('Error during deletion:', err);
        process.exit(1);
    }
}

deleteSpecificMovies();
