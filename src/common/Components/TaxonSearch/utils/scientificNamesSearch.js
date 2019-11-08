/** ****************************************************************************
 * Scientific name search.
 **************************************************************************** */
import helpers from './searchHelpers';

const WAREHOUSE_INDEX = 0;
const SCI_NAME_INDEX = 1; // in genera and above
const SPECIES_SCI_NAME_INDEX = 1; // in species and bellow

/**
 * Search Scientific names
 * @param species
 * @param searchPhrase
 * @returns {Array}
 */
function search(
  species,
  searchPhrase,
  results = [],
  maxResults,
  hybridRun,
  informalGroups = []
) {
  const searchWords = searchPhrase.split(' ');

  // prepare first word regex
  const firstWord = helpers.normalizeFirstWord(searchWords[0]);
  const firstWordRegexStr = helpers.getFirstWordRegexString(firstWord);
  const firstWordRegex = new RegExp(firstWordRegexStr, 'i');

  // prepare other words regex
  const otherWords = searchWords.splice(1).join(' ');
  let otherWordsRegex;
  if (otherWords) {
    otherWordsRegex = new RegExp(
      `^${helpers.getOtherWordsRegexString(otherWords)}`,
      'i'
    );
  }

  // check if hybrid eg. X Cupressocyparis
  if (!hybridRun && searchPhrase.match(/X\s.*/i)) {
    search(species, searchPhrase, results, maxResults, true, informalGroups);
  }

  // find first match in array
  let speciesArrayIndex = helpers.findFirstMatching(
    species,
    species,
    firstWord
  );

  // go through all
  const speciesArrayLength = species.length;
  while (
    speciesArrayIndex !== null &&
    speciesArrayIndex >= 0 &&
    speciesArrayIndex < speciesArrayLength &&
    results.length < maxResults
  ) {
    const speciesEntry = species[speciesArrayIndex];

    // check if matches
    if (firstWordRegex.test(speciesEntry[SCI_NAME_INDEX])) {
      // find species array
      let speciesArray;
      for (let j = 0, { length } = speciesEntry; j < length; j++) {
        if (speciesEntry[j] instanceof Array) {
          speciesArray = speciesEntry[j];
        }
      }

      let fullRes;
      if (!otherWordsRegex && speciesEntry[WAREHOUSE_INDEX]) {
        // no need to add genus if searching for species
        // why speciesEntry[WAREHOUSE_INDEX] see 'sandDustHack' in generator
        fullRes = {
          array_id: speciesArrayIndex,
          found_in_name: 'scientific_name',
          warehouse_id: speciesEntry[WAREHOUSE_INDEX],
          scientific_name: speciesEntry[SCI_NAME_INDEX],
        };
        results.push(fullRes);
      }

      // if this is genus
      if (speciesArray) {
        // go through all species
        for (
          let speciesIndex = 0, { length } = speciesArray;
          speciesIndex < length && results.length < maxResults;
          speciesIndex++
        ) {
          const speciesInArray = speciesArray[speciesIndex];
          if (otherWordsRegex) {
            // if search through species
            // check if matches
            if (otherWordsRegex.test(speciesInArray[SPECIES_SCI_NAME_INDEX])) {
              // add full sci name
              fullRes = {
                array_id: speciesArrayIndex,
                species_id: speciesIndex,
                found_in_name: 'scientific_name',
                warehouse_id: speciesInArray[WAREHOUSE_INDEX],
                scientific_name: `${speciesEntry[SCI_NAME_INDEX]} ${
                  speciesInArray[SPECIES_SCI_NAME_INDEX]
                }`,
              };
              results.push(fullRes);
            }
          } else {
            // if only genus search add its species
            fullRes = {
              array_id: speciesArrayIndex,
              species_id: speciesIndex,
              found_in_name: 'scientific_name',
              warehouse_id: speciesInArray[WAREHOUSE_INDEX],
              scientific_name: `${speciesEntry[SCI_NAME_INDEX]} ${
                speciesInArray[SPECIES_SCI_NAME_INDEX]
              }`,
            };
            results.push(fullRes);
          }
        }
      }
    } else {
      // stop looking further if not found
      break;
    }
    speciesArrayIndex++;
  }
  return results;
}

const searchScientificSpeciesName = (
  species,
  searchPhrase,
  results,
  maxResults,
  hybridRun,
  informalGroups
) =>
  search(
    species,
    `. ${searchPhrase}`,
    results,
    maxResults,
    hybridRun,
    informalGroups
  );

function searchMulti(
  species,
  searchPhrase,
  results = [],
  maxResults,
  hybridRun,
  informalGroups = []
) {
  search(species, searchPhrase, results, maxResults, hybridRun, informalGroups);

  const isOneWord = searchPhrase.split(' ').length;
  if (isOneWord) {
    searchScientificSpeciesName(
      species,
      searchPhrase,
      results,
      maxResults,
      hybridRun,
      informalGroups
    );
  }

  const is5CharacterShortcut = searchPhrase.length === 5;
  if (is5CharacterShortcut && results.length < maxResults) {
    const searchPhraseShortcut = `${searchPhrase.substr(
      0,
      3
    )} ${searchPhrase.substr(3, 4)}`;
    search(
      species,
      searchPhraseShortcut,
      results,
      maxResults,
      hybridRun,
      informalGroups
    );
  }
}

export { searchMulti as default };
