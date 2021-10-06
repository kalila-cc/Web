/*
- FilterableProductTable
  - SearchBar
  - ProductTable
    - ProductCategoryRow
    - ProductRow 
*/

var products = [
  {id: "1", category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {id: "2", category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {id: "3", category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {id: "4", category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {id: "5", category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {id: "6", category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleToggleShow = this.handleToggleShow.bind(this);
  }
  handleChangeInput(event) {
    this.props.handleChangeInput(event.target.value);
  }
  handleToggleShow(event) {
    this.props.handleToggleShow(event.target.checked);
  }
  render() {
    return (
      <div className="SearchBar queue-container">
        <input type="text" placeholder="Search..." onChange={this.handleChangeInput} />
        <label>
          <input type="checkbox" onChange={this.handleToggleShow}/>
          <span>Only show products in stock</span>
        </label>
      </div>
    );
  }
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  filterItems(items, filter, onlyShowStock) {
    if (onlyShowStock) items = items.filter(item => item.stocked);
    if (!filter) return items;
    filter = filter.toLowerCase();
    return items.filter(item => item.nameToLowerCase.includes(filter));
  }
  getCategories(items, filter, show) {
    var res = {};
    // 根据关键词过滤项目
    items = this.filterItems(items, filter, show);
    for (let item of items) {
      res[item.category] = res[item.category] || [];
      res[item.category].push(item);
    }
    var keys = Object.keys(res);
    keys.sort();
    // 排序每个 category 内部的项目
    function cmp(a, b) {
      if (a.nameToLowerCase > b.nameToLowerCase) return 1;
      else if (a.nameToLowerCase < b.nameToLowerCase) return -1;
      return 0;
    }
    for (let key of keys) {
      res[key].sort(cmp);
    }
    // 返回过滤且排序后的结果，同时返回排序后的键
    return [res, keys];
  }
  render() {
    // 附加小写名称提高性能
    this.props.items.forEach(item => item.nameToLowerCase = item.name.toLowerCase());
    // 获取分类后的数据
    var [categories, keys] = this.getCategories(this.props.items, this.props.filter, this.props.onlyShowStock);
    return (
      <div className="ProductTable">
        <div className="category">
          <span className="name">Name</span>
          <span className="price">Price</span>
        </div>
        <div>{
          keys.map((category) => (
            <div key={category}>
              <ProductCategoryRow category={category} />
              {categories[category].map((item) => <ProductRow key={item.id} item={item} />)}
            </div>
          ))
        }</div>
      </div>
    );
  }
}

class ProductCategoryRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var category = this.props.category;
    return (
      <h4 className="ProductCategoryRow">{category}</h4>
    );
  }
}

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var {name, price, stocked} = this.props.item;
    return (
      <div className="ProductRow row-flex-container">
        <span className="name" style={{color: stocked ? 'black' : 'red'}}>{name}</span>
        <span className="price">{price}</span>
      </div>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      onlyShowStock: false
    };
    this.handleToggleShow = this.handleToggleShow.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
  }
  handleChangeInput(value) {
    this.setState({filter: value});
  }
  handleToggleShow(checked) {
    this.setState({onlyShowStock: checked});
  }
  render() {
    return (
      <div className="queue-container FilterableProductTable">
        <SearchBar handleToggleShow={this.handleToggleShow} handleChangeInput={this.handleChangeInput} />
        <ProductTable items={this.props.products} filter={this.state.filter} onlyShowStock={this.state.onlyShowStock} />
      </div>
    );
  }
}

var e = <FilterableProductTable products={products}/>
ReactDOM.render(e, document.getElementById("root"));
