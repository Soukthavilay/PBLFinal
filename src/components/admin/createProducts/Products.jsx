import ProductHeader from '../headerAdmin/ProductHeader';
import Popup from 'reactjs-popup';
import ProductRow from './ProductRow';


const Products = () => {
  return (
    <>
        <div className="app-content">
                <div className="app-content-header">
                    <h1 className="app-content-headerText">
                        Products
                    </h1>
                    <button className="mode-switch" title='SwitchTheme'>
                        <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
                        <defs></defs>
                        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                        </svg>
                    </button>
                    <Popup trigger=
                      {<button className='app-content-headerButton'>Add Product</button>}
                        position="left center">
                        <div>GeeksforGeeks</div>
                      <button>Click here</button>
                    </Popup>
                </div>
                <div className="app-content-actions">
                    <input type="text" className="search-bar" />
                    <div className="app-content-actions-wrapper">
                        <div className="filter-button-wrapper">
                            <button className="action-button filterJsFilter">
                                <span>Filter</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                            </button>
                            <div className="filter-menu">
                                <label htmlFor="Category">Category</label>
                                <select name="" id="">
                                    <option>All Categories</option>
                                    <option>Furniture</option>                     
                                    <option>Decoration</option>
                                    <option>Kitchen</option>
                                    <option>Bathroom</option>
                                </select>
                                <label htmlFor="Status">Status</label>
                                <select name="" id="">
                                    <option>All Status</option>
                                    <option>Active</option>
                                    <option>Disabled</option>
                                </select>
                                <div className="filter-menu-buttons">
                                    <button className="filter-button-reset">
                                        Reset
                                    </button>
                                    <button className="filter-button-apply">
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className="active-button list active" title='List View'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                        </button>
                        <button className="action-button grid" title='Grid View'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                        </button>
                    </div>
                </div>
                <div className="product-area-wrapper tableView">
                    <ProductHeader/>
                    <ProductRow/>
                </div>
        </div>
    </>
  )
}

export default Products