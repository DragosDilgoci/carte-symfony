const Encore = require('@symfony/webpack-encore');

// Configurează manual mediul de rulare dacă nu este deja configurat de comanda "encore".
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // Directorul unde vor fi stocate asset-urile compilate
    .setOutputPath('public/build/')
    // Calea publică folosită de serverul web pentru a accesa directorul de output
    .setPublicPath('/build')
    // Definește entry point-ul principal
    .addEntry('app', './assets/app.js')

    // Împarte fișierele în bucăți mai mici pentru optimizare
    .splitEntryChunks()

    // Activează runtime chunk-ul unic
    .enableSingleRuntimeChunk()

    // Curăță directorul de output înainte de build
    .cleanupOutputBeforeBuild()

    // Notificări build
    .enableBuildNotifications()

    // Source maps pentru debugging (dezactivat în producție)
    .enableSourceMaps(!Encore.isProduction())

    // Activează versiuni hash pentru fișiere în producție
    .enableVersioning(Encore.isProduction())

    // Configurare Babel pentru a adăuga presetul React
    .configureBabel((config) => {
        config.presets.push('@babel/preset-react');
    })

    // Configurează preset-ul env pentru Babel
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.38';
    })

// Dacă folosești Sass/SCSS, de-comentează următoarea linie:
//.enableSassLoader()

// Dacă folosești TypeScript, de-comentează următoarea linie:
//.enableTypeScriptLoader()

// Dacă ai probleme cu un plugin jQuery, de-comentează următoarea linie:
//.autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
