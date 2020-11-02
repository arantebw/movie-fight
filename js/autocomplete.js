const createAutoComplete = ({ autocomplete, renderOption, onOptionSelect, inputValue, fetchData }) => {
  autocomplete.innerHTML = `
  <label>Search</label>
  <input class="input">
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
  `;
  const input = autocomplete.querySelector('input');
  const dropdown = autocomplete.querySelector('.dropdown');
  const resultsWrapper = autocomplete.querySelector('.results');

  const onInput = async event => {
    resultsWrapper.innerHTML = '';
    const items = await fetchData(event.target.value);
    if (!items.length) {
      dropdown.classList.remove('is-active');
      return;
    }
    dropdown.classList.add('is-active');
    for (let item of items) {
      const option = document.createElement('a');
      option.classList.add('dropdown-item');
      option.innerHTML = renderOption(item);
      option.addEventListener('click', () => {
        dropdown.classList.remove('is-active');
        input.value = inputValue(item);
        onOptionSelect(item);
      });
      resultsWrapper.append(option);
    }
  };

  input.addEventListener('input', debounce(onInput, 500));

  document.addEventListener('click', event => {
    if (!autocomplete.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
