import React from 'react';
import PropTypes from 'prop-types';
import Log from 'helpers/log';

const onClick = (e, species, onSelect) => {
  Log('taxon: selected.', 'd');
  const edit = e.target.tagName === 'BUTTON';

  onSelect(species, edit);
};

/**
 * Highlight the searched parts of taxa names.
 * @param name
 * @param searchPhrase
 * @returns {*}
 * @private
 */
function prettifyName(species, searchPhrase) {
  const foundInName = species.found_in_name;

  const name = species[foundInName];

  const searchPos = name.toLowerCase().indexOf(searchPhrase);
  if (!(searchPos >= 0)) {
    return name;
  }
  let deDupedName;
  if (species._dedupedScientificName) {
    deDupedName = (
      <small>
        <br />
        <i>{species._dedupedScientificName}</i>
      </small>
    );
  }
  return (
    <React.Fragment>
      {name.slice(0, searchPos)}
      <b>{name.slice(searchPos, searchPos + searchPhrase.length)}</b>
      {name.slice(searchPos + searchPhrase.length)}
      {deDupedName}
    </React.Fragment>
  );
}

const Species = ({ species, searchPhrase, onSelect }) => {
  const prettyName = prettifyName(species, searchPhrase);

  // const group = informalGroups[species.group];

  /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
  return (
    <li
      className="table-view-cell"
      onClick={e => onClick(e, species, onSelect)}
    >
      <div className="taxon">{prettyName}</div>
    </li>
  );
  /* eslint-enable jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */
};

Species.propTypes = {
  species: PropTypes.object.isRequired,
  searchPhrase: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Species;
