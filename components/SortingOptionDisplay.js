export class SortingOptionDisplay {
  constructor() {
  }

  renderOptions(datas, container) {
    if (datas.length > 0) {
      const form = document.querySelector(`.${container}`);
      const names = [];
      form.innerHTML = '';
      datas.forEach(element => {
        const div = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');
        let labelValue = element.charAt(0).toUpperCase() + element.slice(1);

        labelValue = labelValue.split('_').join(' ');
        names.push(labelValue);

        if (element === datas[0])
          input.checked = true;
        input.name = container;
        container === 'second-option' ? input.value = element : input.value = element.toLowerCase();
        input.setAttribute('type', 'radio');
        label.setAttribute('for', element);
        label.textContent = labelValue;

        div.appendChild(input);
        div.appendChild(label);
        form.appendChild(div);
      });
    }
  }

  renderDatas(datas) {
    const container = document.querySelector('.contents');
    const month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'NOV', 'DEC'];

    container.innerHTML = '';
    datas.forEach(data => {
      const div = document.createElement('div');
      const h2 = document.createElement('h2');
      const h3 = document.createElement('h3');
      const h4 = document.createElement('h4');
      const p = document.createElement('p');
      let ordDate = new Date(data.order_date);
      let shiDate = new Date(data.ship_date);
      let itemType = data.item_type;
      let salesChannel = data.sales_channel;
      let unitsSold = data.units_sold;
      let unitPrice = data.unit_price;
      let unitCost = data.unit_cost;
      let soldItems = data.sold_items;
      let orderDate = ordDate.getDay() + '/' + month[ordDate.getMonth()] + '/' + ordDate.getFullYear();
      let shipDate = shiDate.getDay() + '/' + month[shiDate.getMonth()] + '/' + shiDate.getFullYear();;

      div.className = 'grid-item';
      h2.textContent = data.region;
      h3.textContent = data.country;
      h4.textContent = data.order_id;


      p.innerHTML = `
        <span>Item type</span> : ${itemType}</br>
        <span>Sales channel</span> : ${salesChannel}</br>
        <span>Order date</span> : ${orderDate}</br>
        <span>Ship date</span> : ${shipDate}</br>
        <span>Units sold</span> : ${unitsSold}</br>
        <span>Unit price</span> : ${unitPrice}</br>
        <span>Unit cost</span> : ${unitCost}</br>
        <span>Sold items</span> : ${soldItems}</br>
      `;

      div.appendChild(h2);
      div.appendChild(h3);
      div.appendChild(h4);
      div.appendChild(p);
      container.appendChild(div);
    });
  }
}


//-----------------------------------------------------
//=====================================================
// const template = document.createElement('template');
// template.innerHTML = `
//   <style>
//     h1 {color:red;}
//   </style>
//   <h1>test</h1>
// `;

// export class SortOption extends HTMLElement {
//   constructor() {
//     super();
//     this.attachShadow({ mode: 'open' });
//   }

//   connectedCallback() {
//     this.render(); // Call render inside connectedCallback
//   }

//   render() {
//     this.shadowRoot.appendChild(template.content.cloneNode(true));
//   }
// }

// window.customElements.define('sort-option', SortOption);