import React from 'react';
import PropTypes from 'prop-types';
import Species from './components/Species';

/**
 * Some common names might be identical so needs to add
 * a latin name next to it.
 * @param suggestions
 */
function deDuplicateSuggestions(suggestions) {
  let previous = {};
  const results = [];

  suggestions.forEach(taxon => {
    const name = taxon[taxon.found_in_name] || '';
    const nameNormalized = name.toLocaleLowerCase();

    const previousName = previous[previous.found_in_name] || '';
    const previousNameNormalized = previousName.toLocaleLowerCase();

    const noCommonNames = !nameNormalized || !previousNameNormalized;
    const isUnique = noCommonNames || nameNormalized !== previousNameNormalized;

    if (!isUnique) {
      return;
    }

    results.push(taxon);
    previous = taxon;
  });

  return results;
}

const getSearchInfo = () => (
  <p id="taxa-shortcuts-info">
    {t(
      'For quicker searching of the taxa you can use different shortcuts. For example, to find'
    )}
    {' '}
    <i>Lopinga achine</i> 
    {' '}
    {t('you can type in the search bar')}
:
    <br />
    <br />
    <i>lop ach</i>
    <br />
    <i>lopac</i>
    <br />
    <i>lop .ne</i>
    <br />
    <i>. achine</i>
  </p>
);

const Suggestions = ({ searchResults, searchPhrase, onSpeciesSelected }) => {
  if (!searchResults) {
    return <div id="suggestions">{getSearchInfo()}</div>;
  }

  let suggestionsList;
  if (!searchResults.length) {
    suggestionsList = (
      <li className="table-view-cell empty">
        {t('No species found with this name')}
      </li>
    );
  } else {
    const deDuped = deDuplicateSuggestions(searchResults);

    suggestionsList = deDuped.map(species => {
      const key = `${species.warehouse_id}-${species.found_in_name}-${
        species.isFavourite
      }`;
      return (
        <Species
          key={key}
          species={species}
          searchPhrase={searchPhrase}
          onSelect={onSpeciesSelected}
        />
      );
    });
  }

  return (
    <div id="suggestions">
      <ul>{suggestionsList}</ul>
    </div>
  );
};

Suggestions.propTypes = {
  searchResults: PropTypes.array,
  searchPhrase: PropTypes.string.isRequired,
  onSpeciesSelected: PropTypes.func.isRequired,
};

export default Suggestions;
