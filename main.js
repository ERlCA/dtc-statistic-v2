import { dataFetcher } from './fetchData.js';
import { SortFilterData } from './sortFilterData.js';
import { SortingOptionDisplay } from './components/SortingOptionDisplay.js';

const sanitizedHtml = (input) => {
  return document.createElement('div')
    .appendChild(document.createTextNode(input))
    .parentNode
    .innerHTML;
}

(async () => {
  const datas = [];
  await dataFetcher.fetchData()
    .then(items => {
      items.forEach(element => datas.push(element))
    });

  const sortFilterData = new SortFilterData(datas);
  const sortingOptionDisplay = new SortingOptionDisplay();
  let firstOptionList = '';
  const btn = document.querySelector('#btn');

  for (const index in datas[0]) {
    sortFilterData.setOptions(sanitizedHtml(index), 'firstOptions');
  }

  sortingOptionDisplay.renderOptions(sortFilterData.getOptions('firstOptions'), 'first-option');

  sortingOptionDisplay.renderDatas(sortFilterData.getOptions('datas'));
  firstOptionList = document.querySelectorAll('input[name="first-option"]');
  firstOptionList.forEach(radio => {
    radio.addEventListener('change', e => {
      let inputChecked = e.target.value;
      if (e.target.checked) {
        const thirdOptions = ['ascendent', 'descendent'];
        const form = document.querySelector('.second-option');
        const thirdOptionContainer = document.querySelector('.third-option');
        sortFilterData.emptyOptions('thirdOptions');

        document.querySelector('.third-option').innerHTML = '';

        if (inputChecked !== 'all') {
          thirdOptions.forEach(element => sortFilterData.setOptions(element, 'thirdOptions'));

          if (thirdOptionContainer.classList.contains('hidden'))
            thirdOptionContainer.classList.remove('hidden');

          sortingOptionDisplay.renderOptions(sortFilterData.getOptions('thirdOptions'), 'third-option');
        }

        else {
          if (!thirdOptionContainer.classList.contains('hidden'))
            thirdOptionContainer.classList.add('hidden');

          sortFilterData.emptyOptions('thirdOptions');
        }

        switch (inputChecked) {
          case 'region':
          case 'country':
          case 'item_type':
          case 'sales_channel':
            sortFilterData.emptyOptions('secondOptions');
            sortFilterData.setOptions('all', 'secondOptions');
            Array.from(new Set(datas.map(item => item[inputChecked])))
              .sort((a, b) => typeof a === 'string' ? a.localeCompare(b) : a - b)
              .forEach(element => sortFilterData.setOptions(element, 'secondOptions'));

            if (form.classList.contains('hidden'))
              form.classList.remove('hidden');

            sortingOptionDisplay.renderOptions(sortFilterData.getOptions('secondOptions'), 'second-option');

            document.querySelectorAll('input[name="second-option"]')
              .forEach(radio => {
                radio.addEventListener('change', e => {
                  if (e.target.value !== 'all') {
                    thirdOptionContainer.innerHTML = '';
                    if (!thirdOptionContainer.classList.contains('hidden'))
                      thirdOptionContainer.classList.add('hidden');
                  } else {
                    sortingOptionDisplay.renderOptions(thirdOptions, 'third-option');
                    if (thirdOptionContainer.classList.contains('hidden'))
                      thirdOptionContainer.classList.remove('hidden');
                  }
                });
              })


            break;

          default:
            sortFilterData.emptyOptions('secondOptions');
            if (!form.classList.contains('hidden')) {
              form.classList.add('hidden');
              form.innerHTML = '';
            }
        }
      }
    });
  });

  btn.addEventListener('click', () => {
    sortFilterData.btnSortFilterData();

    sortingOptionDisplay.renderDatas(sortFilterData.getOptions('datasCopy'));
  });
})();

