export class SortFilterData {
  constructor(datas) {
    this.datas = this.addNewProperty('sold_items', datas);
    this.firstOptions = ['all'];
    this.secondOptions = ['all'];
    this.thirdOptions = ['ascendent', 'descendent'];
    this.datasCopy = [];
  }

  addNewProperty(name, datas) {
    datas.forEach(data => {
      data[name] = Math.floor(data.units_sold / data.unit_price);
    });
    return datas;
  }

  setOptions(val, name) {
    if (val.trim())
      this[name].push(val);
  }

  emptyOptions(name) {
    this[name].length = 0;
  }

  getOptions(name) {
    return this[name];
  }

  btnSortFilterData() {
    let firstOptionCheckedValue;
    let secondOptionCheckedValue;
    let thirdOptionCheckedValue;
    this.datasCopy.length = 0;

    document.querySelectorAll('input[name="first-option"]').forEach(radio => {
      if (radio.checked)
        firstOptionCheckedValue = radio.value;
    });

    document.querySelectorAll('input[name="second-option"]').forEach(radio => {
      if (radio.checked)
        secondOptionCheckedValue = radio.value;
    });

    document.querySelectorAll('input[name="third-option"]').forEach(radio => {
      if (radio.checked)
        thirdOptionCheckedValue = radio.value;
    });

    switch (firstOptionCheckedValue) {
      case 'ship_date':
      case 'order_date':

        break;
      case 'region':
      case 'country':
      case 'item_type':
      case 'sales_channel':
        if (secondOptionCheckedValue !== 'all')
          Array.from(this.datas.filter(data => data[firstOptionCheckedValue] === secondOptionCheckedValue))
            .forEach(data => this.datasCopy.push(data));
        else
          this.datas.forEach(data => this.datasCopy.push(data));
        break;

      default:
        this.datas.forEach(data => this.datasCopy.push(data));
    }

    switch (thirdOptionCheckedValue) {
      case 'ascendent':
        this.datasCopy.sort((a, b) => typeof a[firstOptionCheckedValue] === 'string' ? a[firstOptionCheckedValue].localeCompare(b[firstOptionCheckedValue]) : a[firstOptionCheckedValue] - b[firstOptionCheckedValue]);
        break;

      case 'descendent':
        this.datasCopy.sort((a, b) => typeof a[firstOptionCheckedValue] === 'string' ? b[firstOptionCheckedValue].localeCompare(a[firstOptionCheckedValue]) : b[firstOptionCheckedValue] - a[firstOptionCheckedValue]);
        break;
    }
  }
}