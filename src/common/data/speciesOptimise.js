const taxonCleaner = require('./speciesClean');
const commonNames = require('./names');

const TAXON = 'taxon';
const ID = 'taxa_taxon_list_id';
const GENUS_ID_INDEX = 0;
const GENUS_TAXON_INDEX = 1;
const GENUS_SPECIES_INDEX = 2;
const SPECIES_ID_INDEX = 0;
const SPECIES_TAXON_INDEX = 1;

const SPECIES_COUNTRIES_INDEX = 2;

function normalizeValue(value) {
  // check if int
  // https://coderwall.com/p/5tlhmw/converting-strings-to-number-in-javascript-pitfalls
  const int = value * 1;
  if (!Number.isNaN(int)) {
    return int;
  }
  return value;
}

/**
 * Finds the last genus entered in the optimised list.
 * Looks for the matching taxa and informal group.
 * @param taxa
 * @param taxaNameSplitted
 * @returns {*}
 */
function getLastGenus(
  optimised,
  taxa,
  taxaNameSplitted,
  index = optimised.length - 1
) {
  const lastEntry = index;
  const genusName = taxaNameSplitted[0];

  let lastGenus;
  if (index < 0) {
    // create a new genus with matching group
    lastGenus[GENUS_ID_INDEX] = 0;
    lastGenus[GENUS_TAXON_INDEX] = genusName;
    lastGenus[GENUS_SPECIES_INDEX] = [];
    optimised.push(lastGenus);
    return lastGenus;
  }

  lastGenus = optimised[lastEntry];

  const previousGenusName = lastGenus[GENUS_TAXON_INDEX];
  if (previousGenusName !== genusName) {
    return getLastGenus(optimised, taxa, taxaNameSplitted, lastEntry - 1);
  }

  if (!lastGenus[GENUS_SPECIES_INDEX]) {
    lastGenus[GENUS_SPECIES_INDEX] = [];
  }
  return lastGenus;
}

function addGenus(optimised, taxa) {
  const taxon = taxonCleaner(taxa[TAXON], false, true);
  if (!taxon) {
    return;
  }

  const genus = [];
  genus[GENUS_ID_INDEX] = Number.parseInt(taxa[ID], 10);
  genus[GENUS_TAXON_INDEX] = taxon;
  genus[GENUS_SPECIES_INDEX] = [];

  optimised.push(genus);
}

function addSpecies(optimised, taxa, taxaNameSplitted) {
  // species that needs to be appended to genus
  const lastGenus = getLastGenus(optimised, taxa, taxaNameSplitted);

  let speciesArray = lastGenus[GENUS_SPECIES_INDEX];
  if (!speciesArray) {
    lastGenus[GENUS_SPECIES_INDEX] = [];
    speciesArray = lastGenus[GENUS_SPECIES_INDEX];
  }

  const id = normalizeValue(taxa[ID]);

  const taxon = taxaNameSplitted.slice(1).join(' ');
  const taxonClean = taxonCleaner(taxon, false);
  if (!taxonClean) {
    // cleaner might stripped all
    return;
  }

  const species = [];
  species[SPECIES_ID_INDEX] = id;
  species[SPECIES_TAXON_INDEX] = taxonClean;
  species[SPECIES_COUNTRIES_INDEX] = taxa.string_agg;

  const getCommonName = lang => {
    const names = commonNames.data.filter(
      ({ preferred_taxa_taxon_list_id: nameId, language_iso: language }) =>
        id === Number.parseInt(nameId, 10) && language === lang
    );
    return names[0] ? names[0].taxon : '';
  };

  const englishName = getCommonName('eng');
  const swedishName = getCommonName('swe');

  const COMMON_NAMES_INDEX = SPECIES_COUNTRIES_INDEX + 1;
  species[COMMON_NAMES_INDEX] = [englishName, swedishName];

  speciesArray.push(species);
}

function isGenusDuplicate(optimised, taxa, index) {
  const lastEntry = index || optimised.length - 1;
  if (lastEntry < 0) {
    // empty array
    return false;
  }
  const genus = optimised[lastEntry];
  if (genus[TAXON] !== taxa[TAXON]) {
    // couldn't find duplicate
    return false;
  }

  return true;
}

/**
 * Optimises the array by grouping species to genus.
 */
function optimise(speciesFlattened) {
  const optimised = [];

  speciesFlattened.forEach(taxa => {
    const taxaName = taxa[TAXON];
    const taxaNameSplitted = taxaName.split(' ');

    // hybrid genus names starting with X should
    // have a full genus eg. X Agropogon littoralis
    if (taxaNameSplitted[0] === 'X') {
      taxaNameSplitted[0] = `${taxaNameSplitted.shift()} ${
        taxaNameSplitted[0]
      }`;
    }
    if (taxaNameSplitted.length === 1) {
      // genus
      if (isGenusDuplicate(optimised, taxa)) {
        console.warn(`Duplicate genus found: ${taxa.toString()}`);
        return;
      }
      addGenus(optimised, taxa);
      return;
    }

    addSpecies(optimised, taxa, taxaNameSplitted);
  });

  return optimised;
}

module.exports = optimise;