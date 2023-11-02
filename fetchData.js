// const URL = 'https://raw.githubusercontent.com/solofo-ralitera/dtc-js/main/data/sales_100.json';
const URL = './sales_100.json';

export const dataFetcher = new class {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok)
        throw new Error('An error occured : ' + response.status);

      const datas = await response.json();

      return datas.sales_100;

    } catch (err) {
      console.log(err);
      return null;
    }
  }
}(URL)